import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { bdt, categories, products } from "@/data/catalog";

export const Route = createFileRoute("/category/$slug")({
  validateSearch: (search: Record<string, unknown>) => ({
    sub: typeof search['sub'] === "string" ? (search['sub'] as string) : undefined,
  }),
  head: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    const title = `${cat?.name ?? "Shop"} — SHolok`;
    const description = cat?.tagline ?? "Browse products from verified sellers on SHolok.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryPage,
});

const sorts = ["Popular", "Price: low to high", "Price: high to low", "Rating", "Newest"] as const;

function CategoryPage() {
  const { slug } = Route.useParams();
  const { sub } = Route.useSearch();
  const cat = categories.find((c) => c.slug === slug);
  const [activeSub, setActiveSub] = useState<string | undefined>(sub);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Popular");
  const [showFilters, setShowFilters] = useState(false);

  const list = useMemo(() => {
    let out = products.filter((p) => p.category === slug);
    if (activeSub) out = out.filter((p) => p.subcategory === activeSub);
    out = out.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    const sorted = [...out];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "Newest") sorted.sort((a) => (a.badge === "New" ? -1 : 1));
    return sorted;
  }, [slug, activeSub, maxPrice, minRating, sort]);

  if (!cat) {
    return (
      <div className="shell py-20 text-center">
        <h1 className="text-2xl font-extrabold text-ink">Category not found</h1>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary-deep underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-6">
      <nav className="mb-4 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary-deep">
          Home
        </Link>{" "}
        / <span className="text-ink">{cat.name}</span>
      </nav>

      <div className="overflow-hidden rounded-[18px] border border-border bg-card">
        <img src={cat.image} alt={cat.name} className="h-32 w-full object-cover sm:h-44" />
        <div className="p-5">
          <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{cat.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{cat.tagline}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`${showFilters ? "block" : "hidden"} space-y-6 lg:block`}>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Subcategory</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              <button
                type="button"
                onClick={() => setActiveSub(undefined)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${!activeSub ? "border-primary bg-primary-soft text-primary-deep" : "border-border"}`}
              >
                All
              </button>
              {cat.subcategories.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setActiveSub(s)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${activeSub === s ? "border-primary bg-primary-soft text-primary-deep" : "border-border"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Max price · {bdt(maxPrice)}
            </p>
            <input
              type="range"
              min={100}
              max={100000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[hsl(var(--primary))]"
              aria-label="Maximum price"
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Rating</p>
            <div className="flex flex-wrap gap-2">
              {[0, 4, 4.5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${minRating === r ? "border-primary bg-primary-soft text-primary-deep" : "border-border"}`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">{list.length} products</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className="inline-flex items-center gap-2 rounded-[10px] border border-border px-3 py-2 text-xs font-semibold lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
                aria-label="Sort products"
                className="rounded-[10px] border border-border bg-card px-3 py-2 text-xs font-semibold"
              >
                {sorts.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {list.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-[16px] border border-dashed border-border p-12 text-center">
              <p className="text-sm font-semibold text-ink">No products match these filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try widening the price range or rating.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
