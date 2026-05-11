import React from "react";

import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import type { PassbookGraphicTileProps } from "./PassbookTile.types";
import s from "./PassbookTile.module.scss";

const PassbookGraphicTile: React.FC<PassbookGraphicTileProps> = ({
  label,
  leading,
  footer,
  onClick,
  customClass = "",
  "aria-label": ariaLabel,
}) => {
  const lines = label.split("\n");

  const body = (
    <>
      <div className={s.graphicMain}>
        {leading ? <div className={s.graphicLeading}>{leading}</div> : null}
        <div className={s.graphicLabel}>
          {lines.map((line, i) => (
            <p key={i} className={s.graphicLabelLine}>
              {line}
            </p>
          ))}
        </div>
      </div>
      {footer ? <div className={s.graphicFooter}>{footer}</div> : null}
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={cx(s.graphicRoot, customClass)}
        data-testid="passbook-graphic-tile"
        aria-label={ariaLabel ?? lines.join(" ")}
        onClick={() => triggerCallback(onClick)}
      >
        {body}
      </button>
    );
  }

  return (
    <div
      className={cx(s.graphicRoot, customClass)}
      data-testid="passbook-graphic-tile"
      role="group"
      aria-label={ariaLabel ?? lines.join(" ")}
    >
      {body}
    </div>
  );
};

export default React.memo(PassbookGraphicTile);
