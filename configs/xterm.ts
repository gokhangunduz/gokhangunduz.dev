import { ITerminalInitOnlyOptions, ITerminalOptions } from "@xterm/xterm";

export const config: ITerminalOptions & ITerminalInitOnlyOptions = {
  cursorBlink: true,
  theme: {
    background: "#000000",
    foreground: "#FFFFFF",
  },
  rightClickSelectsWord: false,
  cursorInactiveStyle: "none",
};

export const prompt: string = "gokhangunduz@gg: ";

export const welcomeMessage: string = `${prompt}If you need any support, type 'help'\r\n`;
