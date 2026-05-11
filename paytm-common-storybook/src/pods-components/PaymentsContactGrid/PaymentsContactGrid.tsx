import React, { type CSSProperties, useMemo } from "react";

import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { ReactComponent as StarOnIcon } from "../../assets/ultra-icons/system/toggle/star_on.svg";
import Avatar from "../Avatar/Avatar";
import Card from "../Card/Card";
import type { InitialsColorType } from "../Avatar/Avatar.types";
import cx from "../../utils/classNames";

import s from "./PaymentsContactGrid.module.scss";

export type PaymentsContactGridProfileItem = {
  id: string;
  variant: "profile";
  label: string;
  imageURL: string;
  /** Optional; when set, cell is a focusable control. */
  onClick?: () => void;
};

export type PaymentsContactGridInitialsItem = {
  id: string;
  variant: "initials";
  label: string;
  initials: string;
  initialsColor: InitialsColorType;
  /** Bottom-trailing star (Figma: “Mumma”). */
  starBadge?: boolean;
  onClick?: () => void;
};

export type PaymentsContactGridViewAllItem = {
  id: string;
  variant: "viewAll";
  label: string;
  onClick?: () => void;
  /** Defaults to a screen-reader-friendly “view all” phrase when omitted. */
  ariaLabel?: string;
};

export type PaymentsContactGridItem =
  | PaymentsContactGridProfileItem
  | PaymentsContactGridInitialsItem
  | PaymentsContactGridViewAllItem;

export interface PaymentsContactGridProps {
  items: PaymentsContactGridItem[];
  /** How many cells per row (Figma reference uses 4). */
  columnsPerRow?: number;
  className?: string;
  cardClassName?: string;
}

const defaultViewAllAriaLabel = "View all contacts";

const PaymentsContactGrid: React.FC<PaymentsContactGridProps> = ({
  items,
  columnsPerRow = 4,
  className,
  cardClassName,
}) => {
  const gridStyle = useMemo(
    () =>
      ({
        gridTemplateColumns: `repeat(${Math.max(1, columnsPerRow)}, 1fr)`,
      }) as CSSProperties,
    [columnsPerRow],
  );

  const renderAvatar = (item: PaymentsContactGridItem) => {
    if (item.variant === "profile") {
      return (
        <Avatar
          type="profile"
          size="large"
          avatarProfile={{ imageURL: item.imageURL }}
        />
      );
    }
    if (item.variant === "initials") {
      return (
        <Avatar
          type="initials"
          size="large"
          iconType={item.starBadge ? "action" : undefined}
          Icon={item.starBadge ? <StarOnIcon aria-hidden /> : undefined}
          avatarInitials={{
            initials: item.initials,
            initialsColor: item.initialsColor,
          }}
          customClass={s.initialsAvatar}
        />
      );
    }
    return (
      <Avatar
        type="icon"
        size="large"
        avatarIcon={{
          Icon: <ChevronRightIcon aria-hidden />,
        }}
      />
    );
  };

  const cellInner = (item: PaymentsContactGridItem) => (
    <>
      <div className={s.avatarWrap}>{renderAvatar(item)}</div>
      <span className={s.label}>{item.label}</span>
    </>
  );

  const renderCell = (item: PaymentsContactGridItem) => {
    const interactive = item.onClick != null;
    const testId = `payments-contact-grid-item-${item.id}`;

    const ariaLabel =
      item.variant === "viewAll" && interactive
        ? item.ariaLabel ?? defaultViewAllAriaLabel
        : interactive
          ? item.label
          : undefined;

    if (item.variant === "viewAll") {
      if (item.onClick) {
        return (
          <button
            key={item.id}
            type="button"
            className={s.cell}
            data-testid={testId}
            role="listitem"
            aria-label={ariaLabel}
            onClick={item.onClick}
          >
            {cellInner(item)}
          </button>
        );
      }
      return (
        <div
          key={item.id}
          className={s.cell}
          data-testid={testId}
          role="listitem"
        >
          {cellInner(item)}
        </div>
      );
    }

    if (interactive) {
      return (
        <button
          key={item.id}
          type="button"
          className={s.cell}
          data-testid={testId}
          role="listitem"
          aria-label={ariaLabel}
          onClick={() => item.onClick?.()}
        >
          {cellInner(item)}
        </button>
      );
    }

    return (
      <div
        key={item.id}
        className={s.cell}
        data-testid={testId}
        role="listitem"
      >
        {cellInner(item)}
      </div>
    );
  };

  return (
    <div
      className={cx(s.root, className)}
      data-testid="payments-contact-grid"
    >
      <Card customClass={cx(s.card, cardClassName)}>
        <div
          className={s.inner}
          role="list"
          aria-label="Contacts"
          style={gridStyle}
        >
          {items.map((item) => renderCell(item))}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(PaymentsContactGrid);
