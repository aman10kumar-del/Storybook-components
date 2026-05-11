import React from "react";

import { ReactComponent as MenuOverflowIcon } from "../../assets/ultra-icons/system/nav/menu_overflow.svg";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import Avatar from "../Avatar/Avatar";
import Card from "../Card/Card";

import s from "./RecentRechargeCard.module.scss";

export interface RecentRechargeCardProps {
  /** Operator mark (e.g. PNG @3x or SVG from design export). */
  operatorLogoSrc: string;
  operatorLogoAlt?: string;
  displayName: string;
  mobileNumber: string;
  /** e.g. "Last recharged ₹2,000 on 23 Sep" */
  lastRechargeSummary: string;
  onMenuClick?: () => void;
  menuAriaLabel?: string;
  className?: string;
  cardClassName?: string;
}

const defaultMenuLabel = "More actions";

const RecentRechargeCard: React.FC<RecentRechargeCardProps> = ({
  operatorLogoSrc,
  operatorLogoAlt = "Mobile operator",
  displayName,
  mobileNumber,
  lastRechargeSummary,
  onMenuClick,
  menuAriaLabel = defaultMenuLabel,
  className,
  cardClassName,
}) => (
  <div
    className={cx(s.root, className)}
    data-testid="recent-recharge-card"
  >
    <Card customClass={cx(s.card, cardClassName)}>
      <div className={s.row}>
        <div className={s.leading}>
          <Avatar
            type="logo"
            size="regular"
            avatarLogo={{ image: operatorLogoSrc, alt: operatorLogoAlt }}
          />
        </div>
        <div className={s.body}>
          <div className={s.texts}>
            <p className={s.primary}>{displayName}</p>
            <p className={s.secondary}>{mobileNumber}</p>
            <p className={s.tertiary}>{lastRechargeSummary}</p>
          </div>
          <div className={s.menuWrap}>
            {onMenuClick ? (
              <button
                type="button"
                className={s.menuButton}
                data-testid="recent-recharge-card-menu"
                aria-label={menuAriaLabel}
                onClick={() => triggerCallback(onMenuClick)}
              >
                <MenuOverflowIcon aria-hidden />
              </button>
            ) : (
              <span
                className={s.menuButton}
                data-testid="recent-recharge-card-menu-static"
                aria-hidden
              >
                <MenuOverflowIcon aria-hidden />
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default React.memo(RecentRechargeCard);
