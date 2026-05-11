/**
 * Demo catalog for category browse — Unsplash URLs.
 */

export type ProductTypeId = "flagship" | "mid" | "budget";

export function getProductTypeLabel(typeId: ProductTypeId): string {
  switch (typeId) {
    case "flagship":
      return "Flagship";
    case "mid":
      return "Mid-range";
    case "budget":
      return "Budget";
    default:
      return typeId;
  }
}

export type BrowseProduct = {
  id: string;
  title: string;
  price: string;
  priceRupees: number;
  imageSrc: string;
  imageAlt: string;
  brandId: string;
  typeId: ProductTypeId;
  /** Demo 0–5 star rating */
  rating: number;
  /** Ids from `TOP_SELLING_FILTER_OPTIONS` */
  topSellingTags: string[];
  /** Days since launch (demo) */
  daysSinceLaunch: number;
  /** Optional retail / EMI screen copy */
  sku?: string;
  displayTitle?: string;
  /** When set, used as the default amount on the EMI payment screen */
  emiPriceRupees?: number;
};

export type BrandOption = {
  id: string;
  label: string;
  iconKey?: string;
};

export type ChipOption = { id: string; label: string };

export type CategoryBrowsePayload = {
  categoryLabel: string;
  searchPlaceholder: string;
  brandOptions: BrandOption[];
  products: BrowseProduct[];
};

export const ALL = "all";

/** Bottom sheet: Top selling (multi-select, OR within group). */
export const TOP_SELLING_FILTER_OPTIONS: ChipOption[] = [
  { id: "bestseller", label: "Bestseller picks" },
  { id: "trending", label: "Trending this week" },
  { id: "most_viewed", label: "Most viewed" },
];

/** Bottom sheet: Highest rated (OR — product must meet any selected bar). */
export const HIGHEST_RATED_FILTER_OPTIONS: { id: string; label: string; minRating: number }[] = [
  { id: "r4", label: "4★ & above", minRating: 4 },
  { id: "r45", label: "4.5★ & above", minRating: 4.5 },
];

/** Bottom sheet: New launch (OR — product within any selected window). */
export const NEW_LAUNCH_FILTER_OPTIONS: { id: string; label: string; maxDays: number }[] = [
  { id: "n30", label: "Last 30 days", maxDays: 30 },
  { id: "n90", label: "Last 90 days", maxDays: 90 },
];

export type BrowseFilterState = {
  brandIds: Set<string>;
  topSellingIds: Set<string>;
  highestRatedIds: Set<string>;
  newLaunchIds: Set<string>;
};

export function emptyBrowseFilterState(): BrowseFilterState {
  return {
    brandIds: new Set(),
    topSellingIds: new Set(),
    highestRatedIds: new Set(),
    newLaunchIds: new Set(),
  };
}

export function cloneBrowseFilterState(f: BrowseFilterState): BrowseFilterState {
  return {
    brandIds: new Set(f.brandIds),
    topSellingIds: new Set(f.topSellingIds),
    highestRatedIds: new Set(f.highestRatedIds),
    newLaunchIds: new Set(f.newLaunchIds),
  };
}

export function productMatchesFilters(p: BrowseProduct, f: BrowseFilterState): boolean {
  if (f.brandIds.size > 0 && !f.brandIds.has(p.brandId)) return false;
  if (f.topSellingIds.size > 0) {
    const ok = p.topSellingTags.some((t) => f.topSellingIds.has(t));
    if (!ok) return false;
  }
  if (f.highestRatedIds.size > 0) {
    const ok = HIGHEST_RATED_FILTER_OPTIONS.some(
      (opt) => f.highestRatedIds.has(opt.id) && p.rating >= opt.minRating,
    );
    if (!ok) return false;
  }
  if (f.newLaunchIds.size > 0) {
    const ok = NEW_LAUNCH_FILTER_OPTIONS.some(
      (opt) => f.newLaunchIds.has(opt.id) && p.daysSinceLaunch <= opt.maxDays,
    );
    if (!ok) return false;
  }
  return true;
}

function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function demoMeta(id: string): Pick<BrowseProduct, "rating" | "topSellingTags" | "daysSinceLaunch"> {
  const h = hashId(id);
  const tags: string[] = [];
  if (h % 3 === 0) tags.push("bestseller");
  if (h % 4 === 1) tags.push("trending");
  if (h % 5 === 2) tags.push("most_viewed");
  return {
    rating: Math.min(5, 3.5 + (h % 16) / 10),
    topSellingTags: tags,
    daysSinceLaunch: (h % 120) + 1,
  };
}

