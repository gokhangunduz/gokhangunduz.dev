import me from "@/constants/me";
import { ANSI } from "@/constants/ansi";
import {
  MATRIX_DROP_DENSITY,
  MATRIX_FRAME_DELAY_MS,
  MATRIX_TOTAL_FRAMES,
  RAIN_DROP_DENSITY,
  RAIN_FRAME_DELAY_MS,
  RAIN_TOTAL_FRAMES,
} from "@/constants/terminal";
import QRCode from "qrcode";
import { ICommands } from "@/types/types";
import { getIPInfo } from "@/apis/apis";
import packageJSON from "@/package.json";
import { findClosestCommand } from "@/utils/fuzzy";
import { colorizeAndFormat } from "@/utils/colorize";

const commandNames = [
  // identity
  "whoami",
  "skills",
  "experience",
  "education",
  "projects",
  // connect
  "socials",
  "contact",
  "blog",
  "github",
  // utilities
  "whatsmyip",
  "date",
  "echo",
  "version",
  "clear",
  "reload",
  "help",
  "ls",
  "sudo",
  "matrix",
  "history",
  "rm",
  "passgen",
  "lorem",
  "qr",
  "binary",
  "timestamp",
  "rain",
];

const commands = {
  whoami: (term) => {
    try {
      term.write(colorizeAndFormat(me));
    } catch {
      term.write("Could not display user information.\r\n");
    }
  },

  whatsmyip: async (term) => {
    term.write("Fetching IP info...\r\n");
    try {
      const res = await getIPInfo();
      if (res) {
        term.write(colorizeAndFormat(res));
      } else {
        term.write("Could not fetch IP information.\r\n");
      }
    } catch (e) {
      console.error(e);
      term.write("Could not fetch IP information.\r\n");
    }
  },

  skills: (term) => {
    term.write("Skills:\r\n");
    me.skills.forEach((skill, i) => {
      term.write(`  ${i + 1}. ${skill}\r\n`);
    });
  },

  experience: (term) => {
    term.write("Experience:\r\n");
    me.experiences.forEach((exp, i) => {
      term.write(`  [${i + 1}] ${exp.company}\r\n`);
      term.write(`      ${exp.title}\r\n`);
      term.write(`      ${exp.date}\r\n`);
    });
  },

  education: (term) => {
    term.write("Education:\r\n");
    me.educations.forEach((edu, i) => {
      term.write(`  [${i + 1}] ${edu.school}\r\n`);
      term.write(`      ${edu.title}\r\n`);
      term.write(`      ${edu.degree}\r\n`);
    });
  },

  projects: (term) => {
    term.write("Projects:\r\n");
    me.projects.forEach((project) => {
      term.write(`  • ${project.name}\r\n`);
      term.write(`    github : ${project.url}\r\n`);
      term.write(`    live   : ${project.live}\r\n`);
    });
  },

  socials: (term) => {
    term.write("Socials:\r\n");
    Object.entries(me.socials).forEach(([platform, url]) => {
      term.write(`  ${platform.padEnd(10)}: ${url}\r\n`);
    });
  },

  contact: (term) => {
    term.write(`Email    : ${me.email}\r\n`);
    term.write(`GitHub   : ${me.socials.github}\r\n`);
    term.write(`LinkedIn : ${me.socials.linkedin}\r\n`);
    term.write(`Medium   : ${me.socials.medium}\r\n`);
  },

  version: (term) => {
    term.write(`Version: ${packageJSON.version}\r\n`);
  },

  help: (term) => {
    term.write("Available commands:\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}About${ANSI.RESET}\r\n`);
    term.write("    whoami\r\n");
    term.write("    skills\r\n");
    term.write("    experience\r\n");
    term.write("    education\r\n");
    term.write("    projects\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}Connect${ANSI.RESET}\r\n`);
    term.write("    contact\r\n");
    term.write("    socials\r\n");
    term.write("    github\r\n");
    term.write("    blog\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}Tools${ANSI.RESET}\r\n`);
    term.write("    date\r\n");
    term.write("    timestamp\r\n");
    term.write("    whatsmyip\r\n");
    term.write("    echo\r\n");
    term.write("    lorem\r\n");
    term.write("    passgen\r\n");
    term.write("    binary\r\n");
    term.write("    qr\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}Fun${ANSI.RESET}\r\n`);
    term.write("    matrix\r\n");
    term.write("    rain\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}System${ANSI.RESET}\r\n`);
    term.write("    help\r\n");
    term.write("    ls\r\n");
    term.write("    clear\r\n");
    term.write("    history\r\n");
    term.write("    version\r\n");
    term.write("    reload\r\n");
    term.write("    sudo\r\n");
    term.write("    rm\r\n");
  },

  ls: (term) => {
    term.write("total 5\r\n");
    term.write(`${ANSI.BLUE}about/${ANSI.RESET}\r\n`);
    term.write("  whoami  skills  experience  education  projects\r\n");
    term.write(`${ANSI.BLUE}connect/${ANSI.RESET}\r\n`);
    term.write("  contact  socials  github  blog\r\n");
    term.write(`${ANSI.BLUE}tools/${ANSI.RESET}\r\n`);
    term.write("  date  timestamp  whatsmyip  echo  lorem  passgen  binary  qr\r\n");
    term.write(`${ANSI.BLUE}fun/${ANSI.RESET}\r\n`);
    term.write("  matrix  rain\r\n");
    term.write(`${ANSI.BLUE}system/${ANSI.RESET}\r\n`);
    term.write("  help  ls  clear  history  version  reload  sudo  rm\r\n");
  },

  sudo: (term, command) => {
    const subcmd = (command ?? "").replace(/^sudo\s*/i, "").trim();
    if (subcmd) {
      term.write(`[sudo] password for ${me.firstName.toLowerCase()}: \r\n`);
    }
    term.write("Permission denied. Nice try.\r\n");
  },

  matrix: (term) => {
    return new Promise<void>((resolve) => {
      const cols = term.cols;
      const rows = term.rows;
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
      const dropCount = Math.floor(cols / MATRIX_DROP_DENSITY);
      const drops: number[] = Array.from({ length: dropCount }, () =>
        Math.floor(Math.random() * rows)
      );
      const randChar = () => chars[Math.floor(Math.random() * chars.length)];

      term.write(`${ANSI.CURSOR_HIDE}${ANSI.CLEAR_SCREEN}`);

      let frame = 0;

      const interval = setInterval(() => {
        drops.forEach((row, i) => {
          const col = i * MATRIX_DROP_DENSITY + 1;
          if (row > 1) {
            term.write(`\x1b[${row};${col}H${ANSI.GREEN}${randChar()}`);
          }
          if (row <= rows) {
            term.write(`\x1b[${row + 1};${col}H${ANSI.GREEN_BRIGHT}${randChar()}`);
          }
          drops[i] = row >= rows ? 1 : row + 1;
        });

        frame++;
        if (frame >= MATRIX_TOTAL_FRAMES) {
          clearInterval(interval);
          term.write(`${ANSI.CURSOR_SHOW}${ANSI.CLEAR_SCREEN}${ANSI.CURSOR_HOME}${ANSI.RESET}`);
          resolve();
        }
      }, MATRIX_FRAME_DELAY_MS);
    });
  },

  clear: (term) => {
    term.clear();
  },

  reload: (term) => {
    term.write("Reloading...\r\n");
    window.location.reload();
  },

  echo: (term, command) => {
    const input = (command ?? "").replace(/^echo\s*/i, "").trim();
    term.write(input + "\r\n");
  },

  date: (term) => {
    term.write(new Date().toString() + "\r\n");
  },

  blog: (term) => {
    term.write(`Opening ${me.socials.medium}...\r\n`);
    window.open(me.socials.medium, "_blank");
  },

  github: (term) => {
    term.write(`Opening ${me.socials.github}...\r\n`);
    window.open(me.socials.github, "_blank");
  },

  rm: (term) => {
    term.write("Permission denied. I like my files.\r\n");
  },

  passgen: (term) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*-_=+";
    const length = 24;
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    const password = Array.from(array, (byte) => chars[byte % chars.length]).join("");
    term.write(`${password}\r\n`);
  },

  lorem: (term) => {
    term.write(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod\r\n" +
      "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\r\n" +
      "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\r\n" +
      "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse\r\n" +
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non\r\n" +
      "proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n"
    );
  },

  qr: (term) => {
    const url = me.socials.github;
    try {
      const qr = QRCode.create(url, { errorCorrectionLevel: "M" });
      const modules = qr.modules;
      const size = modules.size;
      const pad = 2;
      const total = size + pad * 2;

      const get = (r: number, c: number): boolean => {
        const mr = r - pad;
        const mc = c - pad;
        if (mr < 0 || mr >= size || mc < 0 || mc >= size) return false;
        return !!modules.get(mr, mc);
      };

      term.write(`GitHub: ${url}\r\n\r\n`);
      for (let row = 0; row < total; row += 2) {
        let line = "";
        for (let col = 0; col < total; col++) {
          const top = get(row, col);
          const bottom = row + 1 < total ? get(row + 1, col) : false;
          if (top && bottom) line += "█";
          else if (top && !bottom) line += "▀";
          else if (!top && bottom) line += "▄";
          else line += " ";
        }
        term.write(line + "\r\n");
      }
    } catch {
      term.write(`GitHub: ${url}\r\n`);
    }
  },

  binary: (term, command) => {
    const input = (command ?? "").replace(/^binary\s*/i, "").trim();
    if (!input) {
      term.write("Usage: binary <text>\r\n");
      return;
    }
    const result = Array.from(input)
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    term.write(result + "\r\n");
  },

  timestamp: (term) => {
    term.write(`${Math.floor(Date.now() / 1000)}\r\n`);
  },

  rain: (term) => {
    return new Promise<void>((resolve) => {
      const cols = term.cols;
      const rows = term.rows;
      const RAIN_CHARS = ["|", "│", "╎", "'", "`", "."];
      const dropCount = Math.floor(cols / RAIN_DROP_DENSITY);
      const drops: number[] = Array.from({ length: dropCount }, () =>
        Math.floor(Math.random() * rows)
      );

      term.write(`${ANSI.CURSOR_HIDE}${ANSI.CLEAR_SCREEN}`);

      let frame = 0;

      const interval = setInterval(() => {
        drops.forEach((row, i) => {
          const col = i * RAIN_DROP_DENSITY + 1;

          if (row >= 1 && row <= rows) {
            term.write(`\x1b[${row};${col}H${ANSI.BLUE}.${ANSI.RESET}`);
          }
          if (row + 1 <= rows) {
            const char = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
            term.write(`\x1b[${row + 1};${col}H${ANSI.BRIGHT_CYAN}${char}${ANSI.RESET}`);
          }
          if (row - 2 >= 1) {
            term.write(`\x1b[${row - 2};${col}H `);
          }

          drops[i] = row >= rows ? 1 : row + 1;
        });

        frame++;
        if (frame >= RAIN_TOTAL_FRAMES) {
          clearInterval(interval);
          term.write(`${ANSI.CURSOR_SHOW}${ANSI.CLEAR_SCREEN}${ANSI.CURSOR_HOME}${ANSI.RESET}`);
          resolve();
        }
      }, RAIN_FRAME_DELAY_MS);
    });
  },

  notFound: (term, command) => {
    term.write(`Command not found: ${command}\r\n`);
    const suggestion = findClosestCommand(command ?? "", commandNames);
    if (suggestion) {
      term.write(`Did you mean: ${suggestion}?\r\n`);
    }
  },
} as const satisfies ICommands;

export function createHistoryCommand(getHistory: () => string[]) {
  return (term: Parameters<typeof commands.date>[0]) => {
    const hist = getHistory();
    if (hist.length === 0) {
      term.write("No commands in history.\r\n");
    } else {
      hist.forEach((cmd, i) => {
        term.write(`  ${String(i + 1).padStart(3)}  ${cmd}\r\n`);
      });
    }
  };
}

export { commandNames };
export default commands;
