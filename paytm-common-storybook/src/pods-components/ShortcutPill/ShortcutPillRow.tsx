import React, { Children, isValidElement } from "react";

import cx from "../../utils/classNames";
import type { ShortcutPillRowProps } from "./ShortcutPill.types";
import s from "./ShortcutPillRow.module.scss";

const ShortcutPillRow: React.FC<ShortcutPillRowProps> = ({
  children,
  customClass = "",
  contentInset = true,
}) => (
  <ul
    data-testid="shortcut-pill-row"
    className={cx(s.scroller, { [s.inset]: contentInset }, customClass)}
    role="list"
  >
    {Children.map(children, (child, index) => {
      if (child == null || !isValidElement(child)) {
        return null;
      }
      return (
        <li key={child.key ?? index} className={s.item}>
          {child}
        </li>
      );
    })}
  </ul>
);

export default React.memo(ShortcutPillRow);
