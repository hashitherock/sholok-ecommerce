import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, Package } from "lucide-react";
import { bdt, products } from "@/data/catalog";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My orders — SHolok" },
      { name: "description", content: "Track your SHolok orders from confirmation to doorstep delivery." },
      { property: "og:title", content: "My orders — SHolok" },
      { property: "og:description", content: "Follow every order step by step." },
    ],
  }),
  component: OrdersPage,
});

const steps = ["Order placed", "Packed", "Shipped", "Out for delivery", "Delivered"];

const orders = [
  { id: "SH-ORD-48213", date: "6 Sep 2026", stage: 3, items: products.slice(0, 2) },
  { id: "SH-ORD-47990", date: "28 Aug 2026", stage: 5, items: products.slice(16, 18) },
];

function OrdersPage() {
  return (
    <div className="shell py-6">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">My orders</h1>
      <div className="mt-6 space-y-4">
        {orders.map((o) => {
          const total = o.items.reduce((s, p) => s + p.price, 0);
          return (
            <article key={o.id} className="rounded-[16px] border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-ink">{o.id}</p>
                  <p className="text-xs text-muted-foreground">Placed {o.date}</p>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary-deep">
                  {steps[o.stage - 1]}
                </span>
              </div>

              <ul className="mt-4 space-y-3">
                {o.items.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-12 w-12 rounded-[8px] object-cover" />
                    <Link to="/product/$id" params={{ id: p.id }} className="min-w-0 flex-1 truncate text-sm font-medium text-ink hover:text-primary-deep">
                      {p.name}
                    </Link>
                    <span className="text-sm font-bold">{bdt(p.price)}</span>
                  </li>
                ))}
              </ul>

              <ol className="mt-5 grid gap-2 sm:grid-cols-5">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-2 text-xs">
                    {i < o.stage ? (
                      <CheckCircle2 className="h-4 w-4 text-primary-deep" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={i < o.stage ? "font-semibold text-ink" : "text-muted-foreground"}>{s}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Package className="h-4 w-4" /> Delivered by SHolok Express
                </span>
                <span className="text-sm font-extrabold text-ink">{bdt(total)}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
