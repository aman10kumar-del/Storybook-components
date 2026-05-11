import { useCallback, useState } from "react";
import {
  BottomSheet,
  Button,
  Checkbox,
  Chips,
  SectionHeader,
} from "@paytm-h5-common/paytm_common_ui";
import {
  FlashOnIcon,
  OffersThemedIcon,
  ShopIcon,
  StarOnIcon,
} from "@paytm-h5-common/paytm_common_ui/icons";
import type { BrandOption } from "../data/categoryBrowseData";
import {
  ALL,
  cloneBrowseFilterState,
  HIGHEST_RATED_FILTER_OPTIONS,
  NEW_LAUNCH_FILTER_OPTIONS,
  type BrowseFilterState,
  TOP_SELLING_FILTER_OPTIONS,
} from "../data/categoryBrowseData";
import { MOBILE_PREVIEW_SHEET_PORTAL_ID } from "./MobilePreviewFrame";
import cb from "./categoryBrowse.module.scss";

type SheetId = "brands" | "topSelling" | "highestRated" | "newLaunch" | null;

function toggleInSet(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

type Props = {
  brandOptions: BrandOption[];
  applied: BrowseFilterState;
  onApply: (next: BrowseFilterState) => void;
};

export function CategoryBrowseFilterBar({ brandOptions, applied, onApply }: Props) {
  const [sheet, setSheet] = useState<SheetId>(null);
  const [draftBrands, setDraftBrands] = useState<Set<string>>(new Set());
  const [draftTop, setDraftTop] = useState<Set<string>>(new Set());
  const [draftRated, setDraftRated] = useState<Set<string>>(new Set());
  const [draftNew, setDraftNew] = useState<Set<string>>(new Set());

  const brandsSelectable = brandOptions.filter((b) => b.id !== ALL);

  const openSheet = useCallback(
    (id: Exclude<SheetId, null>) => {
      setSheet(id);
      if (id === "brands") setDraftBrands(new Set(applied.brandIds));
      if (id === "topSelling") setDraftTop(new Set(applied.topSellingIds));
      if (id === "highestRated") setDraftRated(new Set(applied.highestRatedIds));
      if (id === "newLaunch") setDraftNew(new Set(applied.newLaunchIds));
    },
    [applied],
  );

  const closeSheet = useCallback(() => setSheet(null), []);

  const applyBrands = useCallback(() => {
    const next = cloneBrowseFilterState(applied);
    next.brandIds = new Set(draftBrands);
    onApply(next);
    closeSheet();
  }, [applied, draftBrands, onApply, closeSheet]);

  const applyTop = useCallback(() => {
    const next = cloneBrowseFilterState(applied);
    next.topSellingIds = new Set(draftTop);
    onApply(next);
    closeSheet();
  }, [applied, draftTop, onApply, closeSheet]);

  const applyRated = useCallback(() => {
    const next = cloneBrowseFilterState(applied);
    next.highestRatedIds = new Set(draftRated);
    onApply(next);
    closeSheet();
  }, [applied, draftRated, onApply, closeSheet]);

  const applyNew = useCallback(() => {
    const next = cloneBrowseFilterState(applied);
    next.newLaunchIds = new Set(draftNew);
    onApply(next);
    closeSheet();
  }, [applied, draftNew, onApply, closeSheet]);

  const chipLabel = (prefix: string, count: number) =>
    count > 0 ? `${prefix} (${count})` : prefix;

  return (
    <>
      <div className={cb.filterSection}>
        <SectionHeader
          title="Filters"
          size="large"
          customClass={cb.storeSectionHeader}
        />
        <div className={cb.filterChipRow} role="group" aria-label="Product filters">
          <Chips
            type="normal"
            size="regular"
            label={chipLabel("Brands", applied.brandIds.size)}
            selected={applied.brandIds.size > 0}
            LeadingIcon={<ShopIcon aria-hidden />}
            onClick={() => openSheet("brands")}
          />
          <Chips
            type="normal"
            size="regular"
            label={chipLabel("Top selling", applied.topSellingIds.size)}
            selected={applied.topSellingIds.size > 0}
            LeadingIcon={<OffersThemedIcon aria-hidden />}
            onClick={() => openSheet("topSelling")}
          />
          <Chips
            type="normal"
            size="regular"
            label={chipLabel("Highest rated", applied.highestRatedIds.size)}
            selected={applied.highestRatedIds.size > 0}
            LeadingIcon={<StarOnIcon aria-hidden />}
            onClick={() => openSheet("highestRated")}
          />
          <Chips
            type="normal"
            size="regular"
            label={chipLabel("New launch", applied.newLaunchIds.size)}
            selected={applied.newLaunchIds.size > 0}
            LeadingIcon={<FlashOnIcon aria-hidden />}
            onClick={() => openSheet("newLaunch")}
          />
        </div>
      </div>

      <BottomSheet
        active={sheet === "brands"}
        triggerClose={closeSheet}
        attachToElementID={MOBILE_PREVIEW_SHEET_PORTAL_ID}
        title="Brands"
        primaryButton={{
          label: "Apply",
          onClick: applyBrands,
        }}
        customClass={cb.filterBottomSheet}
      >
        <div className={cb.sheetBody}>
          <div className={cb.sheetToolbar}>
            <Button
              type="link"
              size="small"
              label="Clear all"
              customClass={cb.sheetClearLink}
              onClick={() => setDraftBrands(new Set())}
            />
          </div>
          <div className={cb.sheetCheckboxList}>
            {brandsSelectable.map((b) => (
              <Checkbox
                key={b.id}
                id={`browse-brand-${b.id}`}
                label={b.label}
                checked={draftBrands.has(b.id) ? "true" : "false"}
                onChange={() => setDraftBrands((s) => toggleInSet(s, b.id))}
              />
            ))}
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        active={sheet === "topSelling"}
        triggerClose={closeSheet}
        attachToElementID={MOBILE_PREVIEW_SHEET_PORTAL_ID}
        title="Top selling"
        primaryButton={{
          label: "Apply",
          onClick: applyTop,
        }}
        customClass={cb.filterBottomSheet}
      >
        <div className={cb.sheetBody}>
          <div className={cb.sheetToolbar}>
            <Button
              type="link"
              size="small"
              label="Clear all"
              customClass={cb.sheetClearLink}
              onClick={() => setDraftTop(new Set())}
            />
          </div>
          <div className={cb.sheetCheckboxList}>
            {TOP_SELLING_FILTER_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.id}
                id={`browse-top-${opt.id}`}
                label={opt.label}
                checked={draftTop.has(opt.id) ? "true" : "false"}
                onChange={() => setDraftTop((s) => toggleInSet(s, opt.id))}
              />
            ))}
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        active={sheet === "highestRated"}
        triggerClose={closeSheet}
        attachToElementID={MOBILE_PREVIEW_SHEET_PORTAL_ID}
        title="Highest rated"
        primaryButton={{
          label: "Apply",
          onClick: applyRated,
        }}
        customClass={cb.filterBottomSheet}
      >
        <div className={cb.sheetBody}>
          <div className={cb.sheetToolbar}>
            <Button
              type="link"
              size="small"
              label="Clear all"
              customClass={cb.sheetClearLink}
              onClick={() => setDraftRated(new Set())}
            />
          </div>
          <div className={cb.sheetCheckboxList}>
            {HIGHEST_RATED_FILTER_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.id}
                id={`browse-rated-${opt.id}`}
                label={opt.label}
                checked={draftRated.has(opt.id) ? "true" : "false"}
                onChange={() => setDraftRated((s) => toggleInSet(s, opt.id))}
              />
            ))}
          </div>
        </div>
      </BottomSheet>

      <BottomSheet
        active={sheet === "newLaunch"}
        triggerClose={closeSheet}
        attachToElementID={MOBILE_PREVIEW_SHEET_PORTAL_ID}
        title="New launch"
        primaryButton={{
          label: "Apply",
          onClick: applyNew,
        }}
        customClass={cb.filterBottomSheet}
      >
        <div className={cb.sheetBody}>
          <div className={cb.sheetToolbar}>
            <Button
              type="link"
              size="small"
              label="Clear all"
              customClass={cb.sheetClearLink}
              onClick={() => setDraftNew(new Set())}
            />
          </div>
          <div className={cb.sheetCheckboxList}>
            {NEW_LAUNCH_FILTER_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.id}
                id={`browse-new-${opt.id}`}
                label={opt.label}
                checked={draftNew.has(opt.id) ? "true" : "false"}
                onChange={() => setDraftNew((s) => toggleInSet(s, opt.id))}
              />
            ))}
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
