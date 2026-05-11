import React, { useEffect, useRef } from "react";
import s from './ProgressBar.module.scss';
import { ProgressBarProps } from "./ProgressBar.types";
import cx from "../../utils/classNames";

const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  customClass = '',
  primaryColor,
  secondaryColor,
}) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value >= 0) {
      const barWidth = value > 100 ? 100 : value;
      if (barRef.current) {
        barRef.current.style.setProperty('--w', `${barWidth}%`);
      }
    }
  }, [value]);

  const style: React.CSSProperties & Record<`--${string}`, string> = {};
  if (primaryColor) style['--progress-bar-fill'] = primaryColor;
  if (secondaryColor) style['--progress-bar-bg'] = secondaryColor;

  return (
    <div
      role="progressbar"
      aria-label="progress"
      data-testid="progress-bar-container"
      className={cx(s.progressBar, customClass)}
      style={Object.keys(style).length ? style : undefined}
      aria-valuenow={value}
    >
      <div data-testid="bar-width" ref={barRef} className={s.bar} />
    </div>
  );
};

export default ProgressBar;
