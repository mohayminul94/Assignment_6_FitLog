"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#202027] bg-[#0c0c10]">
      <div className="mx-auto grid min-h-[620px] max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 sm:px-10 lg:min-h-[700px] lg:grid-cols-2 lg:gap-6 lg:px-16 lg:py-12">

        {/* LEFT CONTENT */}
        <div className="relative z-10 flex flex-col items-start">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#b7ff00] sm:text-sm">
            Your fitness journey starts here
          </p>

          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
            Build a healthier,
            <br />
            stronger you
          </h1>

          {/* Green underline */}
          <div className="mt-3 h-1.5 w-3/4 -skew-x-12 bg-[#b7ff00] sm:w-4/5" />

          <p className="mt-7 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
            Track your workouts, follow your plan, and stay consistent.
            FitLog helps you turn your fitness goals into real progress.
          </p>

          {/* CTA */}
          <Link
            href="/workout"
            className="mt-9 inline-flex items-center gap-4 rounded-md bg-[#b7ff00] px-7 py-4 text-sm font-bold uppercase text-black transition-all hover:bg-[#a4e600] hover:shadow-[0_0_25px_rgba(183,255,0,0.2)]"
          >
            Get Started
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          {/* FEATURES */}
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-5 sm:gap-x-7">
            <Feature
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M13 2 3 14h7l-1 8 12-14h-8z" />
                </svg>
              }
              text={<>Personalized<br />Workouts</>}
            />

            <div className="hidden h-10 w-px bg-[#202027] sm:block" />

            <Feature
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M4 14h4v8H4zm6-6h4v14h-4zm6-6h4v20h-4z" />
                </svg>
              }
              text={<>Track Your<br />Progress</>}
            />

            <div className="hidden h-10 w-px bg-[#202027] sm:block" />

            <Feature
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
              }
              text={<>Build Healthy<br />Habits</>}
            />
          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="relative flex min-h-[340px] items-center justify-center lg:min-h-[580px]">
          {/* Green glow */}
          <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#b7ff00]/10 blur-[100px] sm:h-96 sm:w-96" />

          {/* Decorative green shape */}
          <div className="absolute right-0 top-1/2 h-24 w-[85%] -translate-y-1/2 -rotate-[35deg] bg-[#b7ff00]/80 blur-[1px] sm:h-28" />

          {/* Athlete image */}
          <img
            src="/images/hero-athlete.png"
            alt="FitLog athlete lifting a dumbbell"
            className="relative z-10 max-h-[580px] w-full max-w-[500px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-400">
      <span className="shrink-0 text-[#b7ff00]">{icon}</span>
      <span className="leading-5">{text}</span>
    </div>
  );
}