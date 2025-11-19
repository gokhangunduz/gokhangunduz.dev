import { useEffect, useRef } from "react";
import { Terminal as Xterm } from "@xterm/xterm";
import type { FitAddon } from "@xterm/addon-fit";
import { config, prompt, welcomeMessage } from "@/configs/xterm";
import commands from "@/constants/commands";

export const useTerminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputBuffer = useRef<string>("");
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    const term = new Xterm(config);

    const initTerminal = async () => {
      const { FitAddon } = await import("@xterm/addon-fit");
      const { WebLinksAddon } = await import("@xterm/addon-web-links");

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.loadAddon(new WebLinksAddon());

      if (terminalRef.current) {
        term.open(terminalRef.current);
        fitAddon.fit();
        fitAddonRef.current = fitAddon;
      }
    };

    initTerminal();

    term.write(welcomeMessage);
    term.write(prompt);

    const handleResize = () => fitAddonRef.current?.fit();
    window.addEventListener("resize", handleResize);

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
      } else {
        inputBuffer.current += data;
        term.write(data);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
  }, []);

  return terminalRef;
};
