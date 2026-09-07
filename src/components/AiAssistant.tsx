import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Send, Sparkles, X } from "lucide-react";
import { bdt, products, type Product } from "@/data/catalog";

type Msg = { role: "user" | "bot"; text: string; items?: Product[] };

const prompts = [
  "Find me a good phone under ৳30,000",
  "Show me gifts for a birthday",
  "Find skincare products",
  "What's trending today?",
];

function mockReply(q: string): Msg {
  const t = q.toLowerCase();
  if (t.includes("phone") || t.includes("laptop") || t.includes("tech")) {
    return {
      role: "bot",
      text: "Here are popular tech picks within budget, all from verified sellers:",
      items: products.filter((p) => p.category === "electronics").slice(0, 3),
    };
  }
  if (t.includes("skin") || t.includes("beauty") || t.includes("serum")) {
    return {
      role: "bot",
      text: "These skincare favourites have the highest ratings this month:",
      items: products.filter((p) => p.category === "beauty").slice(0, 3),
    };
  }
  if (t.includes("gift") || t.includes("birthday")) {
    return {
      role: "bot",
      text: "Gift ideas people are loving right now:",
      items: [products[0], products[50], products[33]].filter((p): p is Product => Boolean(p)),
    };
  }
  if (t.includes("trend")) {
    return {
      role: "bot",
      text: "Trending across SHolok today:",
      items: products.filter((p) => p.badge === "Bestseller").slice(0, 3),
    };
  }
  return {
    role: "bot",
    text: "Here are some products you may like based on what shoppers are buying:",
    items: products.slice(4, 7),
  };
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm SHolok AI. Tell me what you're shopping for and I'll suggest picks." },
  ]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => setMsgs((m) => [...m, mockReply(q)]), 450);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Ask SHolok AI"
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-bold text-card shadow-pop transition hover:bg-primary-deep lg:bottom-6 lg:right-6"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Ask SHolok AI</span>
      </button>

      {open && (
        <div className="fixed bottom-0 right-0 z-[80] flex h-[80vh] w-full flex-col overflow-hidden rounded-t-[18px] border border-border bg-card shadow-pop sm:bottom-6 sm:right-6 sm:h-[560px] sm:w-[380px] sm:rounded-[18px]">
          <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-bold text-ink">
              <Sparkles className="h-4 w-4 text-primary-deep" /> SHolok AI
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-bold text-primary-deep">
                Demo
              </span>
            </span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="grid h-8 w-8 place-items-center rounded-full hover:bg-card">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className={`max-w-[85%] rounded-[14px] px-3.5 py-2.5 text-sm ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface text-ink"
                  }`}
                >
                  {m.text}
                </div>
                {m.items && (
                  <div className="mt-2 space-y-2">
                    {m.items.map((p) => (
                      <Link
                        key={p.id}
                        to="/product/$id"
                        params={{ id: p.id }}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-[12px] border border-border p-2 hover:bg-surface"
                      >
                        <img src={p.image} alt="" loading="lazy" className="h-12 w-12 rounded-[8px] object-cover" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-xs font-medium">{p.name}</span>
                          <span className="text-xs font-bold text-primary-deep">{bdt(p.price)}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto hide-scrollbar">
              {prompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => ask(p)}
                  className="shrink-0 rounded-full border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-primary hover:text-primary-deep"
                >
                  {p}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="grid grid-cols-[minmax(0,1fr)_auto] gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products…"
                aria-label="Message SHolok AI"
                className="min-w-0 rounded-[10px] border border-border px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button className="grid h-10 w-10 place-items-center rounded-[10px] bg-primary text-primary-foreground" aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
