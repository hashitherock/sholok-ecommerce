import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MapPin, Package, Settings, User } from "lucide-react";
import { byId } from "@/data/catalog";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My account — SHolok" },
      { name: "description", content: "Manage your SHolok profile, addresses, orders and saved items." },
      { property: "og:title", content: "My account — SHolok" },
      { property: "og:description", content: "Your SHolok profile and preferences." },
    ],
  }),
  component: AccountPage,
});

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

function AccountPage() {
  const [tab, setTab] = useState("profile");
  const { wishlist, recentlyViewed } = useShop();

  return (
    <div className="shell py-6">
      <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">My account</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="flex gap-2 overflow-x-auto lg:flex-col">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-[10px] px-3 py-2.5 text-sm font-semibold ${tab === t.id ? "bg-primary-soft text-primary-deep" : "text-muted-foreground hover:bg-surface"}`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </aside>

        <div className="rounded-[16px] border border-border bg-card p-5">
          {tab === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-lg font-bold text-primary-deep">
                  NA
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Nusrat Ahmed</p>
                  <p className="text-xs text-muted-foreground">nusrat@example.com · +880 17XX-XXXXXX</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Full name", "Email", "Phone", "Date of birth"].map((f) => (
                  <label key={f} className="text-xs font-semibold text-muted-foreground">
                    {f}
                    <input className="mt-1 w-full rounded-[10px] border border-border px-3 py-2.5 text-sm text-ink outline-none focus:border-primary" placeholder={f} />
                  </label>
                ))}
              </div>
            </div>
          )}
          {tab === "orders" && (
            <div className="text-sm text-muted-foreground">
              You have 2 recent orders.{" "}
              <Link to="/orders" className="font-semibold text-primary-deep underline">
                View and track them
              </Link>
              .
            </div>
          )}
          {tab === "addresses" && (
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { t: "Home", a: "House 12, Road 5, Dhanmondi, Dhaka 1205" },
                { t: "Office", a: "Level 7, Bay Tower, Gulshan 1, Dhaka 1212" },
              ].map((a) => (
                <div key={a.t} className="rounded-[12px] border border-border p-4">
                  <p className="text-sm font-bold text-ink">{a.t}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.a}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "wishlist" && (
            <div className="text-sm text-muted-foreground">
              {wishlist.length} saved item{wishlist.length === 1 ? "" : "s"}.{" "}
              <Link to="/wishlist" className="font-semibold text-primary-deep underline">
                Open wishlist
              </Link>
              .
            </div>
          )}
          {tab === "settings" && (
            <div className="space-y-3">
              {["Order updates by SMS", "Deal alerts by email", "Personalised recommendations"].map((s) => (
                <label key={s} className="flex items-center justify-between rounded-[12px] border border-border p-4 text-sm font-semibold text-ink">
                  {s}
                  <input type="checkbox" defaultChecked className="accent-[hsl(var(--primary))]" />
                </label>
              ))}
            </div>
          )}

          {recentlyViewed.length > 0 && (
            <div className="mt-6 border-t border-border pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Recently viewed</p>
              <div className="flex gap-3 overflow-x-auto">
                {recentlyViewed.map((id) => {
                  const p = byId(id);
                  if (!p) return null;
                  return (
                    <Link key={id} to="/product/$id" params={{ id }} className="w-24 shrink-0">
                      <img src={p.image} alt="" className="h-24 w-24 rounded-[10px] object-cover" />
                      <span className="mt-1 line-clamp-2 block text-[11px] text-muted-foreground">{p.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
