import React from "react";

import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import type { FABFloatingExtendedMiniProps } from "./FABFloatingExtendedMini.types";
import s from "./FABFloatingExtendedMini.module.scss";

const FABFloatingExtendedMini: React.FC<FABFloatingExtendedMiniProps> = ({
  items,
  onItemClick,
  customClass = "",
  navAriaLabel = "Quick actions",
  docked = true,
}) => {
  return (
    <nav
      aria-label={navAriaLabel}
      data-testid="fab-floating-extended-mini"
      className={cx(docked && s.dock)}
    >
      <div
        className={cx(s.pill, customClass)}
        data-testid="fab-floating-extended-mini-pill"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            data-testid={`fab-floating-extended-mini-item-${item.id}`}
            className={s.item}
            aria-label={item.ariaLabel}
            onClick={() => triggerCallback(onItemClick, item.id)}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default React.memo(FABFloatingExtendedMini);
