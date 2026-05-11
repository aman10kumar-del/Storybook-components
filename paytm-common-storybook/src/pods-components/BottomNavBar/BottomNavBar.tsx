import React, { Suspense } from "react";
import { BottomNavBarProps, Option } from "./BottomNavBar.types";
import s from './BottomNavBar.module.scss';
import cx from "../../utils/classNames";
import { triggerCallback } from "../../utils/utils";

const Badge = React.lazy(() => import('../Badge/Badge'));

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  customClass = '',
  options = [],
  onClick
}) => {
  return (
    <ul
      role="navigation"
      data-testid="bottom-nav-bar-container"
      className={cx(s.bottomNavBarContainer, customClass)}
    >
      {options.map((item: Option, index: number) => {
        const {
          icon, label = "", id, active, badgeProps
        } = item;
        return (
          <li
            role="presentation"
            data-testid={`nav-bar-item-${index}`}
            key={id}
            className={cx(s.navBarItem, {
              [s.active]: active
            })}
            onClick={() => {
              triggerCallback(onClick, item);
            }}
            style={{
              maxWidth: `${100 / options.length}%`
            }}
          >

            <span data-testid="icon" className={s.iconContainer}>
              <span className={s.icon}>{icon}</span>
              {badgeProps && Object.keys(badgeProps).length > 0 ? (
                <Badge
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...badgeProps}
                  customClass={cx(s.badge, badgeProps.shape && s[badgeProps.shape], badgeProps.customClass)}
                  shape={badgeProps.shape}
                />
            ) : null}
            </span>
            <p data-testid="label" className={s.label}>{label}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default BottomNavBar;
