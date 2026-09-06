import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/catalog";

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
      <div className="min-w-0">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function ProductRow({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 640, behavior: "smooth" });

  return (
    <div className="relative">
      <div ref={ref} className="scroll-row">
        {products.map((p) => (
          <div key={p.id} className="w-[164px] sm:w-[210px]">
            <ProductCard product={p} compact />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 -left-4 hidden items-center lg:flex">
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border bg-card shadow-card transition hover:bg-surface"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 -right-4 hidden items-center lg:flex">
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-border bg-card shadow-card transition hover:bg-surface"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
