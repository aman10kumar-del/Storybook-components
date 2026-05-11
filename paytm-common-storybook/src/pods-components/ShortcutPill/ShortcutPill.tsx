import React from "react";

import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import type { ShortcutPillProps } from "./ShortcutPill.types";
import s from "./ShortcutPill.module.scss";

const ShortcutPill: React.FC<ShortcutPillProps> = ({
  title,
  subtitle,
  graphic,
  variant = "brand",
  wellSize = "lg",
  textDensity = "default",
  onClick,
  disabled = false,
  customClass = "",
  ariaLabel,
}) => {
  const label = ariaLabel ?? `${title}. ${subtitle}`;

  return (
    <button
      type="button"
      data-testid="shortcut-pill"
      className={cx(
        s.pill,
        variant === "graphic" ? s.pillGraphic : s.pillBrand,
        customClass,
      )}
      disabled={disabled}
      aria-label={label}
      onClick={() => triggerCallback(onClick)}
    >
      <span
        className={cx(s.iconWell, wellSize === "md" ? s.wellMd : s.wellLg)}
        aria-hidden
      >
        <span className={s.graphicInner}>
          <span
            className={
              variant === "graphic" ? s.graphicVariantInner : s.brandGraphicInner
            }
          >
            {graphic}
          </span>
        </span>
      </span>
      <span className={s.textStack}>
        <span
          className={
            textDensity === "compact" ? s.titleCompact : s.titleDefault
          }
          data-testid="shortcut-pill-title"
        >
          {title}
        </span>
        <span
          className={
            textDensity === "compact"
              ? s.subtitleCompact
              : s.subtitleDefault
          }
          data-testid="shortcut-pill-subtitle"
        >
          {subtitle}
        </span>
      </span>
    </button>
  );
};

export default React.memo(ShortcutPill);
