import React, { useMemo } from "react";

import { ReactComponent as ChevronDownIcon } from "../../assets/ultra-icons/system/nav/chevron_down.svg";
import { ReactComponent as ChevronUpIcon } from "../../assets/ultra-icons/system/nav/chevron_up.svg";
import cx from "../../utils/classNames";
import { triggerCallback } from "../../utils/utils";
import ActivityTimeline from "../ActivityTimeline/ActivityTimeline";
import Card from "../Card/Card";
import SectionHeader from "../SectionHeader/SectionHeader";
import type { VerticalOption } from "../ActivityTimeline/ActivityTimeline.types";

import s from "./PaymentDetailsTimelineCard.module.scss";

export interface PaymentDetailsTimelineStep {
  id: string;
  /** Timeline copy (success icon in default story). */
  label: string;
}

export interface PaymentDetailsTimelineCardProps {
  title?: string;
  steps: PaymentDetailsTimelineStep[];
  /**
   * Per-step ActivityTimeline config. When omitted, steps map to `completed` with `label` as title.
   */
  timelineOptions?: VerticalOption[];
  /** Collapsible header: tap target is the trailing chevron. */
  onHeaderToggleClick?: () => void;
  /** When using `onHeaderToggleClick`, set expanded vs collapsed chevron and `aria-expanded`. */
  headerExpanded?: boolean;
  /** Accessible name for the toggle control. */
  headerToggleAriaLabel?: string;
  className?: string;
  cardClassName?: string;
}

const PaymentDetailsTimelineCard: React.FC<PaymentDetailsTimelineCardProps> = ({
  title = "Payment Details",
  steps,
  timelineOptions,
  onHeaderToggleClick,
  headerExpanded = true,
  headerToggleAriaLabel = "Toggle payment details",
  className,
  cardClassName,
}) => {
  const options = useMemo<VerticalOption[]>(() => {
    if (timelineOptions?.length) {
      return timelineOptions;
    }
    return steps.map((st) => ({
      id: st.id,
      step: "completed",
      title: st.label,
    }));
  }, [steps, timelineOptions]);

  const trailingChevron = onHeaderToggleClick ? (
    <button
      type="button"
      className={s.headerChevronButton}
      data-testid="payment-details-timeline-header-toggle"
      aria-expanded={headerExpanded}
      aria-label={headerToggleAriaLabel}
      onClick={() => triggerCallback(onHeaderToggleClick)}
    >
      {headerExpanded ? (
        <ChevronUpIcon aria-hidden className={s.headerChevronIcon} />
      ) : (
        <ChevronDownIcon aria-hidden className={s.headerChevronIcon} />
      )}
    </button>
  ) : (
    <span className={s.headerChevronStatic} aria-hidden>
      <ChevronUpIcon className={s.headerChevronIcon} />
    </span>
  );

  return (
    <div
      className={cx(s.root, className)}
      data-testid="payment-details-timeline-card"
    >
      <Card customClass={cx(s.card, cardClassName)}>
        <SectionHeader
          title={title}
          size="large"
          titleWeight="medium"
          customClass={s.sectionHeader}
          TrailingIcons={[trailingChevron]}
        />
        {headerExpanded && (
          <ActivityTimeline
            type="vertical"
            appearance="payment-details"
            options={options}
          />
        )}
      </Card>
    </div>
  );
};

export default React.memo(PaymentDetailsTimelineCard);
