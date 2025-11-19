import { Terminal as Xterm } from "@xterm/xterm";

export type ICommandCallback = (term: Xterm, command?: string) => void;
export type ICommands = Record<string, ICommandCallback>;

export type TIPInfo = {
  city: string;
  country: string;
  ip: string;
  loc: string;
  org: string;
  postal: string;
  region: string;
  timezone: string;
  readme?: string;
};
