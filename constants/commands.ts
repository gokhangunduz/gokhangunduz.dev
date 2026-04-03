import me from "@/constants/me";
import { ANSI } from "@/constants/ansi";
import {
  MATRIX_DROP_DENSITY,
  MATRIX_FRAME_DELAY_MS,
  MATRIX_TOTAL_FRAMES,
} from "@/constants/terminal";
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
    term.write(`  ${ANSI.CYAN}Identity${ANSI.RESET}\r\n`);
    term.write("    whoami · skills · experience · education · projects\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}Connect${ANSI.RESET}\r\n`);
    term.write("    socials · contact · blog · github\r\n");
    term.write("\r\n");
    term.write(`  ${ANSI.CYAN}Utilities${ANSI.RESET}\r\n`);
    term.write("    whatsmyip · date · echo · version · clear · reload · help\r\n");
    term.write("    ls · sudo · matrix · history\r\n");
  },

  ls: (term) => {
    term.write("total 3\r\n");
    term.write(`${ANSI.BLUE}identity/${ANSI.RESET}\r\n`);
    term.write("  whoami  skills  experience  education  projects\r\n");
    term.write(`${ANSI.BLUE}connect/${ANSI.RESET}\r\n`);
    term.write("  socials  contact  blog  github\r\n");
    term.write(`${ANSI.BLUE}utilities/${ANSI.RESET}\r\n`);
    term.write("  whatsmyip  date  echo  version  clear  reload  help  ls  sudo  matrix  history\r\n");
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

  notFound: (term, command) => {
    term.write(`Command not found: ${command}\r\n`);
    const suggestion = findClosestCommand(command ?? "", commandNames);
    if (suggestion) {
      term.write(`Did you mean: ${suggestion}?\r\n`);
    }
  },
} as const satisfies ICommands;

export { commandNames };
export default commands;
