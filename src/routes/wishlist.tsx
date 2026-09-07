import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { byId } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — SHolok" },
      { name: "description", content: "Everything you saved for later on SHolok, ready when you are." },
      { property: "og:title", content: "Wishlist — SHolok" },
      { property: "og:description", content: "Your saved products on SHolok." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useShop();
  const items = wishlist.map(byId).filter(Boolean);

  return (
    <div className="shell py-6">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">Wishlist</h1>
      {items.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="py-20 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-sm font-semibold text-ink">Nothing saved yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Tap the heart on any product to keep it here.</p>
          <Link to="/" className="mt-6 inline-block rounded-[10px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
            Explore products
          </Link>
        </div>
      )}
    </div>
  );
}
