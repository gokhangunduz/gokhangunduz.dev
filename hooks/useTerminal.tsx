import { useEffect, useRef } from "react";
import { Terminal as Xterm } from "@xterm/xterm";
import type { FitAddon } from "@xterm/addon-fit";
import { config, prompt, welcomeMessage } from "@/configs/xterm";
import commands, { createHistoryCommand } from "@/constants/commands";
import {
  MOBILE_BREAKPOINT,
  INPUT_BUFFER_MAX,
} from "@/constants/terminal";

export const useTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputBuffer = useRef<string>("");
  const fitAddonRef = useRef<FitAddon | null>(null);
  const elCleanupRef = useRef<(() => void) | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  useEffect(() => {
    const fontSize = window.innerWidth < MOBILE_BREAKPOINT ? 12 : 14;
    const term = new Xterm({ ...config, fontSize });
    const commandKeys = Object.keys(commands).filter((k) => k !== "notFound");
    const historyCommand = createHistoryCommand(() => historyRef.current);

    term.attachCustomKeyEventHandler((event) => {
      if (event.type !== "keydown") return true;

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        return false;
      }

      if (event.key === "Tab") {
        const current = inputBuffer.current;
        const matches = commandKeys.filter((k) => k.startsWith(current));
        if (matches.length === 1) {
          term.write(`\r\x1b[K${prompt}${matches[0]}`);
          inputBuffer.current = matches[0];
        } else if (matches.length > 1) {
          term.write(`\r\n${matches.join("  ")}\r\n${prompt}${current}`);
        }
        return false;
      }

      if (event.key === "ArrowUp") {
        const history = historyRef.current;
        if (history.length === 0) return false;
        const newIndex = Math.min(
          historyIndexRef.current + 1,
          history.length - 1,
        );
        historyIndexRef.current = newIndex;
        const cmd = history[history.length - 1 - newIndex];
        term.write(`\r\x1b[K${prompt}${cmd}`);
        inputBuffer.current = cmd;
        return false;
      }

      if (event.key === "ArrowDown") {
        historyIndexRef.current = Math.max(historyIndexRef.current - 1, -1);
        if (historyIndexRef.current === -1) {
          term.write(`\r\x1b[K${prompt}`);
          inputBuffer.current = "";
        } else {
          const history = historyRef.current;
          const cmd = history[history.length - 1 - historyIndexRef.current];
          term.write(`\r\x1b[K${prompt}${cmd}`);
          inputBuffer.current = cmd;
        }
        return false;
      }

      return true;
    });

    const initTerminal = async () => {
      const { FitAddon } = await import("@xterm/addon-fit");
      const { WebLinksAddon } = await import("@xterm/addon-web-links");

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.loadAddon(new WebLinksAddon());

      const el = terminalRef.current;
      if (el) {
        if (window.visualViewport) {
          el.style.height = `${window.visualViewport.height}px`;
        }
        term.open(el);
        fitAddon.fit();
        fitAddonRef.current = fitAddon;
        term.focus();

        let touchStartY = 0;

        const handleClick = () => term.focus();

        const handleTouchStart = (e: TouchEvent) => {
          touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
          e.preventDefault();
          const delta = touchStartY - e.touches[0].clientY;
          touchStartY = e.touches[0].clientY;
          const viewport = el.querySelector(".xterm-viewport") as HTMLElement | null;
          if (viewport) viewport.scrollTop += delta;
        };

        el.addEventListener("click", handleClick);
        el.addEventListener("touchstart", handleTouchStart, { passive: true, capture: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });

        elCleanupRef.current = () => {
          el.removeEventListener("click", handleClick);
          el.removeEventListener("touchstart", handleTouchStart, { capture: true });
          el.removeEventListener("touchmove", handleTouchMove, { capture: true });
        };
      }
    };

    initTerminal();

    term.write(welcomeMessage);
    term.write(prompt);

    const handleRightClick = (e: MouseEvent) => e.preventDefault();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => fitAddonRef.current?.fit(), 100);
    };
    const handleViewportResize = () => {
      const vp = window.visualViewport;
      if (vp && terminalRef.current) {
        terminalRef.current.style.height = `${vp.height}px`;
      }
      requestAnimationFrame(() => {
        fitAddonRef.current?.fit();
        term.scrollToBottom();
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("contextmenu", handleRightClick);
    window.visualViewport?.addEventListener("resize", handleViewportResize);

    term.onData(async (data) => {
      if (data === "\r") {
        term.write("\r\n");
        const rawInput = inputBuffer.current.trim();
        const command = rawInput.toLowerCase().split(/\s+/)[0];

        if (command.length) {
          const history = historyRef.current;
          if (history[history.length - 1] !== rawInput) {
            historyRef.current = [...history, rawInput];
          }
          historyIndexRef.current = -1;

          if (command === "history") {
            historyCommand(term);
          } else if (commands[command as keyof typeof commands]) {
            try {
              await commands[command as keyof typeof commands](term, rawInput);
            } catch (error) {
              console.error(error);
              term.write("An error occurred while executing the command.\r\n");
            }
          } else {
            commands["notFound"](term, command);
          }
        } else {
          historyIndexRef.current = -1;
        }

        inputBuffer.current = "";
        term.write(prompt);
      } else if (data === "\x7F") {
        if (inputBuffer.current.length > 0) {
          inputBuffer.current = inputBuffer.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (inputBuffer.current.length < INPUT_BUFFER_MAX) {
        inputBuffer.current += data;
        term.write(data);
      } else {
        term.write("\x07");
      }
    });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("contextmenu", handleRightClick);
      window.visualViewport?.removeEventListener("resize", handleViewportResize);
      elCleanupRef.current?.();
      term.dispose();
    };
  }, []);

  return terminalRef;
};
