import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/Logo";

const columns = [
  {
    title: "About SHolok",
    links: ["Our story", "Careers", "Press & media", "Sustainability", "Affiliate program"],
  },
  {
    title: "Customer Service",
    links: ["Help center", "Track your order", "Returns & refunds", "Delivery information", "Contact us"],
  },
  {
    title: "Shopping With SHolok",
    links: ["Gift cards", "SHolok Plus", "Bulk orders", "Price match", "Buyer protection"],
  },
  {
    title: "Sell on SHolok",
    links: ["Become a seller", "Seller centre", "Seller policies", "Fulfilment support", "Advertise"],
  },
  {
    title: "Policies",
    links: ["Terms of use", "Privacy policy", "Cookie preferences", "Intellectual property"],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-16 border-t border-border bg-card pb-24 lg:pb-0">
      <div className="border-b border-border bg-surface">
        <div className="shell grid gap-6 py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              Deals worth opening. Once a week.
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Get early access to flash sales, new arrivals and members-only prices.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              toast.success("You're subscribed", { description: `We'll email offers to ${email}` });
              setEmail("");
            }}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="min-w-0 rounded-[10px] border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <button className="rounded-[10px] bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:bg-primary-deep">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <LogoMark className="h-9 w-9" />
            <span className="text-xl font-extrabold text-ink">SHolok</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A modern marketplace for everyday essentials, trusted brands and fast delivery across
            Bangladesh.
          </p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <span key={i} className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold text-ink">{col.title}</h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <Link to="/account" className="text-sm text-muted-foreground hover:text-primary-deep">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 SHolok. A UI/UX prototype — no real orders are processed.</span>
          <div className="flex flex-wrap items-center gap-2">
            {["Cash on Delivery", "Visa", "Mastercard", "bKash", "Nagad", "SHolok Express"].map((p) => (
              <span key={p} className="rounded-[6px] border border-border px-2 py-1 text-[11px] font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
