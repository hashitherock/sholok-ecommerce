import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { bdt, byId, discountOf } from "@/data/catalog";
import { Stars } from "@/components/Stars";
import { useShop } from "@/lib/shop-store";

type QuickViewState = { open: (id: string) => void };
const Ctx = createContext<QuickViewState | null>(null);

export function useQuickView() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQuickView must be used inside QuickViewProvider");
  return ctx;
}

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const value = useMemo(() => ({ open: setId }), []);
  return (
    <Ctx.Provider value={value}>
      {children}
      {id && <QuickViewModal id={id} onClose={() => setId(null)} />}
    </Ctx.Provider>
  );
}

function QuickViewModal({ id, onClose }: { id: string; onClose: () => void }) {
  const product = byId(id);
  const { addToCart } = useShop();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product?.colors[0] ?? "Standard");
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[20px] bg-card shadow-pop sm:rounded-[18px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-0 sm:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-square w-full object-cover sm:rounded-l-[18px]"
          />
          <div className="relative space-y-3 p-5 sm:p-6">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wide text-primary-deep">
              {product.brand}
            </span>
            <h2 className="pr-10 text-lg font-bold leading-snug text-ink">{product.name}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Stars rating={product.rating} />
              {product.rating.toFixed(1)} · {product.reviews.toLocaleString()} reviews
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-ink">{bdt(product.price)}</span>
              <span className="text-sm text-muted-foreground line-through">{bdt(product.oldPrice)}</span>
              <span className="text-sm font-bold text-accent">-{discountOf(product)}%</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setVariant(c)}
                  className={`rounded-[8px] border px-3 py-1.5 text-xs font-semibold transition ${
                    variant === c
                      ? "border-primary bg-primary-soft text-primary-deep"
                      : "border-border text-muted-foreground hover:border-border-strong"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-[10px] border border-border">
                <button type="button" aria-label="Decrease quantity" className="grid h-9 w-9 place-items-center text-muted-foreground" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button type="button" aria-label="Increase quantity" className="grid h-9 w-9 place-items-center text-muted-foreground" onClick={() => setQty((q) => q + 1)}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, { qty, color: variant });
                  onClose();
                }}
                className="h-10 flex-1 rounded-[10px] bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary-deep"
              >
                Add to cart
              </button>
            </div>
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              onClick={onClose}
              className="inline-block text-sm font-semibold text-primary-deep underline-offset-4 hover:underline"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
