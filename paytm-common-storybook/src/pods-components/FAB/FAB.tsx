import React, { useState } from "react";

import {
  FABProps
} from "./FAB.types";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./FAB.module.scss";

const MAX_BUTTONS = 5;

const FAB: React.FC<FABProps> = function (props) {
  const { customClass = "", Icon, onClick, label } = props;
  const [showRippleIdx, setShowRippleIdx] = useState(-1);
  return (
    <div
      data-testid="fab-container"
      className={cx(s.fabContainer, customClass)}
    >
      <div
        data-testid="fab-single-container"
        className={cx(s.fabSingle, {
          [s.standard]: !label
        })}
      >
        <div
          role="button"
          tabIndex={0}
          data-testid={`fab-button`}
          key={label}
          className={cx(s.button, {
            // [s.ripple]: showRippleIdx === 0,
          })}
          onClick={() => {
            setShowRippleIdx(0);
            triggerCallback(onClick);
            setTimeout(() => {
              setShowRippleIdx(-1);
            }, 300);
          }}
        >
          <span className={s.icon}>{Icon}</span>
          {label && <span data-testid="label" className={s.label}>{label}</span>}
        </div>
      </div>
    </div>
  );
};

export default FAB;
