import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { bdt } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — SHolok" },
      { name: "description", content: "Review the items in your SHolok cart and checkout securely." },
      { property: "og:title", content: "Your cart — SHolok" },
      { property: "og:description", content: "Review your items and checkout on SHolok." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartProducts, setQty, removeFromCart, subtotal, discount, delivery, total } = useShop();

  if (!cartProducts.length) {
    return (
      <div className="shell py-20 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-extrabold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">Add a few favourites and they'll show up here.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-[10px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-6">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Your cart</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-3">
          {cartProducts.map(({ line, product }) => (
            <div key={line.id} className="flex gap-4 rounded-[16px] border border-border bg-card p-3">
              <img src={product.image} alt="" className="h-24 w-24 rounded-[12px] object-cover" />
              <div className="min-w-0 flex-1">
                <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 text-sm font-semibold text-ink hover:text-primary-deep">
                  {product.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {[line.color, line.size].filter(Boolean).join(" · ") || product.brand}
                </p>
                <p className="mt-1 text-base font-bold text-ink">{bdt(product.price)}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center rounded-[10px] border border-border">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(line.id, line.qty - 1)} className="grid h-9 w-9 place-items-center">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-7 text-center text-sm font-bold">{line.qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty(line.id, line.qty + 1)} className="grid h-9 w-9 place-items-center">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(line.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-[16px] border border-border bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-semibold">{bdt(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-primary-deep">
              <dt>You save</dt>
              <dd className="font-semibold">-{bdt(discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd className="font-semibold">{delivery === 0 ? "Free" : bdt(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold text-ink">
              <dt>Total</dt>
              <dd>{bdt(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-[10px] bg-primary text-sm font-bold text-primary-foreground hover:bg-primary-deep"
          >
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
