import React from "react";

import Button from "../Button/Button";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import type { PassbookAccountTileProps } from "./PassbookTile.types";
import s from "./PassbookTile.module.scss";

const PassbookAccountTile: React.FC<PassbookAccountTileProps> = ({
  title,
  subtitle,
  leading,
  ctaLabel = "Check Balance",
  balanceText,
  actionState = "cta",
  onCtaClick,
  customClass = "",
  "aria-label": ariaLabel,
}) => {
  const renderAction = () => {
    if (actionState === "loading") {
      return (
        <div className={s.actionSlot} aria-busy="true" aria-live="polite">
          <Button
            type="tonal"
            size="small"
            label={ctaLabel}
            loading
            customClass={s.ctaButtonStretch}
          />
        </div>
      );
    }
    if (actionState === "balance") {
      return (
        <div className={s.balanceSlot}>
          {balanceText ?? "—"}
        </div>
      );
    }
    return (
      <button
        type="button"
        className={s.cta}
        onClick={() => triggerCallback(onCtaClick)}
      >
        {ctaLabel}
      </button>
    );
  };

  return (
    <div
      className={cx(s.accountRoot, customClass)}
      data-testid="passbook-account-tile"
      role="group"
      aria-label={ariaLabel ?? `${title}. ${subtitle}`}
    >
      <div className={s.accountHeader}>
        <span className={s.leadingSlot}>{leading}</span>
        <p className={s.title}>{title}</p>
      </div>
      <p className={s.subtitle}>{subtitle}</p>
      {renderAction()}
    </div>
  );
};

export default React.memo(PassbookAccountTile);
