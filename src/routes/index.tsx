import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";
import hero from "@/assets/hero-1.jpg";
import { ProductRow, SectionHeading } from "@/components/ProductRow";
import { ProductCard } from "@/components/ProductCard";
import {
  bestSellers,
  brands,
  categories,
  flashDeals,
  newArrivals,
  recommended,
  trending,
} from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHolok — Shop Everything You Love, Delivered Fast" },
      {
        name: "description",
        content:
          "Discover electronics, fashion, beauty, grocery and more from verified sellers on SHolok, with fast nationwide delivery and easy returns.",
      },
      { property: "og:title", content: "SHolok — Shop Everything You Love" },
      {
        property: "og:description",
        content: "A premium multi-category marketplace with daily deals, trusted brands and fast delivery.",
      },
    ],
  }),
  component: Home,
});

const perks = [
  { icon: Truck, title: "Fast delivery", text: "Nationwide in 24–72 hours" },
  { icon: RotateCcw, title: "7-day returns", text: "No-questions-asked policy" },
  { icon: ShieldCheck, title: "Verified sellers", text: "Every shop is vetted" },
  { icon: Headphones, title: "Support 24/7", text: "Real people, any time" },
];

function Home() {
  return (
    <div className="space-y-14 pb-16">
      <section className="shell pt-6">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative overflow-hidden rounded-[20px] bg-ink">
            <img src={hero} alt="Season sale on SHolok" className="h-[280px] w-full object-cover opacity-80 sm:h-[380px]" />
            <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-10">
              <span className="w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground">
                Season Sale · up to 60% off
              </span>
              <h1 className="max-w-md text-3xl font-extrabold leading-tight text-card sm:text-5xl">
                Everything you love, delivered to your door
              </h1>
              <p className="max-w-sm text-sm text-card/85">
                Thousands of products across nine categories from verified sellers across the country.
              </p>
              <Link
                to="/category/$slug"
                params={{ slug: "electronics" }}
                search={{ sub: undefined }}
                className="w-fit rounded-[12px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-deep"
              >
                Shop the sale
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {categories.slice(0, 2).map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                search={{ sub: undefined }}
                className="relative overflow-hidden rounded-[20px] border border-border bg-card"
              >
                <img src={c.image} alt={c.name} className="h-[130px] w-full object-cover sm:h-[182px]" />
                <span className="absolute bottom-0 left-0 right-0 bg-card/90 px-4 py-3">
                  <span className="block text-sm font-bold text-ink">{c.name}</span>
                  <span className="block text-xs text-muted-foreground">{c.tagline}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => (
            <div key={p.title} className="flex items-center gap-3 rounded-[14px] border border-border bg-card p-4">
              <p.icon className="h-6 w-6 text-primary-deep" />
              <span>
                <span className="block text-sm font-bold text-ink">{p.title}</span>
                <span className="block text-xs text-muted-foreground">{p.text}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="shell">
        <SectionHeading title="Shop by category" subtitle="Nine curated worlds of products" />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              search={{ sub: undefined }}
              className="group rounded-[14px] border border-border bg-card p-2 text-center hover:border-primary"
            >
              <img src={c.image} alt="" className="mx-auto h-16 w-full rounded-[10px] object-cover" />
              <span className="mt-2 block text-[11px] font-semibold text-ink">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell">
        <SectionHeading title="Flash deals" subtitle="Big savings, limited stock" />
        <ProductRow products={flashDeals} />
      </section>

      <section className="shell">
        <SectionHeading title="Trending now" subtitle="What shoppers are loving today" />
        <ProductRow products={trending} />
      </section>

      <section className="shell">
        <SectionHeading title="Bestsellers" subtitle="Tried, tested and reordered" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {bestSellers.slice(0, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="shell">
        <SectionHeading title="New arrivals" subtitle="Fresh in this week" />
        <ProductRow products={newArrivals} />
      </section>

      <section className="shell">
        <SectionHeading title="Top brands" subtitle="Verified sellers on SHolok" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {brands.map((b) => (
            <Link
              key={b.name}
              to="/seller"
              className="flex items-center gap-3 rounded-[14px] border border-border bg-card p-4 hover:border-primary"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary-deep">
                {b.initials}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-ink">{b.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{b.tag}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell">
        <SectionHeading title="Recommended for you" subtitle="Based on what you browse" />
        <ProductRow products={recommended} />
      </section>
    </div>
  );
}
