import { IsidebarState } from "../Contexts/MainContextInterfaces";

export interface IMainHook {
  sidebarState: IsidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<IsidebarState>>;
}
