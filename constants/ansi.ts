export const ANSI = {
  RESET: "\x1b[0m",
  CYAN: "\x1b[36m",
  BLUE: "\x1b[34m",
  GREEN: "\x1b[32m",
  GREEN_BRIGHT: "\x1b[92m",
  CURSOR_HIDE: "\x1b[?25l",
  CURSOR_SHOW: "\x1b[?25h",
  CLEAR_SCREEN: "\x1b[2J",
  CURSOR_HOME: "\x1b[H",
} as const;
