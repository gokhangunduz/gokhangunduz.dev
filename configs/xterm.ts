import { ITerminalInitOnlyOptions, ITerminalOptions } from "@xterm/xterm";

export const config: ITerminalOptions & ITerminalInitOnlyOptions = {
  cursorBlink: true,
  theme: {
    background: "#1a1b2e",
    foreground: "#c0caf5",
    cursor: "#bb9af7",
    cursorAccent: "#1a1b2e",
    selectionBackground: "#33467c",
    black: "#15161e",
    red: "#f7768e",
    green: "#9ece6a",
    yellow: "#e0af68",
    blue: "#7aa2f7",
    magenta: "#bb9af7",
    cyan: "#7dcfff",
    white: "#a9b1d6",
    brightBlack: "#414868",
    brightRed: "#f7768e",
    brightGreen: "#9ece6a",
    brightYellow: "#e0af68",
    brightBlue: "#7aa2f7",
    brightMagenta: "#bb9af7",
    brightCyan: "#7dcfff",
    brightWhite: "#c0caf5",
  },
  rightClickSelectsWord: false,
  cursorInactiveStyle: "none",
  scrollback: 1000,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
};

export const prompt: string = "gokhangunduz@gg: ";

export const welcomeMessage: string = `${prompt}If you need any support, type 'help'\r\n`;
