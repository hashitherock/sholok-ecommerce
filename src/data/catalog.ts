import grocery from "@/assets/cat-grocery.jpg";
import fashion from "@/assets/cat-fashion.jpg";
import beauty from "@/assets/cat-beauty.jpg";
import electronics from "@/assets/cat-electronics.jpg";
import home from "@/assets/cat-home.jpg";
import health from "@/assets/cat-health.jpg";
import baby from "@/assets/cat-baby.jpg";
import sports from "@/assets/cat-sports.jpg";
import accessories from "@/assets/cat-accessories.jpg";

export const categoryImages: Record<string, string> = {
  grocery,
  fashion,
  beauty,
  electronics,
  home,
  health,
  baby,
  sports,
  accessories,
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: "New" | "Bestseller" | "Deal" | "Limited" | undefined;
  delivery: string;
  stock: number;
  sold: number;
  colors: string[];
  sizes: string[];
  description: string;
};

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  subcategories: string[];
};

export const categories: Category[] = [
  {
    slug: "grocery",
    name: "Grocery",
    tagline: "Fresh essentials, every day.",
    image: grocery,
    subcategories: [
      "Fruits",
      "Vegetables",
      "Meat",
      "Fish",
      "Dairy",
      "Bakery",
      "Beverages",
      "Snacks",
    ],
  },
  {
    slug: "fashion",
    name: "Fashion",
    tagline: "Discover your everyday style.",
    image: fashion,
    subcategories: [
      "Women's Fashion",
      "Men's Fashion",
      "Kids Fashion",
      "Shoes",
      "Bags",
      "Accessories",
    ],
  },
  {
    slug: "beauty",
    name: "Beauty",
    tagline: "Feel good. Look great.",
    image: beauty,
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance", "Personal Care", "Tools"],
  },
  {
    slug: "electronics",
    name: "Electronics",
    tagline: "Smart tech for everyday life.",
    image: electronics,
    subcategories: [
      "Smartphones",
      "Laptops",
      "Headphones",
      "Smart Watches",
      "Accessories",
      "Home Tech",
    ],
  },
  {
    slug: "home",
    name: "Home & Living",
    tagline: "Make your space yours.",
    image: home,
    subcategories: ["Furniture", "Kitchen", "Decor", "Lighting", "Storage", "Cleaning"],
  },
  {
    slug: "health",
    name: "Health & Wellness",
    tagline: "Everyday care, simplified.",
    image: health,
    subcategories: ["Vitamins", "Medical Devices", "Sexual Wellness", "First Aid", "Herbal"],
  },
  {
    slug: "baby",
    name: "Baby & Kids",
    tagline: "Gentle picks for little ones.",
    image: baby,
    subcategories: ["Diapers", "Baby Food", "Toys", "Kids Clothing", "Feeding", "Bath"],
  },
  {
    slug: "sports",
    name: "Sports",
    tagline: "Move more, every day.",
    image: sports,
    subcategories: ["Fitness", "Outdoor", "Cycling", "Sportswear", "Nutrition"],
  },
  {
    slug: "accessories",
    name: "Accessories",
    tagline: "The finishing touch.",
    image: accessories,
    subcategories: ["Watches", "Eyewear", "Wallets", "Jewellery", "Stationery"],
  },
];

const seeds: Array<
  [string, string, string, string, number, number, number, number, Product["badge"] | undefined]
