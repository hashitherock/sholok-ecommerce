import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star, Truck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/seller")({
  head: () => ({
    meta: [
      { title: "Nova Living — SHolok verified seller" },
      { name: "description", content: "Browse products from Nova Living, a verified SHolok seller with fast dispatch." },
      { property: "og:title", content: "Nova Living — SHolok verified seller" },
      { property: "og:description", content: "Verified seller storefront on SHolok." },
    ],
  }),
  component: SellerPage,
});

function SellerPage() {
  const items = products.slice(8, 23);

  return (
    <div className="pb-6">
      <div className="border-b border-border bg-surface">
        <div className="shell flex flex-wrap items-center gap-5 py-8">
          <span className="grid h-16 w-16 place-items-center rounded-[16px] bg-primary text-xl font-extrabold text-primary-foreground">
            NL
          </span>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold text-ink">
              Nova Living <BadgeCheck className="h-5 w-5 text-primary-deep" />
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" /> 4.8 seller rating
              </span>
              <span className="inline-flex items-center gap-1">
                <Truck className="h-3.5 w-3.5" /> 96% on-time dispatch
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Dhaka, Bangladesh
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="shell py-6">
        <h2 className="text-lg font-extrabold text-ink">Store products</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
