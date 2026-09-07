import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Clock, Search, TrendingUp, X } from "lucide-react";
import { bdt, categories, products, recentSearches, trendingSearches } from "@/data/catalog";

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const suggestions = term
    ? Array.from(
        new Set(
          products
            .filter((p) => `${p.name} ${p.brand} ${p.subcategory}`.toLowerCase().includes(term))
            .map((p) => p.subcategory.toLowerCase()),
        ),
      ).slice(0, 5)
    : [];
  const matches = term
    ? products.filter((p) => `${p.name} ${p.brand} ${p.subcategory}`.toLowerCase().includes(term)).slice(0, 6)
    : [];

  const go = (value: string) => {
    if (!value.trim()) return;
    onClose();
    navigate({ to: "/search", search: { q: value } });
  };

  return (
    <div className="fixed inset-0 z-[95] bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="max-h-[92vh] overflow-y-auto border-b border-border bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shell py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(q);
            }}
            className="flex items-center gap-3"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[12px] border-2 border-primary bg-card px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-primary-deep" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search for products, brands and categories"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {q && (
                <button type="button" onClick={() => setQ("")} aria-label="Clear search">
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-[10px] px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-ink"
            >
              Cancel
            </button>
          </form>

          <div className="mt-6 grid gap-8 pb-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-6">
              {term ? (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Suggestions
                  </p>
                  <ul className="space-y-1">
                    {suggestions.length ? (
                      suggestions.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            onClick={() => go(s)}
                            className="flex w-full items-center gap-2 rounded-[10px] px-2 py-2 text-left text-sm hover:bg-surface"
                          >
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <span className="capitalize">{s}</span>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-2 py-2 text-sm text-muted-foreground">
                        No suggestions — try “headphones” or “serum”.
                      </li>
                    )}
                  </ul>
                </div>
              ) : (
                <>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Recent searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => go(s)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:border-primary hover:text-primary-deep"
                        >
                          <Clock className="h-3.5 w-3.5" /> {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Trending searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => go(s)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary-deep"
                        >
                          <TrendingUp className="h-3.5 w-3.5" /> {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Popular categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 6).map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => {
                            onClose();
                            navigate({ to: "/category/$slug", params: { slug: c.slug }, search: { sub: undefined } });
                          }}
                          className="rounded-[10px] border border-border px-3 py-1.5 text-xs font-semibold hover:border-primary"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {term ? "Matching products" : "Popular right now"}
              </p>
              <ul className="space-y-1.5">
                {(term ? matches : products.slice(0, 6)).map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate({ to: "/product/$id", params: { id: p.id } });
                      }}
                      className="flex w-full items-center gap-3 rounded-[12px] border border-transparent p-2 text-left transition hover:border-border hover:bg-surface"
                    >
                      <img src={p.image} alt="" loading="lazy" className="h-12 w-12 rounded-[8px] object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">{p.name}</span>
                        <span className="text-xs text-muted-foreground">{p.brand}</span>
                      </span>
                      <span className="shrink-0 text-sm font-bold">{bdt(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
