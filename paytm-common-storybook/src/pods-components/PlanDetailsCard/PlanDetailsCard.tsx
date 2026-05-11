import React from "react";

import { ReactComponent as ChevronDownIcon } from "../../assets/ultra-icons/system/nav/chevron_down.svg";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import Avatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Separator from "../Separator/Separator";

import s from "./PlanDetailsCard.module.scss";

export interface PlanDetailsCardProps {
  operatorLogoSrc: string;
  operatorLogoAlt?: string;
  displayName: string;
  mobileNumber: string;
  onChangeClick?: () => void;
  changeLabel?: string;

  planAmountLabel?: string;
  headlinePrice: string;
  priceSubtitle: string;
  /** Uses **Badge** `primary` + `muted` (Figma pill). Rendered on a row below the price/spec row. Omitted when empty. */
  badgeLabel?: string;

  validityLabel?: string;
  validityValue: string;
  dataLabel?: string;
  dataValue: string;

  /** Clamped to ~4 lines in the default layout. */
  description: string;

  viewMoreLabel?: string;
  onViewMoreClick?: () => void;
  /** When the control toggles a panel. */
  viewMoreAriaExpanded?: boolean;

  className?: string;
  cardClassName?: string;
}

const PlanDetailsCard: React.FC<PlanDetailsCardProps> = ({
  operatorLogoSrc,
  operatorLogoAlt = "Mobile operator",
  displayName,
  mobileNumber,
  onChangeClick,
  changeLabel = "Change",
  planAmountLabel = "Plan Amount:",
  headlinePrice,
  priceSubtitle,
  badgeLabel,
  validityLabel = "Validity",
  validityValue,
  dataLabel = "Data",
  dataValue,
  description,
  viewMoreLabel = "View More Details",
  onViewMoreClick,
  viewMoreAriaExpanded,
  className,
  cardClassName,
}) => {
  return (
    <div
      className={cx(s.root, className)}
      data-testid="plan-details-card"
    >
      <Card customClass={cx(s.card, cardClassName)}>
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

        <div className={s.separatorWrap}>
          <Separator hairline />
        </div>

        <p className={s.planAmountLabel}>{planAmountLabel}</p>

        <div className={s.planBlock}>
          <div className={s.planRow}>
            <div className={s.priceCol}>
              <div className={s.priceStack}>
                <p className={s.headlinePrice}>{headlinePrice}</p>
                <p className={s.priceSubtitle}>{priceSubtitle}</p>
              </div>
            </div>
            <div className={s.detailCol}>
              <div className={s.specRow}>
                <div className={s.specPair}>
                  <p className={s.specLabel}>{validityLabel}</p>
                  <p className={s.specValue}>{validityValue}</p>
                </div>
                <div className={cx(s.specPair, s.specPairWide)}>
                  <p className={s.specLabel}>{dataLabel}</p>
                  <p className={s.specValue}>{dataValue}</p>
                </div>
              </div>
            </div>
          </div>
          {badgeLabel ? (
            <div className={s.badgeRow}>
              <div className={s.badgeWrap}>
                <Badge context="primary" muted label={badgeLabel} />
              </div>
            </div>
          ) : null}
        </div>

        <p className={s.description}>{description}</p>

        <Button
          type="tonal"
          size="medium"
          label={viewMoreLabel}
          TrailingIcon={<ChevronDownIcon />}
          customClass={s.viewMoreFooterBtn}
          disabled={!onViewMoreClick}
          ariaExpanded={viewMoreAriaExpanded}
          onClick={() => triggerCallback(onViewMoreClick)}
        />
      </Card>
    </div>
  );
};

export default React.memo(PlanDetailsCard);
