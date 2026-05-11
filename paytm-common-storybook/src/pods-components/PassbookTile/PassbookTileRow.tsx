import React from "react";

import cx from "../../utils/classNames";
import type { PassbookTileRowProps } from "./PassbookTile.types";
import s from "./PassbookTile.module.scss";

export const PassbookTileRow: React.FC<PassbookTileRowProps> = ({
  children,
  customClass = "",
}) => (
  <div className={cx(s.tileRow, customClass)} data-testid="passbook-tile-row">
    {children}
  </div>
);
