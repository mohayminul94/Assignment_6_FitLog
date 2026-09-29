
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Workouts", href: "/workout" },
  { label: "My Plan", href: "/myPlan" },
  { label: "Saved", href: "/saved" },
];

const supportLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#202027] bg-[#0c0c10] text-zinc-400">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-12 sm:px-10 sm:py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-16">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <LogoIcon />
            <span className="text-xl font-black tracking-wide text-white">
              FITLOG
            </span>
          </Link>

          <p className="mt-6 max-w-xs text-sm leading-6 text-zinc-400">
            Your personal fitness companion. Track your workouts, follow
            your plan, and build a healthier, stronger you.
          </p>

          {/* Social Links */}
          <div className="mt-6 flex items-center gap-3">
            <SocialLink label="X" href="https://x.com">
              𝕏
            </SocialLink>

            <SocialLink label="Instagram" href="https://instagram.com">
              ◎
            </SocialLink>

            <SocialLink label="YouTube" href="https://youtube.com">
              ▶
            </SocialLink>

            <SocialLink label="Facebook" href="https://facebook.com">
              f
            </SocialLink>

            <SocialLink label="LinkedIn" href="https://linkedin.com">
              in
            </SocialLink>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-sm font-bold text-[#b7ff00]">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[#b7ff00]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-6 text-sm font-bold text-[#b7ff00]">
            Support
          </h3>

          <ul className="space-y-4 text-sm">
            {supportLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-[#b7ff00]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-6 text-sm font-bold text-[#b7ff00]">
            Stay Updated
          </h3>

          <p className="mb-5 text-sm leading-6">
            Get the latest workouts, tips and updates.
          </p>

          {/* Visual-only newsletter form */}
          <div className="flex overflow-hidden rounded-lg border border-[#292930] bg-[#0a0a0e] focus-within:border-[#b7ff00]">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
            />

            <button
              type="button"
              aria-label="Subscribe"
              className="m-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#b7ff00] text-black transition-colors hover:bg-[#a4e600]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#202027]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 px-6 py-6 sm:px-10 md:flex-row md:items-center lg:px-16">
          <p className="text-xs leading-5 text-zinc-500">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

          <Link href="/" className="inline-flex items-center gap-2">
            <LogoIcon />
            <span className="text-sm font-extrabold text-white">
              FITLOG
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* Logo Icon */
function LogoIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="h-7 w-7 text-[#b7ff00]"
      aria-hidden="true"
    >
      <path
        d="M5 7L25 27M4 14L14 4M18 28L28 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M3 3H10M3 3V10M22 29H29M29 22V29"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Social Link */
function SocialLink({ label, href, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#292930] text-sm font-semibold text-zinc-400 transition-colors hover:border-[#b7ff00] hover:text-[#b7ff00]"
    >
      {children}
    </a>
  );
}