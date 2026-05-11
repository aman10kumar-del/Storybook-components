import React from "react";

import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import Avatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import Card from "../Card/Card";

import s from "./CurrentPlanCard.module.scss";

export type CurrentPlanDataPackChip = {
  id: string;
  /** Bold rupee segment, e.g. "₹22" */
  price: string;
  /** Regular remainder, e.g. "1 GB · 1 Day" */
  detail: string;
};

export interface CurrentPlanCardProps {
  operatorLogoSrc: string;
  operatorLogoAlt?: string;
  displayName: string;
  mobileNumber: string;
  onChangeClick?: () => void;
  changeLabel?: string;

  currentPlanHeading?: string;
  planPrice: string;
  rechargeLabel?: string;
  onRechargeClick?: () => void;

  planDescription: string;
  planDetailsLabel?: string;
  onPlanDetailsClick?: () => void;

  planExpiryText: string;

  showDataPackSection?: boolean;
  dataPackTitle?: string;
  dataPackBadgeLabel?: string;
  dataPackChips?: CurrentPlanDataPackChip[];

  className?: string;
  cardClassName?: string;
}

const CurrentPlanCard: React.FC<CurrentPlanCardProps> = ({
  operatorLogoSrc,
  operatorLogoAlt = "Mobile operator",
  displayName,
  mobileNumber,
  onChangeClick,
  changeLabel = "Change",
  currentPlanHeading = "Current Plan:",
  planPrice,
  rechargeLabel = "Recharge",
  onRechargeClick,
  planDescription,
  planDetailsLabel = "Plan Details",
  onPlanDetailsClick,
  planExpiryText,
  showDataPackSection = true,
  dataPackTitle = "Add Data Pack",
  dataPackBadgeLabel,
  dataPackChips = [],
  className,
  cardClassName,
}) => {
  const chips = dataPackChips ?? [];
  const showTray =
    showDataPackSection &&
    (Boolean(dataPackTitle) ||
      Boolean(dataPackBadgeLabel) ||
      chips.length > 0);

  return (
    <div
      className={cx(s.root, className)}
      data-testid="current-plan-card"
    >
      <Card customClass={cx(s.card, cardClassName)}>
        <div className={s.column}>
          <div className={s.topBlock}>
            <div className={s.headerRow}>
              <div className={s.headerLeading}>
                <Avatar
                  type="logo"
                  size="regular"
                  avatarLogo={{ image: operatorLogoSrc, alt: operatorLogoAlt }}
                />
              </div>
              <div className={s.headerMain}>
                <div className={s.headerTexts}>
                  <p className={s.headerName}>{displayName}</p>
                  <p className={s.headerPhone}>{mobileNumber}</p>
                </div>
                <div className={s.changeWrap}>
                  <Button
                    type="link"
                    size="small"
                    label={changeLabel}
                    customClass={s.changeBtn}
                    disabled={!onChangeClick}
                    onClick={() => triggerCallback(onChangeClick)}
                  />
                </div>
              </div>
            </div>

            <section
              className={s.planSection}
              aria-label="Current plan"
            >
              <div className={s.planTopRow}>
                <div className={s.planLabelStack}>
                  <p className={s.currentPlanLabel}>{currentPlanHeading}</p>
                  <p className={s.planPrice}>{planPrice}</p>
                </div>
                <div className={s.rechargeWrap}>
                  <Button
                    type="filled"
                    size="medium"
                    label={rechargeLabel}
                    disabled={!onRechargeClick}
                    onClick={() => triggerCallback(onRechargeClick)}
                  />
                </div>
              </div>
              <div className={s.planMeta}>
                <div className={s.planDesc}>
                  <span className={s.planDescText}>{planDescription}</span>
                  {onPlanDetailsClick ? (
                    <>
                      {" "}
                      <Button
                        type="link"
                        size="small"
                        label={planDetailsLabel}
                        customClass={s.planDetailsBtn}
                        onClick={() => triggerCallback(onPlanDetailsClick)}
                      />
                    </>
                  ) : null}
                </div>
                <p className={s.planExpiry}>{planExpiryText}</p>
              </div>
            </section>
          </div>

          {showTray && (
            <section
              className={s.dataPackSection}
              aria-label={dataPackTitle}
            >
              <div className={s.dataPackHead}>
                {dataPackTitle ? (
                  <p className={s.dataPackTitle}>{dataPackTitle}</p>
                ) : null}
                {dataPackBadgeLabel ? (
                  <div className={s.badgeWrap}>
                    <Badge
                      context="notice"
                      muted
                      label={dataPackBadgeLabel}
                    />
                  </div>
                ) : null}
              </div>
              {chips.length > 0 ? (
                <div
                  className={s.chipRow}
                  data-testid="current-plan-data-pack-chips"
                >
                  {chips.map((chip) => (
                    <div
                      key={chip.id}
                      className={s.chip}
                      data-testid={`current-plan-chip-${chip.id}`}
                    >
                      <span className={s.chipPrice}>{chip.price}</span>
                      <span className={s.chipMid} aria-hidden>
                        ·
                      </span>
                      <span className={s.chipDetail}>{chip.detail}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </section>
          )}
        </div>
      </Card>
    </div>
  );
};

export default React.memo(CurrentPlanCard);