> = [
  ["Aurora Noise-Cancelling Headphones", "NovaTech", "electronics", "Headphones", 6490, 9990, 4.8, 2143, "Bestseller"],
  ["Pulse Pro Wireless Earbuds", "NovaTech", "electronics", "Headphones", 2790, 4500, 4.6, 1876, "Deal"],
  ["NovaTech Vega 5G Smartphone 128GB", "NovaTech", "electronics", "Smartphones", 28990, 34990, 4.7, 942, "Bestseller"],
  ["SmartLiving Air Purifier Mini", "SmartLiving", "electronics", "Home Tech", 8990, 12500, 4.4, 388, undefined],
  ["Chrono Fit Smart Watch Series 4", "NovaTech", "electronics", "Smart Watches", 4990, 7990, 4.5, 1204, "Deal"],
  ["UltraSlim 14\" Laptop Core i5 16GB", "NovaTech", "electronics", "Laptops", 74900, 84900, 4.6, 311, undefined],
  ["65W GaN Fast Charger Dual Port", "SmartLiving", "electronics", "Accessories", 1590, 2290, 4.3, 806, undefined],
  ["Studio Bluetooth Speaker", "NovaTech", "electronics", "Home Tech", 3450, 4990, 4.4, 522, "New"],

  ["Everyday Cotton Oversized Tee", "StyleHub", "fashion", "Women's Fashion", 890, 1490, 4.5, 3320, "Bestseller"],
  ["Relaxed Fit Denim Jacket", "StyleHub", "fashion", "Women's Fashion", 2490, 3990, 4.4, 743, undefined],
  ["Classic Court Sneakers", "UrbanNest", "fashion", "Shoes", 2990, 4590, 4.6, 1512, "Deal"],
  ["Handcrafted Leather Crossbody Bag", "UrbanNest", "fashion", "Bags", 3690, 5490, 4.7, 402, undefined],
  ["Men's Linen Casual Shirt", "StyleHub", "fashion", "Men's Fashion", 1290, 1990, 4.3, 987, undefined],
  ["Slim Chino Trousers", "StyleHub", "fashion", "Men's Fashion", 1590, 2490, 4.2, 655, undefined],
  ["Kids Soft Knit Hoodie", "BabyBloom", "fashion", "Kids Fashion", 990, 1590, 4.5, 288, "New"],
  ["Everyday Canvas Tote", "UrbanNest", "fashion", "Bags", 750, 1250, 4.4, 1120, undefined],

  ["PureGlow Vitamin C Brightening Serum", "PureGlow", "beauty", "Skincare", 1250, 1950, 4.8, 4210, "Bestseller"],
  ["Hydra Barrier Moisturising Cream", "PureGlow", "beauty", "Skincare", 980, 1490, 4.6, 1877, undefined],
  ["Gentle Foaming Face Wash 150ml", "PureGlow", "beauty", "Skincare", 520, 790, 4.5, 2410, "Deal"],
  ["Velvet Matte Lipstick Set of 3", "PureGlow", "beauty", "Makeup", 1490, 2290, 4.4, 903, undefined],
  ["Argan Repair Hair Oil 100ml", "PureGlow", "beauty", "Haircare", 690, 1090, 4.5, 1330, undefined],
  ["Ceramide Sunscreen SPF 50+", "PureGlow", "beauty", "Skincare", 890, 1350, 4.7, 2088, "Bestseller"],
  ["Signature Eau de Parfum 50ml", "PureGlow", "beauty", "Fragrance", 2790, 4290, 4.3, 412, "New"],
  ["Ionic Hair Dryer 1800W", "SmartLiving", "beauty", "Tools", 2290, 3490, 4.2, 366, undefined],

  ["Premium Basmati Rice 5kg", "FreshMart", "grocery", "Snacks", 890, 1150, 4.6, 5120, "Bestseller"],
  ["Cold Pressed Mustard Oil 1L", "FreshMart", "grocery", "Snacks", 320, 420, 4.4, 2210, undefined],
  ["Fresh Farm Eggs Tray of 30", "FreshMart", "grocery", "Dairy", 390, 460, 4.5, 3311, "Deal"],
  ["Seasonal Fruit Basket 3kg", "FreshMart", "grocery", "Fruits", 1290, 1690, 4.3, 640, undefined],
  ["Daily Vegetable Combo Pack", "FreshMart", "grocery", "Vegetables", 450, 620, 4.4, 1502, undefined],
  ["Full Cream Milk 1L Pack of 4", "FreshMart", "grocery", "Dairy", 420, 520, 4.6, 2874, undefined],
  ["Whole Wheat Bread Loaf", "FreshMart", "grocery", "Bakery", 85, 110, 4.2, 998, undefined],
  ["Roasted Almonds 500g", "FreshMart", "grocery", "Snacks", 780, 1050, 4.5, 1244, "Deal"],

  ["HomeCraft Ceramic Table Lamp", "HomeCraft", "home", "Lighting", 2490, 3690, 4.5, 288, undefined],
  ["Solid Oak Round Side Table", "HomeCraft", "home", "Furniture", 6990, 9990, 4.6, 176, "New"],
  ["Linen Cushion Cover Set of 4", "HomeCraft", "home", "Decor", 1190, 1890, 4.4, 812, "Deal"],
  ["Non-Stick Cookware Set 5pcs", "HomeCraft", "home", "Kitchen", 3990, 5990, 4.5, 1043, "Bestseller"],
  ["Stackable Storage Boxes Set of 3", "HomeCraft", "home", "Storage", 1290, 1890, 4.3, 522, undefined],
  ["Microfibre Cleaning Kit", "SmartLiving", "home", "Cleaning", 690, 990, 4.2, 733, undefined],

  ["Daily Multivitamin 60 Tablets", "PureGlow", "health", "Vitamins", 890, 1290, 4.5, 1633, undefined],
  ["Digital Blood Pressure Monitor", "SmartLiving", "health", "Medical Devices", 3290, 4590, 4.6, 486, "Bestseller"],
  ["Omega-3 Fish Oil Softgels", "PureGlow", "health", "Vitamins", 1190, 1690, 4.4, 902, undefined],
  ["Family First Aid Kit", "SmartLiving", "health", "First Aid", 1490, 2190, 4.3, 254, undefined],

  ["BabyBloom Ultra Soft Diapers M-48", "BabyBloom", "baby", "Diapers", 1290, 1690, 4.7, 2210, "Bestseller"],
  ["Anti-Colic Feeding Bottle 250ml", "BabyBloom", "baby", "Feeding", 590, 890, 4.5, 1102, undefined],
  ["Wooden Stacking Blocks Set", "BabyBloom", "baby", "Toys", 990, 1490, 4.6, 388, "New"],
  ["Baby Gentle Body Wash 400ml", "BabyBloom", "baby", "Bath", 640, 890, 4.4, 764, undefined],

  ["Trail Running Shoes Lightweight", "UrbanNest", "sports", "Fitness", 3490, 4990, 4.5, 921, "Deal"],
  ["Neoprene Dumbbell Pair 5kg", "SmartLiving", "sports", "Fitness", 1890, 2690, 4.4, 512, undefined],
  ["Extra Thick Yoga Mat 8mm", "SmartLiving", "sports", "Fitness", 1290, 1890, 4.6, 1344, "Bestseller"],
  ["Insulated Sports Bottle 750ml", "UrbanNest", "sports", "Outdoor", 690, 990, 4.3, 866, undefined],

  ["Minimal Steel Analog Watch", "UrbanNest", "accessories", "Watches", 3290, 4990, 4.5, 611, undefined],
  ["Polarised Tortoise Sunglasses", "UrbanNest", "accessories", "Eyewear", 1690, 2590, 4.4, 428, "Deal"],
  ["Slim Leather Bifold Wallet", "UrbanNest", "accessories", "Wallets", 1290, 1990, 4.6, 1077, "Bestseller"],
  ["Hardcover Dotted Notebook A5", "HomeCraft", "accessories", "Stationery", 390, 590, 4.5, 1980, undefined],
];

