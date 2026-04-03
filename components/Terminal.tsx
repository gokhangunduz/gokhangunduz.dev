"use client";

import { ReactElement, useRef, useEffect } from "react";
import { useTerminal } from "@/hooks/useTerminal";
import "@xterm/xterm/css/xterm.css";

export default function Terminal(): ReactElement {
  const { terminalRef, viewportRef } = useTerminal();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      if (viewportRef.current) viewportRef.current.scrollTop += delta;
    };

    overlay.addEventListener("touchstart", handleTouchStart, { passive: false });
    overlay.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      overlay.removeEventListener("touchstart", handleTouchStart);
      overlay.removeEventListener("touchmove", handleTouchMove);
    };
  }, [viewportRef]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={terminalRef}
        className="terminal"
        role="application"
        tabIndex={0}
        aria-label="Interactive terminal — type 'help' for available commands"
      />
      <div ref={overlayRef} className="touch-overlay" />
    </div>
  );
}
