"use client";

import { MainContext } from "@/contexts/MainContext/MainContext";
import { IMainHook } from "@/interfaces/Hooks/MainHookInterfaces";
import { useContext } from "react";

const useMain = () => {
  const useMain: IMainHook = useContext<IMainHook>(MainContext);

  return useMain;
};

export default useMain;
