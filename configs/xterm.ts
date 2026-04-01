import { ITerminalInitOnlyOptions, ITerminalOptions } from "@xterm/xterm";
import { palette } from "@/constants/palette";

export const config: ITerminalOptions & ITerminalInitOnlyOptions = {
  cursorBlink: true,
  theme: {
    background: palette.bg,
    foreground: palette.fg,
    cursor: palette.accent,
    cursorAccent: palette.bg,
    selectionBackground: palette.bgSurface,
    black: palette.bgDeep,
    red: palette.red,
    green: palette.green,
    yellow: palette.yellow,
    blue: palette.blue,
    magenta: palette.blue,
    cyan: palette.accent,
    white: palette.fgSubtle,
    brightBlack: palette.bgHighlight,
    brightRed: palette.red,
    brightGreen: palette.green,
    brightYellow: palette.yellow,
    brightBlue: palette.blueBright,
    brightMagenta: palette.accent,
    brightCyan: palette.accentBright,
    brightWhite: palette.fgBright,
  },
  rightClickSelectsWord: false,
  cursorInactiveStyle: "none",
  scrollback: 1000,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: 14,
};

export const prompt: string = "gokhangunduz@gg: ";

export const welcomeMessage: string = `${prompt}If you need any support, type 'help'\r\n`;
