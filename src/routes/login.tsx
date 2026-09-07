import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — SHolok" },
      { name: "description", content: "Sign in or create your SHolok account to track orders and save favourites." },
      { property: "og:title", content: "Sign in — SHolok" },
      { property: "og:description", content: "Access your SHolok account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <div className="shell grid place-items-center py-14">
      <div className="w-full max-w-md rounded-[20px] border border-border bg-card p-7">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-5 text-center text-xl font-extrabold text-ink">
          {mode === "in" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          This is a demo — no real account is created.
        </p>

        <div className="mt-5 grid grid-cols-2 rounded-[10px] bg-surface p-1 text-sm font-bold">
          {(["in", "up"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-[8px] py-2 ${mode === m ? "bg-card text-ink shadow-card" : "text-muted-foreground"}`}
            >
              {m === "in" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <form
          className="mt-5 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(mode === "in" ? "Signed in (demo)" : "Account created (demo)");
          }}
        >
          {mode === "up" && (
            <label className="block text-xs font-semibold text-muted-foreground">
              Full name
              <input required className="mt-1 w-full rounded-[10px] border border-border px-3 py-2.5 text-sm text-ink outline-none focus:border-primary" placeholder="Your name" />
            </label>
          )}
          <label className="block text-xs font-semibold text-muted-foreground">
            Email or phone
            <input required className="mt-1 w-full rounded-[10px] border border-border px-3 py-2.5 text-sm text-ink outline-none focus:border-primary" placeholder="you@example.com" />
          </label>
          <label className="block text-xs font-semibold text-muted-foreground">
            Password
            <input required type="password" className="mt-1 w-full rounded-[10px] border border-border px-3 py-2.5 text-sm text-ink outline-none focus:border-primary" placeholder="••••••••" />
          </label>
          <button className="h-11 w-full rounded-[10px] bg-primary text-sm font-bold text-primary-foreground hover:bg-primary-deep">
            {mode === "in" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          <Link to="/" className="font-semibold text-primary-deep underline">
            Continue as guest
          </Link>
        </p>
      </div>
    </div>
  );
}
