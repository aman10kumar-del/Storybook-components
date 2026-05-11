import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, HeaderDefault, Search } from "@paytm-h5-common/paytm_common_ui";
import { ShopIcon } from "@paytm-h5-common/paytm_common_ui/icons";
import {
  emptyBrowseFilterState,
  getCategoryBrowseData,
  getProductTypeLabel,
  productMatchesFilters,
  type BrowseFilterState,
} from "../data/categoryBrowseData";
import { useAppScreenSelection } from "../AppScreenSelectionContext";
import { useSelectedCategoryBrowse } from "../SelectedCategoryContext";
import { EMI_PAYMENT_SCREEN_ID, HOME_PAGE_SCREEN_ID } from "../screens";
import { useSelectedEmiProduct } from "../SelectedEmiProductContext";
import { CategoryBrowseFilterBar } from "./CategoryBrowseFilterBar";
import { MobilePreviewFrame } from "./MobilePreviewFrame";
import s from "./loginScreens.module.scss";
import cb from "./categoryBrowse.module.scss";

export function CategoryBrowseScreen() {
  const goToScreen = useAppScreenSelection();
  const { selectedCategoryBrowse } = useSelectedCategoryBrowse();
  const { setSelectedEmiProduct } = useSelectedEmiProduct();

  const data = selectedCategoryBrowse
    ? getCategoryBrowseData(selectedCategoryBrowse.id)
    : null;

  const title = data?.categoryLabel ?? selectedCategoryBrowse?.label ?? "Category";
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<BrowseFilterState>(emptyBrowseFilterState);

  useEffect(() => {
    setQuery("");
    setFilters(emptyBrowseFilterState());
  }, [selectedCategoryBrowse?.id]);

  const onApplyFilters = useCallback((next: BrowseFilterState) => {
    setFilters(next);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!data?.products.length) return [];
    const q = query.trim().toLowerCase();
    return data.products.filter((p) => {
      const matchesQ = !q || p.title.toLowerCase().includes(q);
      return matchesQ && productMatchesFilters(p, filters);
    });
  }, [data, query, filters]);

  return (
    <MobilePreviewFrame>
      <div className={s.appCanvas}>
        <HeaderDefault
          size="medium"
          reserveSpaceForStatusBar
          showBack
          onBackClick={() => goToScreen?.(HOME_PAGE_SCREEN_ID)}
          title={title}
          subTitle="EMI offers"
          avatarProps={{
            type: "icon",
            avatarIcon: {
              Icon: <ShopIcon role="presentation" />,
              outline: false,
            },
          }}
        />
        <div className={s.scroll}>
          <div className={`${s.inner} ${s.innerAfterHeader}`}>
            <div className={cb.searchSticky}>
              <div className={cb.searchBlock}>
                <Search
                  label={data?.searchPlaceholder ?? "Search products"}
                  onChange={(value) => setQuery(value)}
                  onClear={() => setQuery("")}
                />
              </div>
            </div>

            {data ? (
              <>
                <CategoryBrowseFilterBar
                  brandOptions={data.brandOptions}
                  applied={filters}
                  onApply={onApplyFilters}
                />

                {filteredProducts.length === 0 ? (
                  <p className={cb.emptyState}>No products match your filters.</p>
                ) : (
                  <ul className={cb.productList} role="list">
                    {filteredProducts.map((p) => (
                      <li key={p.id} className={cb.productListItem}>
                        <Card
                          customClass={cb.productTile}
                          onClick={() => {
                            if (!data || !selectedCategoryBrowse) return;
                            setSelectedEmiProduct({
                              product: p,
                              categoryId: selectedCategoryBrowse.id,
                              categoryLabel: data.categoryLabel,
                            });
                            goToScreen?.(EMI_PAYMENT_SCREEN_ID);
                          }}
                        >
                          <div className={cb.productCardInner}>
                            <div className={cb.productImageWrap}>
                              <img
                                className={cb.productImage}
                                src={p.imageSrc}
                                alt={p.imageAlt}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                            <div className={cb.productCardBody}>
                              <p className={cb.productTitle}>{p.title}</p>
                              <p className={cb.productType}>{getProductTypeLabel(p.typeId)}</p>
                              <p className={cb.productPrice}>{p.price}</p>
                            </div>
                          </div>
                        </Card>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className={cb.emptyState}>
                Open a category from the store home to browse products.
              </p>
            )}
          </div>
        </div>
        <div className={s.homeIndicator} aria-hidden>
          <div className={s.homeIndicatorBar} />
        </div>
      </div>
    </MobilePreviewFrame>
  );
}
