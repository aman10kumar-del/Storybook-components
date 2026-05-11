import React from "react";

import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import Badge from "../Badge/Badge";
import Card from "../Card/Card";

import s from "./PlanDetailsListingCard.module.scss";

export interface PlanDetailsListingCardProps {
  /** e.g. "Free Unlimited 5G" — omitted when empty. */
  badgeLabel?: string;
  headlinePrice: string;
  priceSubtitle: string;
  validityLabel?: string;
  /** Supports `\n` for line breaks. */
  validityValue: string;
  dataLabel?: string;
  dataValue: string;
  planDetailsLabel?: string;
  onPlanDetailsClick?: () => void;
  /** When set, the spec row + chevron act as one control. */
  onSpecRowClick?: () => void;
  showChevron?: boolean;
  /** Typically four 24×24 marks in circular slots. */
  footerIcons?: React.ReactNode[];
  className?: string;
  cardClassName?: string;
}

const PlanDetailsListingCard: React.FC<PlanDetailsListingCardProps> = ({
  badgeLabel,
  headlinePrice,
  priceSubtitle,
  validityLabel = "Validity",
  validityValue,
  dataLabel = "Data",
  dataValue,
  planDetailsLabel = "Plan Details",
  onPlanDetailsClick,
  onSpecRowClick,
  showChevron = true,
  footerIcons,
  className,
  cardClassName,
}) => {
  const icons = footerIcons?.filter(Boolean) ?? [];
  const rowInteractive = Boolean(onSpecRowClick);

  const specCluster = (
    <div className={s.specsCluster}>
      <div className={s.specPair}>
        <p className={s.specLabel}>{validityLabel}</p>
        <p className={s.specValue}>{validityValue}</p>
      </div>
      <div className={cx(s.specPair, s.specPairWide)}>
        <p className={s.specLabel}>{dataLabel}</p>
        <p className={s.specValue}>{dataValue}</p>
      </div>
    </div>
  );

  return (
    <div
      className={cx(s.root, className)}
      data-testid="plan-details-listing-card"
    >
      <Card customClass={cx(s.card, cardClassName)}>
        {badgeLabel ? (
          <div className={s.badgeWrap}>
            <Badge context="positive" muted label={badgeLabel} />
          </div>
        ) : null}
        <div className={s.mainRow}>
          <div className={s.priceCol}>
            <p className={s.headlinePrice}>{headlinePrice}</p>
            <p className={s.priceSubtitle}>{priceSubtitle}</p>
          </div>
          <div className={s.detailCol}>
            {rowInteractive ? (
              <button
                type="button"
                className={s.specHit}
                aria-label={`${validityLabel}, ${dataLabel}; expand`}
                onClick={() => triggerCallback(onSpecRowClick)}
              >
                {specCluster}
                {showChevron ? (
                  <span className={s.chevron} aria-hidden>
                    <ChevronRightIcon />
                  </span>
                ) : null}
              </button>
            ) : (
              <div className={s.specRowReadOnly}>
                {specCluster}
                {showChevron ? (
                  <span className={s.chevron} aria-hidden>
                    <ChevronRightIcon />
                  </span>
                ) : null}
              </div>
            )}

            {onPlanDetailsClick ? (
              <button
                type="button"
                className={s.planDetailsLink}
                data-testid="plan-details-listing-plan-details"
                onClick={() => triggerCallback(onPlanDetailsClick)}
              >
                {planDetailsLabel}
              </button>
            ) : (
              <span className={s.planDetailsStatic}>{planDetailsLabel}</span>
            )}

            {icons.length > 0 ? (
              <div
                className={s.footerIcons}
                data-testid="plan-details-listing-footer-icons"
              >
                {icons.map((node, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={s.footerIconSlot}
                  >
                    {node}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(PlanDetailsListingCard);
