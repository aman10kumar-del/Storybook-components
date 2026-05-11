import React from "react";
import s from './ActivityTimeline.module.scss';
import { ActivityTimelineProps, HorizontalOption, Step, VerticalOption, VerticalTimeline } from "./ActivityTimeline.types";
import cx from "../../utils/classNames";
import { ReactComponent as CompletedBrand } from "../../assets/ultra-icons/system/status/select_themed.svg";
import { ReactComponent as Completed } from "../../assets/ultra-icons/system/status/success_themed.svg";
import { ReactComponent as Failed } from "../../assets/ultra-icons/system/status/failed_themed.svg";
import { ReactComponent as Warning } from "../../assets/ultra-icons/system/status/pending_themed.svg";
import { ReactComponent as Awaiting } from "../../assets/ultra-icons/system/status/awaiting.svg";
import { ReactComponent as Processing } from "../../assets/ultra-icons/system/status/processing.svg";
import { ReactComponent as Loading } from "../../assets/ultra-icons/system/status/loading.svg";
import Button from "../Button/Button";
import Separator from "../Separator/Separator";

const ActivityTimeline: React.FC<ActivityTimelineProps> = (props) => {
  const { type = 'horizontal', options, customClass } = props;
  
  const getIcon = (type: Step = 'awaited', active: boolean = true) => {
    const classNames = !active ? s.inactive : '';
    switch (type) {
      case 'completed-brand':
        return <CompletedBrand data-testid="success" className={classNames} />
      case 'completed':
        return <Completed data-testid="success" className={classNames} />
      case 'failed':
        return <Failed data-testid="failed" className={classNames} />
      case 'warning':
        return <Warning data-testid="warning" className={classNames} />
      case 'processing':
        return <Processing data-testid="processing" className={classNames} />
      case 'loading':
        return <Loading data-testid="loading" className={classNames} />
      case 'awaited':
        return <Awaiting data-testid="awaiting" className={classNames} />
    }
    if (typeof type === 'number') {
      return <span data-testid="number" className={cx(s.number, classNames)}>{type}</span>
    }
    return <Awaiting data-testid="awaiting" className={classNames} />
  };

  const renderVerticalTimeline = () => {
    const { alignment = 'top', appearance = 'default' } = props as VerticalTimeline;
    return (
      <ul
        data-testid="activity-timeline-container"
        className={cx(
          s.timelineContainer,
          s.vertical,
          appearance === 'payment-details' && s.verticalPaymentDetails,
          customClass
        )}
      >
        {(options as VerticalOption[])?.map((item: VerticalOption, index: number) => {
          const { id, step = 'awaited', active, title, subtitle, actionProps } = item;
          return (
            <React.Fragment key={`${id}_${index}`}>
              <li aria-label={step.toString()} className={s.item} data-testid="timeline-item">
                <div className={s.iconWrapper}>
                  {alignment === 'center' && <div className={cx(s.separatorWrapper, s.top, {
                    [s.transparent]: index === 0,
                  })} />}
                  {getIcon(step, active ?? true)}
                  <div className={cx(s.separatorWrapper, s.bottom, {
                    [s.transparent]: index === options.length - 1,
                  })} />
                </div>
                <div className={s.contentWrapper}>
                  {title && <span className={s.title}>{title}</span>}
                  {subtitle && <span className={s.subtitle}>{subtitle}</span>}
                </div>
                {actionProps && (
                  <Button 
                    {...actionProps}
                    size="small"
                  />
                )}
              </li>
              {index < options.length - 1 && (
                <div className={s.separatorWrapper}>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    );
  }

  const renderHorizontalTimeline = () => {
    return (
      <ul
        data-testid="activity-timeline-container"
        className={cx(s.timelineContainer, s.horizontal, customClass)}
      >
        {options?.map((item: HorizontalOption, index: number) => {
          const { id, step = 'awaited', active, title } = item;
          return (
            <React.Fragment key={`${id}_${index}`}>
              <li aria-label={step.toString()} className={s.item} data-testid="timeline-item">
                {getIcon(step, active ?? true)}
                {title && <span className={s.title}><span className={s.titleText}>{title}</span></span>}
              </li>
              {index < options.length - 1 && (
                <div className={s.separatorWrapper}>
                  <Separator hairline />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    );
  }
  
  if (type === "horizontal") {
    return renderHorizontalTimeline();
  }
  return renderVerticalTimeline();
};

export default ActivityTimeline;
