import React from 'react';

import { onEnter, triggerCallback } from '../../utils/utils';
import { SwitchProps } from "./Switch.types"
import cx from '../../utils/classNames';
import s from './Switch.module.scss';

const Switch: React.FC<SwitchProps> = ({
  active = false,
  disabled = false,
  label = "",
  accessibleName,
  onToggle,
  customClass = ""
}) => {
  const ariaLabel =
    accessibleName !== undefined ? accessibleName : label || "switch";
  return (
    <div className={`${s.toggle} ${customClass}`}>
      <div
        role="switch"
        aria-label={ariaLabel}
        aria-checked={active}
        tabIndex={0}
        data-testid="toggle-switch"
        // id="toggleBox"
        onClick={() => {
          triggerCallback(onToggle)
        }}
        onKeyUp={e => {
					onEnter(e, onToggle)
				}}
        className={cx(s.toggleSwitch, {
          [s.active]: active,
          [s.disabled]: disabled
        })}
      >
        <div className={s.roundBox} />
      </div>
      {label && <span className={s.label} data-testid="label">{label}</span>}
    </div>
  );
}

export default React.memo(Switch);
