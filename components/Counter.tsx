"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Counts up from 0 to `to` shortly after mount. */
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      delay: 0.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [to, reduced]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}
