import { Link } from "@tanstack/react-router";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[10px] bg-primary text-primary-foreground ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16l-1.4 12.2a1.6 1.6 0 0 1-1.6 1.4H7a1.6 1.6 0 0 1-1.6-1.4L4 7Z" />
        <path d="M9 10V6.4A3.4 3.4 0 0 1 15 4" />
      </svg>
    </span>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="SHolok home">
      <LogoMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
      <span className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-tight text-ink ${compact ? "text-xl" : "text-2xl"}`}>
          SH<span className="text-primary-deep">olok</span>
        </span>
        {!compact && (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Marketplace
          </span>
        )}
      </span>
    </Link>
  );
}
