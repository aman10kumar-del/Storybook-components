import React from "react";

import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import Avatar from "../Avatar/Avatar";
import Card from "../Card/Card";

import type {
  PassbookMonthCardAvatar,
  PassbookMonthCardProps,
  PassbookMonthCardRow,
} from "./PassbookMonthCard.types";
import s from "./PassbookMonthCard.module.scss";

const defaultHeaderAriaLabel = "Open month details";

const renderAvatar = (avatar: PassbookMonthCardAvatar) => {
  if (avatar.variant === "initials") {
    return (
      <Avatar
        type="initials"
        size="regular"
        avatarInitials={{
          initials: avatar.initials,
          initialsColor: avatar.initialsColor ?? "sprout",
        }}
      />
    );
  }
  return (
    <Avatar
      type="profile"
      size="regular"
      avatarProfile={{ imageURL: avatar.imageSrc }}
    />
  );
};

const PassbookMonthRow: React.FC<{
  row: PassbookMonthCardRow;
  showDivider: boolean;
}> = ({ row, showDivider }) => {
  const sourceLabel = row.sourceLabel ?? "From";
  return (
    <li
      className={s.row}
      data-testid={`passbook-month-card-row-${row.id}`}
    >
      <div className={s.rowInner}>
        <div className={s.leading}>{renderAvatar(row.avatar)}</div>
        <div className={s.main}>
          <div className={s.texts}>
            <p className={s.name}>{row.name}</p>
            <p className={s.subtitle}>{row.subtitle}</p>
          </div>
          <div className={s.trailing}>
            <p
              className={cx(s.amount, {
                [s.credit]: row.amountTone === "credit",
              })}
            >
              {row.amountLabel}
            </p>
            <div className={s.source}>
              <span className={s.sourceLabel}>{sourceLabel}</span>
              <img
                className={s.bankLogo}
                src={row.sourceBankLogoSrc}
                alt={row.sourceBankLogoAlt ?? ""}
              />
            </div>
          </div>
          {showDivider ? (
            <div className={s.rowDivider} aria-hidden />
          ) : null}
        </div>
      </div>
    </li>
  );
};

const PassbookMonthCard: React.FC<PassbookMonthCardProps> = ({
  monthTitle,
  totalAmountLabel,
  rows,
  onHeaderClick,
  headerAriaLabel = defaultHeaderAriaLabel,
  className,
  cardClassName,
}) => {
  const headerContent = (
    <>
      <span className={s.monthTitle}>{monthTitle}</span>
      <span className={s.headerTrailing}>
        <span className={s.totalAmount}>{totalAmountLabel}</span>
        <span className={s.chevron} aria-hidden>
          <ChevronRightIcon aria-hidden />
        </span>
      </span>
    </>
  );

  return (
    <div
      className={cx(s.root, className)}
      data-testid="passbook-month-card"
    >
      <Card customClass={cx(s.card, cardClassName)}>
        {onHeaderClick ? (
          <button
            type="button"
            className={cx(s.header, s.interactive)}
            data-testid="passbook-month-card-header"
            aria-label={headerAriaLabel}
            onClick={() => triggerCallback(onHeaderClick)}
          >
            {headerContent}
          </button>
        ) : (
          <div
            className={s.header}
            data-testid="passbook-month-card-header"
          >
            {headerContent}
          </div>
        )}
        <ul className={s.list}>
          {rows.map((row, index) => (
            <PassbookMonthRow
              key={row.id}
              row={row}
              showDivider={index < rows.length - 1}
            />
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default React.memo(PassbookMonthCard);
