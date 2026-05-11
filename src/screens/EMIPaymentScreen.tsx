import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  Card,
  HeaderDefault,
  List,
  ListItem,
  SectionHeader,
  SegmentedControl,
  Switch,
  TextField,
} from "@paytm-h5-common/paytm_common_ui";
import { EditIcon } from "@paytm-h5-common/paytm_common_ui/icons";
import {
  getBrandLabel,
  getCategoryBrowseData,
  type BrowseProduct,
} from "../data/categoryBrowseData";
import { useAppScreenSelection } from "../AppScreenSelectionContext";
import { useSelectedEmiProduct } from "../SelectedEmiProductContext";
import { CATEGORY_BROWSE_SCREEN_ID, HOME_PAGE_SCREEN_ID } from "../screens";
import { MobilePreviewFrame } from "./MobilePreviewFrame";
import cardStory from "../../paytm-common-storybook/src/pods-components/Card/Card.stories.module.scss";
import s from "./loginScreens.module.scss";
import emi from "./emiPaymentScreen.module.scss";

const EMI_TABS = [
  { id: "all", title: "All EMI" },
  { id: "nocost", title: "No Cost EMI" },
  { id: "full", title: "Pay in Full" },
] as const;

type BankRowDef = {
  id: string;
  name: string;
  cardKind: string;
  initials: string;
  initialsColor: "lavender" | "water" | "pepperMint";
  /** Trailing badge (ListItem `trailing.type === "badge"`) — semantic tint from Storybook Badge */
  offer: { label: string; context: "positive" | "notice" };
};

const BANK_ROWS: BankRowDef[] = [
  {
    id: "icici",
    name: "ICICI Bank",
    cardKind: "Credit Card",
    initials: "IC",
    initialsColor: "water",
    offer: { label: "No cost EMI", context: "positive" },
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    cardKind: "Credit Card",
    initials: "HD",
    initialsColor: "lavender",
    offer: { label: "Instant Discount", context: "notice" },
  },
  {
    id: "axis",
    name: "Axis Bank",
    cardKind: "Credit Card",
    initials: "AX",
    initialsColor: "pepperMint",
    offer: { label: "No cost EMI", context: "positive" },
  },
];

function formatInrRupees(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

function parseDigitsToRupees(raw: string): number | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : null;
}

function shelfLine(categoryId: string, categoryLabel: string): string {
  if (categoryId === "iphones") return "Mobiles";
  return categoryLabel;
}

function buildMetaLine(
  categoryId: string,
  categoryLabel: string,
  product: BrowseProduct,
): string {
  const shelf = shelfLine(categoryId, categoryLabel);
  const brand = getBrandLabel(product.brandId);
  const sku = product.sku ?? "—";
  return `${shelf}, ${brand} | ${sku}`;
}

