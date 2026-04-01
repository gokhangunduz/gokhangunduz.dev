import { Terminal as Xterm } from "@xterm/xterm";

export type ICommandCallback = (
  term: Xterm,
  command?: string,
) => void | Promise<void>;
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

export type IMeData = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  skills: string[];
  experiences: Array<{
    company: string;
    title: string;
    date: string;
  }>;
  educations: Array<{
    school: string;
    title: string;
    degree: string;
  }>;
  projects: Array<{
    name: string;
    url: string;
    live: string;
  }>;
  socials: {
    github: string;
    linkedin: string;
    medium: string;
    email: string;
  };
};
