import me from "@/constants/me";
import { ICommands } from "@/types/types";
import { getIPInfo } from "@/apis/apis";
import packageJSON from "@/package.json";

const commands = {
  whoami: (term) => {
    try {
      term.write(JSON.stringify(me, null, 2).replace(/\n/g, "\r\n") + "\r\n");
    } catch {
      term.write("Could not display user information.\r\n");
    }
  },

  whatsmyip: async (term) => {
    try {
      await getIPInfo().then((res) =>
        term.write(
          JSON.stringify(res, null, 2).replace(/\n/g, "\r\n") + "\r\n",
        ),
      );
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
    term.write(`Email  : ${me.email}\r\n`);
    term.write(`GitHub : ${me.socials.github}\r\n`);
    term.write(`LinkedIn : ${me.socials.linkedin}\r\n`);
    term.write(`Medium : ${me.socials.medium}\r\n`);
  },

  version: (term) => {
    term.write(`Version: ${packageJSON.version}\r\n`);
  },

  help: (term) => {
    const keys = Object.keys(commands).filter((key) => key !== "notFound");
    term.write("Available commands;\r\n");
    keys.forEach((key) => term.write(`- ${key}\r\n`));
  },

  clear: (term) => {
    term.clear();
  },

  reload: (term) => {
    term.write("Reloading...\r\n");
    window.location.reload();
  },

  notFound: (term, command) => {
    term.write(`Command not found: ${command}\r\n`);
  },
} as const satisfies ICommands;

export default commands;