export const DEFAULT_BRAND_OPTIONS: BrandOption[] = [
  { id: ALL, label: "All brands" },
  { id: "apple", label: "Apple", iconKey: "apple" },
  { id: "samsung", label: "Samsung", iconKey: "samsung" },
  { id: "google", label: "Google", iconKey: "google" },
  { id: "oneplus", label: "OnePlus", iconKey: "oneplus" },
  { id: "xiaomi", label: "Xiaomi", iconKey: "xiaomi" },
  { id: "oppo", label: "Oppo", iconKey: "oppo" },
  { id: "vivo", label: "Vivo", iconKey: "vivo" },
  { id: "realme", label: "realme", iconKey: "realme" },
  { id: "sony", label: "Sony", iconKey: "sony" },
  { id: "asus", label: "ASUS", iconKey: "asus" },
  { id: "lenovo", label: "Lenovo", iconKey: "lenovo" },
  { id: "dell", label: "Dell", iconKey: "dell" },
  { id: "hp", label: "HP", iconKey: "hp" },
];

export function getBrandLabel(brandId: string): string {
  const opt = DEFAULT_BRAND_OPTIONS.find((b) => b.id === brandId);
  return opt?.label ?? brandId;
}

const U = "https://images.unsplash.com";

type ProductExtras = Partial<Pick<BrowseProduct, "sku" | "displayTitle" | "emiPriceRupees">>;

function p(
  id: string,
  title: string,
  price: string,
  priceRupees: number,
  imagePath: string,
  imageAlt: string,
  brandId: string,
  typeId: ProductTypeId,
  extras?: ProductExtras,
): BrowseProduct {
  return {
    id,
    title,
    price,
    priceRupees,
    imageSrc: `${U}${imagePath}`,
    imageAlt,
    brandId,
    typeId,
    ...demoMeta(id),
    ...extras,
  };
}

