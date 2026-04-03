import me from "@/constants/me";
import { ICommands } from "@/types/types";
import { getIPInfo } from "@/apis/apis";
import packageJSON from "@/package.json";
import { findClosestCommand } from "@/utils/fuzzy";
import { colorizeJSON } from "@/utils/colorize";

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
];

const commands = {
  whoami: (term) => {
    try {
      term.write(colorizeJSON(me).replace(/\n/g, "\r\n") + "\r\n");
    } catch {
      term.write("Could not display user information.\r\n");
    }
  },

  whatsmyip: async (term) => {
    term.write("Fetching IP info...\r\n");
    try {
      const res = await getIPInfo();
      if (res) {
        term.write(colorizeJSON(res).replace(/\n/g, "\r\n") + "\r\n");
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
    term.write("  \x1b[36mIdentity\x1b[0m\r\n");
    term.write("    whoami · skills · experience · education · projects\r\n");
    term.write("\r\n");
    term.write("  \x1b[36mConnect\x1b[0m\r\n");
    term.write("    socials · contact · blog · github\r\n");
    term.write("\r\n");
    term.write("  \x1b[36mUtilities\x1b[0m\r\n");
    term.write("    whatsmyip · date · echo · version · clear · reload · help\r\n");
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

export default commands;
