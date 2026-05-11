import type { ComponentType } from "react";
import {
  Avatar,
  Button,
  Card,
  Chips,
  HeaderDefault,
  Search,
  SectionHeader,
} from "@paytm-h5-common/paytm_common_ui";
import {
  CalendarIcon,
  CardIcon,
  ChevronRightIcon,
  MobileIcon,
  MusicIcon,
  OffersThemedIcon,
  ShopIcon,
  ShoppingIcon,
  VideoIcon,
  WebsiteIcon,
  ZoomInIcon,
} from "@paytm-h5-common/paytm_common_ui/icons";
import { useAppScreenSelection } from "../AppScreenSelectionContext";
import { useSelectedCategoryBrowse } from "../SelectedCategoryContext";
import { useSelectedStoreHome } from "../SelectedStoreContext";
import { CATEGORY_BROWSE_SCREEN_ID, USER_SCREEN_ID } from "../screens";
import { BankEmiOfferCarousel } from "./BankEmiOfferCarousel";
import { MobilePreviewFrame } from "./MobilePreviewFrame";
import s from "./loginScreens.module.scss";
import sh from "./storeHomePage.module.scss";

type CategoryDef = {
  id: string;
  label: string;
  Icon: ComponentType<{ role?: string; "aria-hidden"?: boolean }>;
};

/** Seven product rows; eighth cell is “View more” (chevron only). */
const CATEGORIES: CategoryDef[] = [
  { id: "iphones", label: "iPhones", Icon: MobileIcon },
  { id: "macs", label: "Macs", Icon: WebsiteIcon },
  { id: "ipads", label: "iPads", Icon: CardIcon },
  { id: "watches", label: "Watches", Icon: CalendarIcon },
  { id: "airpods", label: "Airpods", Icon: MusicIcon },
  { id: "vision", label: "Vision\nPro", Icon: ZoomInIcon },
  { id: "appletv", label: "Apple TV", Icon: VideoIcon },
];

type TopProduct = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  variant: string;
  price: string;
};

const TOP_PRODUCTS: TopProduct[] = [
  {
    id: "p1",
    imageSrc:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=348&h=280&fit=crop&q=80",
    imageAlt: "Apple iPhone 16 Pro Max",
    title: "Apple iPhone 16 Pro Max",
    variant: "256 GB · Natural Titanium",
    price: "₹1,34,900",
  },
  {
    id: "p2",
    imageSrc:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=348&h=280&fit=crop&q=80",
    imageAlt: "Apple iPhone 15",
    title: "Apple iPhone 15",
    variant: "128 GB · Blue",
    price: "₹65,900",
  },
  {
    id: "p3",
    imageSrc:
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=348&h=280&fit=crop&q=80",
    imageAlt: "Apple Watch Ultra",
    title: "Apple Watch Ultra 2",
    variant: "49mm · Titanium",
    price: "₹89,900",
  },
  {
    id: "p4",
    imageSrc:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=348&h=280&fit=crop&q=80",
    imageAlt: "iPad Pro",
    title: "iPad Pro 11″",
    variant: "Wi‑Fi · 256 GB",
    price: "₹99,900",
  },
];

type BrandDef = { id: string; name: string; Icon: ComponentType<{ "aria-hidden"?: boolean }> };

const BRANDS: BrandDef[] = [
  { id: "apple", name: "Apple", Icon: ShoppingIcon },
  { id: "samsung", name: "Samsung", Icon: MobileIcon },
  { id: "sony", name: "Sony", Icon: VideoIcon },
  { id: "lg", name: "LG", Icon: WebsiteIcon },
  { id: "dell", name: "Dell", Icon: CardIcon },
  { id: "hp", name: "HP", Icon: ShopIcon },
];

const DEFAULT_STORE_TITLE = "Bharat Enterprises";
const DEFAULT_STORE_SUBTITLE = "Bangalore";

