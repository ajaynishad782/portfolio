"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import SocialLinks from "@/components/SocialLinks";

function Avatar() {
  const [failed, setFailed] = useState(false);
  const { avatar, name } = portfolio.personal;
  const initials = name
    .replace(/\[|\]/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (failed || !avatar) {
    return (
      <div
        aria-hidden="true"
        className="from-accent/20 to-accent/5 text-accent flex h-full w-full items-center justify-center bg-gradient-to-br text-5xl font-bold"
      >
        {initials || "?"}
      </div>
    );
  }

  return (
    <Image
      src={avatar}
      alt={`Portrait of ${name}`}
      fill
      priority
      sizes="(max-width: 768px) 12rem, 18rem"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const { personal } = portfolio;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* Subtle background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="bg-accent/10 absolute top-0 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={container}
        initial={reduce ? "visible" : "hidden"}
        animate="visible"
        className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_auto]"
      >
        <div>
          <motion.span
            variants={item}
            className="border-border bg-card text-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {personal.availability}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-accent mt-3 text-xl font-medium sm:text-2xl"
          >
            {personal.title}
          </motion.p>

          <motion.p
            variants={item}
            className="text-muted mt-6 max-w-xl text-lg leading-relaxed"
          >
            {personal.intro}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="bg-accent text-accent-foreground inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            >
              View My Work
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:bg-foreground/5 inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <SocialLinks includeEmail />
          </motion.div>
        </div>

        <motion.div variants={item} className="order-first md:order-last">
          <div className="border-border relative mx-auto h-48 w-48 overflow-hidden rounded-2xl border sm:h-56 sm:w-56 md:h-72 md:w-72">
            <Avatar />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
