import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products, trendingSearches } from "@/data/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search['q'] === "string" ? (search['q'] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Search products — SHolok" },
      { name: "description", content: "Search thousands of products across every category on SHolok." },
      { property: "og:title", content: "Search products — SHolok" },
      { property: "og:description", content: "Find exactly what you need from verified SHolok sellers." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [sort, setSort] = useState("Relevance");
  const term = q.trim().toLowerCase();

  let results = term
    ? products.filter((p) => `${p.name} ${p.brand} ${p.subcategory} ${p.category}`.toLowerCase().includes(term))
    : products;
  results = [...results];
  if (sort === "Price: low to high") results.sort((a, b) => a.price - b.price);
  if (sort === "Price: high to low") results.sort((a, b) => b.price - a.price);
  if (sort === "Rating") results.sort((a, b) => b.rating - a.rating);

  return (
    <div className="shell py-6">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">
        {term ? `Results for “${q}”` : "Browse all products"}
      </h1>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{results.length} products</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort results"
          className="rounded-[10px] border border-border bg-card px-3 py-2 text-xs font-semibold"
        >
          {["Relevance", "Price: low to high", "Price: high to low", "Rating"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {results.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[16px] border border-dashed border-border p-12 text-center">
          <p className="text-sm font-semibold text-ink">Nothing matched “{q}”</p>
          <p className="mt-1 text-sm text-muted-foreground">Try one of these popular searches instead:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {trendingSearches.slice(0, 5).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => navigate({ to: "/search", search: { q: t } })}
                className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-deep"
              >
                {t}
              </button>
            ))}
          </div>
          <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary-deep underline">
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
