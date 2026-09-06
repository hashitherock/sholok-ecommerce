import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingCart, Truck } from "lucide-react";
import { useState } from "react";
import { Stars } from "@/components/Stars";
import { bdt, discountOf, type Product } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";
import { useQuickView } from "@/components/QuickViewProvider";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const { open } = useQuickView();
  const [pop, setPop] = useState(false);
  const saved = inWishlist(product.id);
  const off = discountOf(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-card transition-shadow duration-200 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {off > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-[8px] bg-accent px-2 py-1 text-[11px] font-bold text-accent-foreground">
            -{off}%
          </span>
        )}
        {product.badge && product.badge !== "Deal" && (
          <span className="absolute left-2.5 top-10 rounded-[8px] bg-card/95 px-2 py-1 text-[11px] font-semibold text-primary-deep">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setPop(true);
            toggleWishlist(product.id);
            setTimeout(() => setPop(false), 340);
          }}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full border border-border bg-card/90 text-muted-foreground backdrop-blur transition hover:text-accent"
        >
          <Heart
            className={`h-[18px] w-[18px] ${saved ? "fill-accent text-accent" : ""} ${pop ? "heart-pop" : ""}`}
          />
        </button>
        <button
          type="button"
          onClick={() => open(product.id)}
          className="absolute inset-x-2.5 bottom-2.5 hidden items-center justify-center gap-2 rounded-[10px] border border-border bg-card/95 py-2 text-xs font-semibold text-ink opacity-0 backdrop-blur transition-all duration-200 group-hover:opacity-100 sm:flex"
        >
          <Eye className="h-4 w-4" /> Quick view
        </button>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "gap-1 p-3" : "gap-1.5 p-3.5"}`}>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-primary-deep">
          {product.brand}
        </span>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="line-clamp-2 text-sm font-medium leading-snug text-ink hover:text-primary-deep"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Stars rating={product.rating} />
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1.5">
          <span className="text-base font-bold text-ink">{bdt(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{bdt(product.oldPrice)}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Truck className="h-3.5 w-3.5" /> {product.delivery}
        </span>
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-[10px] border border-primary bg-primary-soft text-xs font-bold text-primary-deep transition hover:bg-primary hover:text-primary-foreground"
        >
          <ShoppingCart className="h-4 w-4" /> Add to cart
        </button>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-card">
      <div className="aspect-square skeleton" />
      <div className="space-y-2 p-3.5">
        <div className="h-3 w-1/3 rounded skeleton" />
        <div className="h-3 w-full rounded skeleton" />
        <div className="h-3 w-2/3 rounded skeleton" />
        <div className="h-8 w-full rounded-[10px] skeleton" />
      </div>
    </div>
  );
}