export function getCategoryBrowseData(categoryId: string): CategoryBrowsePayload | null {
  const map: Record<string, CategoryBrowsePayload> = {
    iphones: {
      categoryLabel: "iPhones",
      searchPlaceholder: "Search iPhones & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "ip-1",
          "Apple iPhone 16 Pro Max",
          "₹1,34,900",
          134_900,
          "/photo-1695048133142-1a20484d2569?w=800&q=85",
          "Apple iPhone 16 Pro Max",
          "apple",
          "flagship",
          {
            sku: "MYWV3HN/A",
            displayTitle: "Apple iPhone 16 Pro Max 256GB Black Titanium_MYWV3HN/A",
            emiPriceRupees: 137_000,
          },
        ),
        p(
          "ip-2",
          "Apple iPhone 16 Pro",
          "₹1,19,900",
          119_900,
          "/photo-1721860773747-6e4076de6a8f?w=800&q=85",
          "Apple iPhone 16 Pro",
          "apple",
          "flagship",
        ),
        p(
          "ip-3",
          "Apple iPhone 15",
          "₹65,900",
          65_900,
          "/photo-1511707171634-5f897ff02aa9?w=800&q=85",
          "Apple iPhone 15",
          "apple",
          "mid",
        ),
        p(
          "ip-4",
          "Samsung Galaxy S24 Ultra",
          "₹1,29,999",
          129_999,
          "/photo-1610945415295-d9bbf067e59c?w=800&q=85",
          "Samsung Galaxy S24 Ultra",
          "samsung",
          "flagship",
        ),
        p(
          "ip-5",
          "Google Pixel 8a",
          "₹43,999",
          43_999,
          "/photo-1592899677977-9c2373509e27?w=800&q=85",
          "Google Pixel 8a",
          "google",
          "mid",
        ),
        p(
          "ip-6",
          "realme 12",
          "₹17,999",
          17_999,
          "/photo-1511707171634-5f897ff02aa9?w=800&q=85",
          "realme 12",
          "realme",
          "budget",
        ),
      ],
    },
    macs: {
      categoryLabel: "Macs",
      searchPlaceholder: "Search Macs & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "mc-1",
          "MacBook Pro 16″ M4",
          "₹2,49,900",
          249_900,
          "/photo-1517336714731-489689fd1ca8?w=800&q=85",
          "MacBook Pro 16",
          "apple",
          "flagship",
        ),
        p(
          "mc-2",
          "MacBook Air 15″ M3",
          "₹1,34,900",
          134_900,
          "/photo-1496181133206-80ce9b88a853?w=800&q=85",
          "MacBook Air 15",
          "apple",
          "mid",
        ),
        p(
          "mc-3",
          "Dell XPS 15",
          "₹1,89,990",
          189_990,
          "/photo-1593642632823-8f785ba67e45?w=800&q=85",
          "Dell XPS 15",
          "dell",
          "flagship",
        ),
        p(
          "mc-4",
          "HP Pavilion 15",
          "₹52,990",
          52_990,
          "/photo-1588872657578-7efd1f1555ed?w=800&q=85",
          "HP Pavilion 15",
          "hp",
          "mid",
        ),
      ],
    },
    ipads: {
      categoryLabel: "iPads",
      searchPlaceholder: "Search iPads & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "pd-1",
          "iPad Pro 13″ M4",
          "₹1,19,900",
          119_900,
          "/photo-1544244015-0df4b3ffc6b0?w=800&q=85",
          "iPad Pro",
          "apple",
          "flagship",
        ),
        p(
          "pd-2",
          "iPad Air",
          "₹59,900",
          59_900,
          "/photo-1561154464-82a9ad2920d7?w=800&q=85",
          "iPad Air",
          "apple",
          "mid",
        ),
        p(
          "pd-3",
          "Lenovo Tab P12",
          "₹35,999",
          35_999,
          "/photo-1585790050230-5dd28404ccb9?w=800&q=85",
          "Lenovo Tab",
          "lenovo",
          "budget",
        ),
      ],
    },
    watches: {
      categoryLabel: "Watches",
      searchPlaceholder: "Search watches & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "wa-1",
          "Apple Watch Ultra 2",
          "₹89,900",
          89_900,
          "/photo-1625948515291-69613efd103f?w=800&q=85",
          "Apple Watch Ultra 2",
          "apple",
          "flagship",
        ),
        p(
          "wa-2",
          "Apple Watch Series 10",
          "₹45,900",
          45_900,
          "/photo-1434493789840-2f02dc6ca35d?w=800&q=85",
          "Apple Watch Series 10",
          "apple",
          "mid",
        ),
        p(
          "wa-3",
          "Samsung Galaxy Watch 7",
          "₹27,999",
          27_999,
          "/photo-1579586337278-3befd40fd17a?w=800&q=85",
          "Galaxy Watch",
          "samsung",
          "mid",
        ),
      ],
    },
    airpods: {
      categoryLabel: "Airpods",
      searchPlaceholder: "Search AirPods & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "ap-1",
          "AirPods Pro 2",
          "₹24,900",
          24_900,
          "/photo-1600294037681-04ff0f49b29e?w=800&q=85",
          "AirPods Pro",
          "apple",
          "mid",
        ),
        p(
          "ap-2",
          "AirPods 4",
          "₹12,900",
          12_900,
          "/photo-1572569511254-d8f925e2fce9?w=800&q=85",
          "AirPods 4",
          "apple",
          "budget",
        ),
        p(
          "ap-3",
          "Sony WF-1000XM5",
          "₹24,990",
          24_990,
          "/photo-1590658268037-6bf12165a8df?w=800&q=85",
          "Sony earbuds",
          "sony",
          "mid",
        ),
      ],
    },
    vision: {
      categoryLabel: "Vision Pro",
      searchPlaceholder: "Search Vision & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "vi-1",
          "Apple Vision Pro",
          "₹2,84,900",
          284_900,
          "/photo-1712002641088-119e0e2e8c4b?w=800&q=85",
          "Apple Vision Pro",
          "apple",
          "flagship",
        ),
      ],
    },
    appletv: {
      categoryLabel: "Apple TV",
      searchPlaceholder: "Search Apple TV & EMI offers",
      brandOptions: DEFAULT_BRAND_OPTIONS,
      products: [
        p(
          "tv-1",
          "Apple TV 4K",
          "₹16,900",
          16_900,
          "/photo-1593359677879-a4bb92f829d1?w=800&q=85",
          "Apple TV 4K",
          "apple",
          "mid",
        ),
        p(
          "tv-2",
          "Google Chromecast 4K",
          "₹4,499",
          4_499,
          "/photo-1616469829581-73993eb86b02?w=800&q=85",
          "Chromecast",
          "google",
          "budget",
        ),
      ],
    },
  };

  return map[categoryId] ?? null;
}
