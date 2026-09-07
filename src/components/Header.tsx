import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Camera,
  ChevronDown,
  Heart,
  LayoutGrid,
  Mic,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { SearchOverlay } from "@/components/SearchOverlay";
import { categories } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

const navLinks = [
  { label: "Home", slug: null },
  { label: "Flash Deals", slug: "deals" },
  { label: "Grocery", slug: "grocery" },
  { label: "Fashion", slug: "fashion" },
  { label: "Beauty", slug: "beauty" },
  { label: "Electronics", slug: "electronics" },
  { label: "Home & Living", slug: "home" },
  { label: "Health", slug: "health" },
  { label: "Baby & Kids", slug: "baby" },
  { label: "Sports", slug: "sports" },
];

export function Header() {
  const { cartCount, wishlist } = useShop();
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCat, setActiveCat] = useState(categories[0]?.slug ?? "grocery");
  const navigate = useNavigate();

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const active = categories.find((c) => c.slug === activeCat)!;

  return (
    <header className="sticky top-0 z-50 bg-card shadow-[0_1px_0_var(--color-border)]">
      {/* Utility bar */}
      <div className="hidden border-b border-border bg-surface lg:block">
        <div className="shell flex h-9 items-center justify-between text-[12px] text-muted-foreground">
          <span>Welcome to SHolok — curated shopping from verified sellers</span>
          <nav className="flex items-center gap-5" aria-label="Utility">
            <Link to="/orders" className="hover:text-primary-deep">Track Order</Link>
            <Link to="/seller" className="hover:text-primary-deep">Become a Seller</Link>
            <Link to="/account" className="hover:text-primary-deep">Help Center</Link>
            <span className="text-border-strong">|</span>
            <span>Download App</span>
          </nav>
        </div>
      </div>

      {/* Main header */}
      <div className="shell grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3 lg:gap-8 lg:py-4">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileMenu(true)}
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-border lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo compact />
        </div>

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="hidden w-full items-center gap-3 rounded-[12px] border-2 border-primary bg-card px-4 py-2.5 text-left text-sm text-muted-foreground transition hover:shadow-card lg:flex"
        >
          <Search className="h-5 w-5 text-primary-deep" />
          <span className="flex-1">Search for products, brands and categories</span>
          <Mic className="h-4 w-4" aria-hidden="true" />
          <Camera className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1 lg:gap-4">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-[10px] border border-border lg:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <span className="hidden items-center gap-1.5 text-sm text-muted-foreground xl:flex">
            <MapPin className="h-4 w-4 text-primary-deep" /> Dhaka
          </span>
          <Link to="/wishlist" className="relative hidden h-10 w-10 place-items-center rounded-[10px] text-ink hover:bg-surface sm:grid" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </Link>
          <Link to="/account" className="hidden h-10 place-items-center rounded-[10px] px-2 text-ink hover:bg-surface sm:grid" aria-label="Account">
            <User className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative grid h-10 w-10 place-items-center rounded-[10px] text-ink hover:bg-surface" aria-label={`Cart, ${cartCount} items`}>
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </Link>
        </div>
      </div>

      {/* Nav */}
      <div className="hidden border-t border-border lg:block">
        <div className="shell relative flex items-center gap-1">
          <button
            type="button"
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen((v) => !v)}
            aria-expanded={megaOpen}
            className="my-2 inline-flex items-center gap-2 rounded-[10px] bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            <LayoutGrid className="h-4 w-4" /> Categories
            <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
          </button>
          <nav className="flex flex-1 items-center gap-1 overflow-x-auto hide-scrollbar" aria-label="Main">
            {navLinks.map((l) =>
              l.slug === null ? (
                <Link key={l.label} to="/" className="whitespace-nowrap rounded-[8px] px-3 py-2 text-sm font-medium text-ink hover:bg-surface">
                  {l.label}
                </Link>
              ) : l.slug === "deals" ? (
                <Link key={l.label} to="/search" search={{ q: "deals" }} className="whitespace-nowrap rounded-[8px] px-3 py-2 text-sm font-bold text-accent hover:bg-accent-soft">
                  {l.label}
                </Link>
              ) : (
                <Link
                  key={l.label}
                  to="/category/$slug"
                  params={{ slug: l.slug }}
                  search={{ sub: undefined }}
                  className="whitespace-nowrap rounded-[8px] px-3 py-2 text-sm font-medium text-ink hover:bg-surface"
                >
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <Link to="/seller" className="whitespace-nowrap rounded-[8px] px-3 py-2 text-sm font-semibold text-primary-deep">
            Sell on SHolok
          </Link>

          {megaOpen && (
            <div
              className="absolute left-0 top-full z-40 w-full pb-6"
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="grid grid-cols-[240px_1fr_280px] overflow-hidden rounded-b-[18px] border border-border bg-card shadow-pop">
                <ul className="border-r border-border bg-surface py-2">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <button
                        type="button"
                        onMouseEnter={() => setActiveCat(c.slug)}
                        onClick={() => {
                          setMegaOpen(false);
                          navigate({ to: "/category/$slug", params: { slug: c.slug }, search: { sub: undefined } });
                        }}
                        className={`w-full px-5 py-2.5 text-left text-sm font-medium transition ${
                          activeCat === c.slug ? "bg-card text-primary-deep" : "text-ink hover:bg-card"
                        }`}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {active.name}
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-2.5">
                    {active.subcategories.map((s) => (
                      <Link
                        key={s}
                        to="/category/$slug"
                        params={{ slug: active.slug }}
                        search={{ sub: s }}
                        onClick={() => setMegaOpen(false)}
                        className="text-sm text-ink hover:text-primary-deep"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">{active.tagline}</p>
                </div>
                <div className="relative m-4 overflow-hidden rounded-[14px] bg-surface">
                  <img src={active.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent p-5 text-card">
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-lg font-extrabold">Fresh Deals Everyday</p>
                      <p className="text-sm opacity-90">Up to 40% off in {active.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {mobileMenu && <MobileMenu onClose={() => setMobileMenu(false)} />}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
      {n}
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-[95] bg-ink/45 lg:hidden" onClick={onClose}>
      <div
        className="h-full w-[85%] max-w-sm overflow-y-auto bg-card p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <Logo compact />
          <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-border">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-6 space-y-1" aria-label="Mobile">
          <Link to="/" onClick={onClose} className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold hover:bg-surface">Home</Link>
          {categories.map((c) => (
            <div key={c.slug} className="border-b border-border last:border-0">
              <button
                type="button"
                onClick={() => setOpen((o) => (o === c.slug ? null : c.slug))}
                aria-expanded={open === c.slug}
                className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold"
              >
                {c.name}
                <ChevronDown className={`h-4 w-4 transition-transform ${open === c.slug ? "rotate-180" : ""}`} />
              </button>
              {open === c.slug && (
                <ul className="pb-2">
                  {c.subcategories.map((s) => (
                    <li key={s}>
                      <Link
                        to="/category/$slug"
                        params={{ slug: c.slug }}
                        search={{ sub: s }}
                        onClick={onClose}
                        className="block rounded-[8px] px-6 py-2 text-sm text-muted-foreground hover:bg-surface"
                      >
                        {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link to="/seller" onClick={onClose} className="mt-3 block rounded-[10px] bg-primary-soft px-3 py-2.5 text-sm font-bold text-primary-deep">
            Become a Seller
          </Link>
          <Link to="/login" onClick={onClose} className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold hover:bg-surface">
            Login / Sign up
          </Link>
        </nav>
      </div>
    </div>
  );
}
