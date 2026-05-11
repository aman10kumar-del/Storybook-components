import React from "react";

import { HeaderLogoProps } from "../Header.types";
import { ReactComponent as BackArrow } from "../../../assets/ultra-icons/system/nav/arrow_with_tail_left.svg";
import paytmLogo from "../../../assets/img/paytmLogo.png";
import cx from "../../../utils/classNames";
import s from "./HeaderLogo.module.scss";
import { onEnter, triggerCallback } from "../../../utils/utils";
import HeaderWrapper from "../HeaderWrapper";
import HeaderTrailing from "../HeaderTrailing";

const HeaderLogo: React.FC<HeaderLogoProps> = function ({
  TrailingIcons = [],
  showBack = true,
  onBackClick,
  TrailingLinks = [],
  logo = "",
  customClass = "",
  reserveSpaceForStatusBar
}) {

  return (
    <HeaderWrapper customClass={customClass} reserveSpaceForStatusBar={reserveSpaceForStatusBar}>
      <div
        data-testid="header-logo"
        className={s.headerLogoContainer}
      >
        <span
          role="button"
          tabIndex={0}
          aria-label="back"
          data-testid="back-button"
          className={cx(s.icon, s.backArrow)}
          onClick={() => {
            triggerCallback(onBackClick);
          }}
          onKeyUp={(e) => {
            onEnter(e, onBackClick)
          }}
        >
          {showBack && (
            <BackArrow />
          )}
        </span>
        <div className={s.logo}>
          <img data-testid="logo" src={logo || paytmLogo} alt="paytm-logo" />
        </div>
        <div
          className={cx(s.trailingSection, {
            [s.icons]: TrailingIcons?.length,
          })}
        >
          <HeaderTrailing
            TrailingIcons={TrailingIcons}
            TrailingLinks={TrailingLinks}
          />
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default HeaderLogo;
