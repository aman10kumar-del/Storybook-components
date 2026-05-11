import React from "react";

import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { ReactComponent as StarOnIcon } from "../../assets/ultra-icons/system/toggle/star_on.svg";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import Avatar from "../Avatar/Avatar";
import type { InitialsColorType } from "../Avatar/Avatar.types";
import Button from "../Button/Button";
import Card from "../Card/Card";

import s from "./RecentPaymentsCard.module.scss";

export type RecentPaymentsAvatar =
  | {
      variant: "profile";
      imageURL: string;
      starBadge?: boolean;
    }
  | {
      variant: "initials";
      initials: string;
      initialsColor: InitialsColorType;
      starBadge?: boolean;
    };

export type RecentPaymentsItem = {
  id: string;
  title: string;
  subtitle: string;
  avatar: RecentPaymentsAvatar;
  /** e.g. "Business" — chip under the avatar */
  captionUnderAvatar?: string;
};

export interface RecentPaymentsCardProps {
  items: RecentPaymentsItem[];
  /** Default "Pay" */
  payLabel?: string;
  onPayClick?: (id: string) => void;
  /** Default "View All" */
  viewAllLabel?: string;
  onViewAllClick?: () => void;
  className?: string;
  cardClassName?: string;
}

const defaultPayLabel = "Pay";
const defaultViewAll = "View All";

const RecentPaymentsCard: React.FC<RecentPaymentsCardProps> = ({
  items,
  payLabel = defaultPayLabel,
  onPayClick,
  viewAllLabel = defaultViewAll,
  onViewAllClick,
  className,
  cardClassName,
}) => {
  const renderAvatar = (item: RecentPaymentsItem) => {
    const { avatar } = item;
    const star = avatar.starBadge ? (
      <StarOnIcon aria-hidden />
    ) : undefined;
    if (avatar.variant === "profile") {
      return (
        <Avatar
          type="profile"
          size="regular"
          iconType={avatar.starBadge ? "action" : undefined}
          Icon={star}
          avatarProfile={{ imageURL: avatar.imageURL }}
        />
      );
    }
    return (
      <Avatar
        type="initials"
        size="regular"
        iconType={avatar.starBadge ? "action" : undefined}
        Icon={star}
        avatarInitials={{
          initials: avatar.initials,
          initialsColor: avatar.initialsColor,
        }}
      />
    );
  };

  return (
    <div
      className={cx(s.root, className)}
      data-testid="recent-payments-card"
    >
      <Card customClass={cx(s.card, cardClassName)}>
        <div className={s.list} role="list">
          {items.map((item) => (
            <div
              key={item.id}
              className={cx(s.row, item.captionUnderAvatar && s.rowWithCaption)}
              role="listitem"
              data-testid={`recent-payments-row-${item.id}`}
            >
              <div className={s.leading}>
                <div className={s.leadingStack}>
                  <div className={s.avatarWrap}>{renderAvatar(item)}</div>
                  {item.captionUnderAvatar ? (
                    <span className={s.avatarCaption}>{item.captionUnderAvatar}</span>
                  ) : null}
                </div>
              </div>
              <div className={s.body}>
                <div className={s.texts}>
                  <p className={s.title}>{item.title}</p>
                  <p className={s.subtitle}>{item.subtitle}</p>
                </div>
                <div className={s.payWrap}>
                  <Button
                    type="tonal"
                    size="small"
                    customClass={s.payButton}
                    label={payLabel}
                    ariaLabel={`${payLabel} ${item.title}`}
                    onClick={() => triggerCallback(() => onPayClick?.(item.id))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {onViewAllClick ? (
          <div className={s.footer}>
            <button
              type="button"
              className={s.viewAllButton}
              data-testid="recent-payments-view-all"
              onClick={() => triggerCallback(onViewAllClick)}
            >
              <span className={s.viewAllLabel}>{viewAllLabel}</span>
              <ChevronRightIcon className={s.viewAllChevron} aria-hidden />
            </button>
          </div>
        ) : (
          <div className={s.footer}>
            <div className={s.viewAllStatic} data-testid="recent-payments-view-all-static">
              <span className={s.viewAllLabel}>{viewAllLabel}</span>
              <ChevronRightIcon className={s.viewAllChevron} aria-hidden />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default React.memo(RecentPaymentsCard);
