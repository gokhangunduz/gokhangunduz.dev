"use client";

import { ReactElement } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import "@xterm/xterm/css/xterm.css";

export default function Terminal(): ReactElement {
  const ref = useTerminal();

  return <div ref={ref} className="terminal" />;
}
