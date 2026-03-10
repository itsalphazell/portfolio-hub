"use client";

import { motion, useReducedMotion } from "motion/react";

interface HeroAccentLineProps {
  children: string;
}

export function HeroAccentLine({ children }: HeroAccentLineProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className="hero-accent-line block text-[rgb(154_198_255)]">
        {children}
      </span>
    );
  }

  return (
    <motion.span
      animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
      className="hero-accent-line block bg-[linear-gradient(120deg,#eef6ff_0%,#8ab7ff_24%,#7bf7ff_50%,#7a92ff_76%,#eef6ff_100%)] bg-[length:220%_100%] bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      transition={{
        opacity: { duration: 0.55, ease: "easeOut", delay: 0.08 },
        y: { duration: 0.55, ease: "easeOut", delay: 0.08 },
        filter: { duration: 0.55, ease: "easeOut", delay: 0.08 },
        backgroundPositionX: {
          duration: 9,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        },
      }}
      viewport={{ once: true, amount: 0.8 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    >
      {children}
    </motion.span>
  );
}
