import { useEffect, useRef } from "react";
import { Terminal as Xterm } from "@xterm/xterm";
import type { FitAddon } from "@xterm/addon-fit";
import { config, prompt, welcomeMessage } from "@/configs/xterm";
import commands from "@/constants/commands";

export const useTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputBuffer = useRef<string>("");
  const fitAddonRef = useRef<FitAddon | null>(null);
  const elCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const fontSize = window.innerWidth < 640 ? 12 : 14;
    const term = new Xterm({ ...config, fontSize });

    term.attachCustomKeyEventHandler((event) => {
      if (event.type === "keydown") {
        const blockedKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

        if (
          blockedKeys.includes(event.key) ||
          blockedKeys.includes(event.code)
        ) {
          return false;
        }
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
          const delta = touchStartY - e.touches[0].clientY;
          touchStartY = e.touches[0].clientY;
          term.scrollLines(Math.round(delta / 20));
        };

        el.addEventListener("click", handleClick);
        el.addEventListener("touchstart", handleTouchStart, { passive: true });
        el.addEventListener("touchmove", handleTouchMove, { passive: true });

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
          if (commands[command as keyof typeof commands]) {
            await commands[command as keyof typeof commands](term, command);
          } else {
            commands["notFound"](term, command);
          }
        }

        inputBuffer.current = "";
        term.write(prompt);
      } else if (data === "\x7F") {
        if (inputBuffer.current.length > 0) {
          inputBuffer.current = inputBuffer.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (inputBuffer.current.length < 2048) {
        inputBuffer.current += data;
        term.write(data);
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
