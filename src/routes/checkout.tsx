import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Truck, Wallet } from "lucide-react";
import { bdt } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — SHolok" },
      { name: "description", content: "Complete your SHolok order with cash on delivery, card or mobile wallet." },
      { property: "og:title", content: "Checkout — SHolok" },
      { property: "og:description", content: "Secure checkout with flexible payment options." },
    ],
  }),
  component: CheckoutPage,
});

const payments = [
  { id: "cod", label: "Cash on delivery", icon: Truck },
  { id: "card", label: "Card payment", icon: CreditCard },
  { id: "wallet", label: "Mobile wallet", icon: Wallet },
];

function CheckoutPage() {
  const { cartProducts, subtotal, delivery, total, clearCart } = useShop();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const orderId = "SH-ORD-48213";

  if (placed) {
    return (
      <div className="shell py-20 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary-deep" />
        <h1 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">Order placed!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Order <span className="font-bold text-ink">{orderId}</span> is confirmed. We'll text you tracking updates.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/orders" className="rounded-[10px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
            Track order
          </Link>
          <Link to="/" className="rounded-[10px] border border-border px-5 py-3 text-sm font-bold text-ink">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!cartProducts.length) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="text-2xl font-extrabold text-ink">Nothing to check out</h1>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary-deep underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-6">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Checkout</h1>
      <ol className="mt-4 flex gap-2 text-xs font-bold">
        {["Address", "Delivery", "Payment"].map((s, i) => (
          <li
            key={s}
            className={`rounded-full px-3 py-1.5 ${step === i + 1 ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="rounded-[16px] border border-border bg-card p-5">
          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {["Full name", "Phone number", "Address line", "City", "Area", "Postcode"].map((f) => (
                <label key={f} className="text-xs font-semibold text-muted-foreground">
                  {f}
                  <input className="mt-1 w-full rounded-[10px] border border-border px-3 py-2.5 text-sm text-ink outline-none focus:border-primary" placeholder={f} />
                </label>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              {[
                { t: "Standard delivery", d: "2–3 days · Free over ৳2,000" },
                { t: "Express delivery", d: "Next day · ৳120" },
              ].map((o) => (
                <label key={o.t} className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-border p-4">
                  <input type="radio" name="delivery" defaultChecked={o.t === "Standard delivery"} className="accent-[hsl(var(--primary))]" />
                  <span>
                    <span className="block text-sm font-bold text-ink">{o.t}</span>
                    <span className="block text-xs text-muted-foreground">{o.d}</span>
                  </span>
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-3">
              {payments.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPayment(p.id)}
                  className={`flex w-full items-center gap-3 rounded-[12px] border p-4 text-left ${payment === p.id ? "border-primary bg-primary-soft" : "border-border"}`}
                >
                  <p.icon className="h-5 w-5 text-primary-deep" />
                  <span className="text-sm font-bold text-ink">{p.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="rounded-[10px] border border-border px-4 py-2.5 text-sm font-bold text-ink disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (step < 3) return setStep((s) => s + 1);
                clearCart();
                setPlaced(true);
              }}
              className="rounded-[10px] bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
            >
              {step < 3 ? "Continue" : "Place order"}
            </button>
          </div>
        </div>

        <aside className="h-fit rounded-[16px] border border-border bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {cartProducts.map(({ line, product }) => (
              <li key={line.id} className="flex items-center gap-3">
                <img src={product.image} alt="" className="h-12 w-12 rounded-[8px] object-cover" />
                <span className="min-w-0 flex-1 text-xs">
                  <span className="block truncate font-semibold text-ink">{product.name}</span>
                  <span className="text-muted-foreground">Qty {line.qty}</span>
                </span>
                <span className="text-sm font-bold">{bdt(product.price * line.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-semibold">{bdt(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd className="font-semibold">{delivery === 0 ? "Free" : bdt(delivery)}</dd>
            </div>
            <div className="flex justify-between text-base font-extrabold text-ink">
              <dt>Total</dt>
              <dd>{bdt(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
