"use client";

import { IsidebarState } from "@/interfaces/Contexts/MainContextInterfaces";
import React, { createContext, useState } from "react";

export const MainContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [sidebarState, setSidebarState] = useState<IsidebarState>({
    isOpen: false,
  });

  return (
    <MainContext.Provider
      value={{
        sidebarState,
        setSidebarState,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
