import React from "react";

import Avatar from "../Avatar/Avatar";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import type { IconGridProps } from "./IconGrid.types";
import s from "./IconGrid.module.scss";

function flattenLabel(label: string): string {
  return label.replace(/\n/g, " ").trim();
}

const IconGrid: React.FC<IconGridProps> = ({
  items,
  columnsPerRow = 4,
  placement = "default",
  style,
  customClass = "",
}) => (
  <ul
    data-testid="icon-grid"
    data-placement={placement}
    className={cx(
      s.root,
      placement === "inCard"
        ? s.placementInCard
        : placement === "contentColumn"
          ? cx(s.placementDefault, s.placementContentColumn)
          : s.placementDefault,
      customClass,
    )}
    style={
      {
        ...style,
        "--icon-grid-cols": columnsPerRow,
      } as React.CSSProperties
    }
    role="list"
  >
    {items.map(
      ({
        id,
        label,
        icon,
        badgeIcon,
        badgeIconType = "action",
        onClick,
        disabled = false,
      }) => {
        const lines = label.split("\n");
        const aria = flattenLabel(label);

        const body = (
          <>
            <span className={s.avatarHost}>
              <Avatar
                type="icon"
                size="regular"
                Icon={
                  badgeIcon ? (
                    <span className={s.badgeIconStandard}>{badgeIcon}</span>
                  ) : undefined
                }
                iconType={badgeIconType}
                avatarIcon={{
                  Icon: <span className={s.iconStandard}>{icon}</span>,
                  outline: true,
                }}
              />
            </span>
            <span className={s.label}>
              {lines.map((line, i) => (
                <p key={i} className={s.labelLine}>
                  {line}
                </p>
              ))}
            </span>
          </>
        );

        return (
          <li key={id} className={s.item}>
            {onClick ? (
              <button
                type="button"
                className={cx(s.cell, s.cellButton)}
                data-testid={`icon-grid-item-${id}`}
                aria-label={aria}
                disabled={disabled}
                onClick={() => triggerCallback(onClick)}
              >
                {body}
              </button>
            ) : (
              <div
                className={s.cell}
                data-testid={`icon-grid-item-${id}`}
                role="group"
                aria-label={aria}
              >
                {body}
              </div>
            )}
          </li>
        );
      },
    )}
  </ul>
);

export default React.memo(IconGrid);