const colorSets: Record<string, string[]> = {
  fashion: ["Sand", "Charcoal", "Olive", "Ivory"],
  electronics: ["Midnight", "Silver", "Graphite"],
  beauty: ["Standard"],
  home: ["Natural", "White", "Walnut"],
  accessories: ["Brown", "Black", "Tan"],
};

const sizeSets: Record<string, string[]> = {
  fashion: ["S", "M", "L", "XL"],
  sports: ["S", "M", "L"],
  baby: ["S", "M", "L"],
};

export const products: Product[] = seeds.map((s, i) => {
  const [name, brand, category, subcategory, price, oldPrice, rating, reviews, badge] = s;
  const stock = 8 + ((i * 7) % 40);
  return {
    id: `SH-${1000 + i}`,
    name,
    brand,
    category,
    subcategory,
    price,
    oldPrice,
    rating,
    reviews,
    image: categoryImages[category] ?? fashion,
    badge,
    delivery: i % 3 === 0 ? "Free delivery" : i % 3 === 1 ? "Delivery in 24h" : "Express available",
    stock,
    sold: 40 + ((i * 13) % 160),
    colors: colorSets[category] ?? ["Standard"],
    sizes: sizeSets[category] ?? [],
    description:
      "Carefully selected by SHolok's curation team and shipped from verified sellers. Quality checked before dispatch, with easy 7-day returns and nationwide delivery.",
  };
});

export const discountOf = (p: Product) => Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

export const bdt = (n: number) => `৳${n.toLocaleString("en-US")}`;

export const byId = (id: string) => products.find((p) => p.id === id);

export const flashDeals = products.filter((p) => discountOf(p) >= 33).slice(0, 10);
export const bestSellers = products.filter((p) => p.badge === "Bestseller");
export const newArrivals = products.filter((p) => p.badge === "New");
export const trending = [0, 16, 10, 31, 24, 8].map((i) => products[i]).filter((p): p is Product => Boolean(p));
export const recommended = products.slice(3, 13);

export const brands = [
  { name: "UrbanNest", tag: "Everyday design objects", initials: "UN" },
  { name: "NovaTech", tag: "Smart tech, simply made", initials: "NT" },
  { name: "PureGlow", tag: "Skin-first beauty", initials: "PG" },
  { name: "HomeCraft", tag: "Made for living rooms", initials: "HC" },
  { name: "FreshMart", tag: "Fresh from local farms", initials: "FM" },
  { name: "StyleHub", tag: "Wardrobe essentials", initials: "SH" },
  { name: "SmartLiving", tag: "Home that works for you", initials: "SL" },
  { name: "BabyBloom", tag: "Gentle care for little ones", initials: "BB" },
];

export const trendingSearches = [
  "wireless headphones",
  "cotton saree",
  "vitamin c serum",
  "air fryer",
  "school bag",
  "smart watch",
  "basmati rice",
  "running shoes",
];

export const recentSearches = ["earbuds", "kids hoodie", "face wash", "table lamp"];