export function EMIPaymentScreen() {
  const goToScreen = useAppScreenSelection();
  const { selectedEmiProduct } = useSelectedEmiProduct();

  const demoPayload = useMemo(() => {
    const data = getCategoryBrowseData("iphones");
    const product = data?.products[0];
    if (!data || !product) return null;
    return {
      product,
      categoryId: "iphones",
      categoryLabel: data.categoryLabel,
    };
  }, []);

  const payload = selectedEmiProduct ?? demoPayload;

  const initialRupees = payload
    ? payload.product.emiPriceRupees ?? payload.product.priceRupees
    : 137_000;

  const [priceRupees, setPriceRupees] = useState(initialRupees);
  const [priceField, setPriceField] = useState(() => formatInrRupees(initialRupees));
  const [emiTabId, setEmiTabId] = useState<string>(EMI_TABS[0].id);
  const [showDiscountOffers, setShowDiscountOffers] = useState(false);
  const priceInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const r = payload
      ? payload.product.emiPriceRupees ?? payload.product.priceRupees
      : 137_000;
    setPriceRupees(r);
    setPriceField(formatInrRupees(r));
  }, [payload?.product.id]);

  const headerTitle = `Paying ${formatInrRupees(priceRupees)} in EMI`;

  const productTitle = payload?.product.displayTitle ?? payload?.product.title ?? "Product";
  const metaLine = payload
    ? buildMetaLine(payload.categoryId, payload.categoryLabel, payload.product)
    : "Mobiles, Apple | MYWV3HN/A";

  const onBack = () => {
    goToScreen?.(selectedEmiProduct ? CATEGORY_BROWSE_SCREEN_ID : HOME_PAGE_SCREEN_ID);
  };

  const onPriceChange = (value: string) => {
    setPriceField(value);
    const parsed = parseDigitsToRupees(value);
    if (parsed !== null && parsed > 0) {
      setPriceRupees(parsed);
    }
  };

  const onPriceBlur = () => {
    setPriceField(formatInrRupees(priceRupees));
  };

  if (!payload) {
    return (
      <MobilePreviewFrame>
        <div className={s.appCanvas}>
          <HeaderDefault
            size="medium"
            reserveSpaceForStatusBar
            showBack
            onBackClick={onBack}
            title="EMI payment"
          />
          <div className={s.scroll}>
            <div className={`${s.inner} ${s.innerAfterHeader}`}>
              <p className={emi.emptyState}>
                Open a product from Category browse to see EMI options, or pick EMI payment from the
                nav after browsing a category.
              </p>
            </div>
          </div>
          <div className={s.homeIndicator} aria-hidden>
            <div className={s.homeIndicatorBar} />
          </div>
        </div>
      </MobilePreviewFrame>
    );
  }

  return (
    <MobilePreviewFrame>
      <div className={s.appCanvas}>
        <HeaderDefault
          size="medium"
          reserveSpaceForStatusBar
          showBack
          onBackClick={onBack}
          title={headerTitle}
        />
        <div className={s.scroll}>
          <div className={`${s.inner} ${s.innerAfterHeader}`}>
            <div className={emi.productBlock}>
              <img
                className={emi.productImage}
                src={payload.product.imageSrc}
                alt={payload.product.imageAlt}
                loading="lazy"
                decoding="async"
              />
              <div className={emi.productCopy}>
                <p className={emi.metaLine}>{metaLine}</p>
                <p className={emi.productTitle}>{productTitle}</p>
              </div>
            </div>

            <TextField
              emphasis="high"
              label="Price"
              value={priceField}
              onChange={onPriceChange}
              assistiveText="Please ask the cashier for the best price on this product"
              TrailingIcon={
                <EditIcon
                  aria-label="Edit price"
                  role="button"
                  tabIndex={0}
                  onClick={() => priceInputRef.current?.focus()}
                  onKeyDown={(e: KeyboardEvent<SVGSVGElement>) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      priceInputRef.current?.focus();
                    }
                  }}
                />
              }
              inputProps={{
                ref: priceInputRef,
                inputMode: "numeric",
                onBlur: onPriceBlur,
              }}
            />

            <div className={emi.sectionBlock}>
              <SectionHeader
                size="large"
                title="EMI & Card Offers"
                offset={false}
                customClass={emi.emiOffersHeader}
                TrailingLink={
                  <button type="button" className={emi.compareLink}>
                    Compare
                  </button>
                }
              />
              <div className={emi.segmentWrap}>
                <SegmentedControl
                  controlType="controlled"
                  controlled={{ activeTabID: emiTabId }}
                  tabs={[...EMI_TABS]}
                  onChange={(tab) => setEmiTabId(String(tab.id))}
                />
              </div>
              <Switch
                customClass={emi.discountSwitch}
                active={showDiscountOffers}
                onToggle={() => setShowDiscountOffers((v) => !v)}
                label="Show with Discount & Cashback Offers"
              />
            </div>

            <Card customClass={cardStory.podsSectionTile}>
              <p className={emi.cardListTitle}>Pay Using Credit/Debit cards</p>
              <List customClass={emi.bankList}>
                {BANK_ROWS.map((row, index) => (
                  <ListItem
                    key={row.id}
                    id={row.id}
                    primary={row.name}
                    secondary={row.cardKind}
                    leading={{
                      type: "avatar",
                      position: "top",
                      avatar: {
                        type: "initials",
                        avatarInitials: {
                          initials: row.initials,
                          initialsColor: row.initialsColor,
                        },
                      },
                    }}
                    trailing={{
                      type: "badge",
                      position: "top",
                      badge: {
                        label: row.offer.label,
                        context: row.offer.context,
                        shape: "normal",
                      },
                    }}
                    separator={index < BANK_ROWS.length - 1}
                  />
                ))}
              </List>
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
