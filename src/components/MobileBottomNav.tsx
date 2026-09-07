import { Link } from "@tanstack/react-router";
import { Compass, Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useShop } from "@/lib/shop-store";

export function MobileBottomNav() {
  const { cartCount } = useShop();
  const item = "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-medium text-muted-foreground";
  const activeProps = { className: `${item} text-primary-deep` };

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-card pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <Link to="/" className={item} activeProps={activeProps} activeOptions={{ exact: true }}>
        <Home className="h-5 w-5" /> Home
      </Link>
      <Link to="/category/$slug" params={{ slug: "fashion" }} search={{ sub: undefined }} className={item} activeProps={activeProps}>
        <LayoutGrid className="h-5 w-5" /> Categories
      </Link>
      <Link to="/search" search={{ q: "" }} className={item} activeProps={activeProps}>
        <Compass className="h-5 w-5" /> Discover
      </Link>
      <Link to="/cart" className={`${item} relative`} activeProps={activeProps}>
        <span className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
              {cartCount}
            </span>
          )}
        </span>
        Cart
      </Link>
      <Link to="/account" className={item} activeProps={activeProps}>
        <User className="h-5 w-5" /> Account
      </Link>
    </nav>
  );
}
