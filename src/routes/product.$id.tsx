import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { Stars } from "@/components/Stars";
import { ProductRow, SectionHeading } from "@/components/ProductRow";
import { bdt, byId, discountOf, products } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = byId(params.id);
    const title = p ? `${p.name} — SHolok` : "Product — SHolok";
    const description = p
      ? `${p.brand} · ${bdt(p.price)}. ${p.delivery}. Buy on SHolok with 7-day returns.`
      : "Browse products on SHolok.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

const tabs = ["Description", "Specifications", "Reviews", "Shipping"] as const;

function ProductPage() {
  const { id } = Route.useParams();
  const product = byId(id);
  const { addToCart, toggleWishlist, inWishlist, markViewed } = useShop();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product?.colors[0] ?? "Standard");
  const [size, setSize] = useState(product?.sizes[0]);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");

  useEffect(() => {
    if (product) markViewed(product.id);
  }, [product, markViewed]);

  if (!product) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="text-2xl font-extrabold text-ink">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary-deep underline">
          Back to home
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 10);
  const saved = inWishlist(product.id);

  return (
    <div className="shell py-6">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary-deep">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/category/$slug" params={{ slug: product.category }} search={{ sub: undefined }} className="hover:text-primary-deep">
          {product.category}
        </Link>{" "}
        / <span className="text-ink">{product.subcategory}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-[18px] border border-border bg-surface">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-[12px] border border-border bg-surface">
                <img src={product.image} alt="" className="aspect-square w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-primary-deep">{product.brand}</span>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Stars rating={product.rating} />
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviews.toLocaleString()} reviews)</span>
            <span>· {product.sold} sold</span>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-extrabold text-ink">{bdt(product.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{bdt(product.oldPrice)}</span>
            <span className="rounded-[8px] bg-accent px-2 py-1 text-xs font-bold text-accent-foreground">
              -{discountOf(product)}%
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Colour</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`rounded-[10px] border px-3 py-2 text-xs font-semibold ${color === c ? "border-primary bg-primary-soft text-primary-deep" : "border-border"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {product.sizes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`h-10 w-12 rounded-[10px] border text-xs font-semibold ${size === s ? "border-primary bg-primary-soft text-primary-deep" : "border-border"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className="text-xs font-semibold text-primary-deep">Only {product.stock} left in stock</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-[10px] border border-border">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product.id, { qty, color, size })}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
            >
              <ShoppingCart className="h-4 w-4" /> Add to cart
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-label="Save to wishlist"
              className="grid h-11 w-11 place-items-center rounded-[10px] border border-border"
            >
              <Heart className={`h-5 w-5 ${saved ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>
          <Link
            to="/checkout"
            onClick={() => addToCart(product.id, { qty, color, size, silent: true })}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-[10px] border border-primary text-sm font-bold text-primary-deep hover:bg-primary-soft"
          >
            Buy now
          </Link>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, text: product.delivery },
              { icon: RotateCcw, text: "7-day easy returns" },
              { icon: ShieldCheck, text: "Verified seller" },
            ].map((x) => (
              <div key={x.text} className="flex items-center gap-2 rounded-[12px] border border-border p-3 text-xs font-semibold text-ink">
                <x.icon className="h-4 w-4 text-primary-deep" /> {x.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[18px] border border-border bg-card">
        <div className="flex gap-1 overflow-x-auto border-b border-border p-2">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-[10px] px-4 py-2 text-sm font-semibold ${tab === t ? "bg-primary-soft text-primary-deep" : "text-muted-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-3 p-5 text-sm text-muted-foreground">
          {tab === "Description" && <p>{product.description}</p>}
          {tab === "Specifications" && (
            <ul className="space-y-2">
              <li>Brand: {product.brand}</li>
              <li>Category: {product.category}</li>
              <li>Subcategory: {product.subcategory}</li>
              <li>Available colours: {product.colors.join(", ")}</li>
            </ul>
          )}
          {tab === "Reviews" && (
            <div className="space-y-4">
              {[
                { n: "Rifat H.", r: 5, t: "Exactly as described, arrived a day early." },
                { n: "Nusrat A.", r: 4, t: "Great quality for the price. Packaging was neat." },
                { n: "Tanvir K.", r: 5, t: "Second time ordering — still excellent." },
              ].map((rv) => (
                <div key={rv.n} className="rounded-[12px] border border-border p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ink">{rv.n}</span>
                    <Stars rating={rv.r} />
                  </div>
                  <p className="mt-1">{rv.t}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "Shipping" && <p>{product.delivery}. Free delivery on orders above ৳2,000. Cash on delivery available nationwide.</p>}
        </div>
      </div>

      <section className="mt-12">
        <SectionHeading title="You may also like" />
        <ProductRow products={related} />
      </section>
    </div>
  );
}
