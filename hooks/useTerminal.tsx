import { useEffect, useRef } from "react";
import { Terminal as Xterm } from "@xterm/xterm";
import type { FitAddon } from "@xterm/addon-fit";
import { config, prompt, welcomeMessage } from "@/configs/xterm";
import commands from "@/constants/commands";
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
        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: false });

        elCleanupRef.current = () => {
          el.removeEventListener("click", handleClick);
          el.removeEventListener("touchstart", handleTouchStart);
          el.removeEventListener("touchmove", handleTouchMove);
        };
      }
    };

    initTerminal();

    term.write(welcomeMessage);
    term.write(prompt);

    const handleRightClick = (e: MouseEvent) => e.preventDefault();
    const handleResize = () => fitAddonRef.current?.fit();

    window.addEventListener("resize", handleResize);
    window.addEventListener("contextmenu", handleRightClick);

    term.onData(async (data) => {
      if (data === "\r") {
        term.write("\r\n");
        const command = inputBuffer.current.trim().toLowerCase();

        if (command.length) {
          const history = historyRef.current;
          if (history[history.length - 1] !== command) {
            historyRef.current = [...history, command];
          }
          historyIndexRef.current = -1;

          if (commands[command as keyof typeof commands]) {
            await commands[command as keyof typeof commands](term, command);
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
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("contextmenu", handleRightClick);
      elCleanupRef.current?.();
      term.dispose();
    };
  }, []);

  return terminalRef;
};
