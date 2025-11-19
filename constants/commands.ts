import me from "@/constants/me";
import { ICommands } from "@/types/types";
import { getIPInfo } from "@/apis/apis";
import packageJSON from "@/package.json";

const commands = {
  whoami: (term) => {
    term.write(JSON.stringify(me, null, 2).replace(/\n/g, "\r\n") + "\r\n");
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