export function HomePageScreen() {
  const goToScreen = useAppScreenSelection();
  const { selectedStoreHome } = useSelectedStoreHome();
  const { setSelectedCategoryBrowse } = useSelectedCategoryBrowse();

  const headerTitle = selectedStoreHome?.name ?? DEFAULT_STORE_TITLE;
  const headerSubtitle = selectedStoreHome?.subtitle ?? DEFAULT_STORE_SUBTITLE;

  return (
    <MobilePreviewFrame>
      <div className={s.appCanvas}>
        <HeaderDefault
          size="medium"
          reserveSpaceForStatusBar
          showBack
          onBackClick={() => goToScreen?.(USER_SCREEN_ID)}
          title={headerTitle}
          subTitle={headerSubtitle}
          avatarProps={{
            type: "icon",
            avatarIcon: {
              Icon: <ShopIcon role="presentation" />,
              outline: true,
            },
          }}
        />
        <div className={s.scroll}>
          <div className={`${s.inner} ${s.innerAfterHeader}`}>
            <div className={sh.searchBlock}>
              <Search
                label="Search your product to see EMI offers"
                onChange={() => undefined}
                onClear={() => undefined}
              />
            </div>

            <BankEmiOfferCarousel />

            <div className={s.sectionHeaderTight}>
              <SectionHeader
                title="Categories"
                size="large"
                customClass={sh.storeSectionHeader}
              />
              <Card customClass={sh.cardOnWash}>
                <ul className={sh.categoryGrid} role="list">
                  {CATEGORIES.map(({ id, label, Icon }) => (
                    <li key={id} className={sh.categoryGridItem}>
                      <button
                        type="button"
                        className={sh.categoryCellButton}
                        onClick={() => {
                          setSelectedCategoryBrowse({
                            id,
                            label: label.replace(/\n/g, " ").trim(),
                          });
                          goToScreen?.(CATEGORY_BROWSE_SCREEN_ID);
                        }}
                      >
                        <Avatar
                          type="icon"
                          size="regular"
                          avatarIcon={{
                            Icon: <Icon aria-hidden />,
                            outline: false,
                          }}
                        />
                        <span className={sh.categoryLabel}>{label}</span>
                      </button>
                    </li>
                  ))}
                  <li className={sh.categoryGridItem}>
                    <button
                      type="button"
                      className={sh.categoryCellButton}
                      aria-label="View more categories"
                      onClick={() => undefined}
                    >
                      <Avatar
                        type="icon"
                        size="regular"
                        avatarIcon={{
                          Icon: <ChevronRightIcon aria-hidden />,
                          outline: false,
                        }}
                      />
                      <span className={sh.categoryLabel}>View more</span>
                    </button>
                  </li>
                </ul>
              </Card>
            </div>

            <div className={s.sectionHeaderTight}>
              <SectionHeader
                title="Top Selling"
                size="large"
                customClass={sh.storeSectionHeader}
                TrailingLink={
                  <Button
                    type="link"
                    label="View All"
                    size="small"
                    onClick={() => undefined}
                  />
                }
              />
              <div
                className={sh.topSellingScroll}
                role="region"
                aria-label="Top selling products"
                tabIndex={0}
              >
                {TOP_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={sh.productCard}
                    onClick={() => undefined}
                  >
                    <div className={sh.productCardImageWrap}>
                      <img
                        className={sh.productCardImage}
                        src={p.imageSrc}
                        alt={p.imageAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className={sh.productCardBody}>
                      <p className={sh.productCardTitle}>{p.title}</p>
                      <p className={sh.productCardVariant}>{p.variant}</p>
                      <p className={sh.productCardPrice}>{p.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div
              className={sh.adBanner}
              role="region"
              aria-label="Promotional offer"
            >
              <span className={sh.adBannerBadge} aria-hidden>
                Offer
              </span>
              <p className={sh.adBannerText}>
                Limited time: reduced EMI processing fee on select bank cards — T&amp;C
                apply
              </p>
            </div>

            <div className={s.sectionHeaderTight}>
              <SectionHeader
                title="Brands"
                size="large"
                customClass={sh.storeSectionHeader}
              />
              <Card customClass={sh.cardOnWash}>
                <div className={sh.brandsChips}>
                  {BRANDS.map((b) => (
                    <Chips
                      key={b.id}
                      type="normal"
                      size="regular"
                      label={b.name}
                      LeadingIcon={<b.Icon aria-hidden />}
                      onClick={() => undefined}
                    />
                  ))}
                </div>
              </Card>
            </div>

            <Card customClass={sh.cardOnWash}>
              <div className={sh.emiEntryRow}>
                <span className={sh.emiEntryIcon} aria-hidden>
                  <OffersThemedIcon />
                </span>
                <div className={sh.emiEntryCopy}>
                  <p className={sh.emiEntryTitle}>Check EMI &amp; card offers</p>
                  <p className={sh.emiEntrySub}>
                    Eligible tenures, bank promos, and no-cost EMI in one place
                  </p>
                </div>
                <Button
                  type="filled"
                  size="small"
                  label="View"
                  onClick={() => undefined}
                />
              </div>
            </Card>
          </div>
        </div>
        <div className={s.homeIndicator} aria-hidden>
          <div className={s.homeIndicatorBar} />
        </div>
      </div>
    </MobilePreviewFrame>
  );
}
