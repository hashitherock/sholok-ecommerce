import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { byId, type Product } from "@/data/catalog";

export type CartLine = {
  id: string;
  qty: number;
  color?: string;
  size?: string;
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (id: string, opts?: { qty?: number; color?: string; size?: string; silent?: boolean }) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  markViewed: (id: string) => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  cartProducts: Array<{ line: CartLine; product: Product }>;
};

const ShopContext = createContext<ShopState | null>(null);
const KEY = "sholok-state-v1";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCart(parsed.cart ?? []);
        setWishlist(parsed.wishlist ?? []);
        setRecentlyViewed(parsed.recentlyViewed ?? []);
      }
    } catch {
      /* demo only */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, recentlyViewed }));
  }, [cart, wishlist, recentlyViewed, hydrated]);

  const addToCart: ShopState["addToCart"] = useCallback((id, opts = {}) => {
    const { qty = 1, color, size, silent } = opts;
    setCart((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty, color: color ?? l.color, size: size ?? l.size } : l));
      }
      return [...prev, { id, qty, color, size }];
    });
    if (!silent) toast.success("Added to cart", { description: byId(id)?.name });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
    toast("Removed from cart");
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      toast[has ? "message" : "success"](has ? "Removed from wishlist" : "Added to wishlist");
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, []);

  const markViewed = useCallback((id: string) => {
    setRecentlyViewed((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const value = useMemo<ShopState>(() => {
    const cartProducts = cart
      .map((line) => ({ line, product: byId(line.id) }))
      .filter((x): x is { line: CartLine; product: Product } => Boolean(x.product));
    const subtotal = cartProducts.reduce((s, { line, product }) => s + product.price * line.qty, 0);
    const discount = cartProducts.reduce(
      (s, { line, product }) => s + (product.oldPrice - product.price) * line.qty,
      0,
    );
    const delivery = subtotal === 0 || subtotal > 2000 ? 0 : 60;
    return {
      cart,
      wishlist,
      recentlyViewed,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      toggleWishlist,
      inWishlist: (id: string) => wishlist.includes(id),
      markViewed,
      cartCount: cart.reduce((s, l) => s + l.qty, 0),
      subtotal,
      discount,
      delivery,
      total: subtotal + delivery,
      cartProducts,
    };
  }, [cart, wishlist, recentlyViewed, addToCart, setQty, removeFromCart, clearCart, toggleWishlist, markViewed]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
