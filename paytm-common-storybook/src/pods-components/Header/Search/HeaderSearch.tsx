import React from "react";

import { HeaderSearchProps, MAX_TRAILING_ITEMS } from "../Header.types";
import { ReactComponent as BackArrow } from "../../../assets/ultra-icons/system/nav/arrow_with_tail_left.svg";
import Search from "../../Search/Search";
import { SearchProps } from "../../Search/Search.types";
import { onEnter, triggerCallback } from "../../../utils/utils";
import cx from "../../../utils/classNames";
import s from "./HeaderSearch.module.scss";
import HeaderWrapper from "../HeaderWrapper";

const BackArrowIcon = ({onBackClick}: {onBackClick: () => void}) => {
  return (
    <span 
      data-testid="back-button" 
      className={cx(s.icon, s.backArrow)}
      onClick={() => {
        triggerCallback(onBackClick);
      }}
      onKeyUp={(e) => {
        onEnter(e, onBackClick)
      }}
    >
      <BackArrow />
    </span>
  )
}

const HeaderSearch: React.FC<HeaderSearchProps> = function ({
  onBackClick,
  searchProps,
  customClass = '',
  reserveSpaceForStatusBar
}) {
  return (
  <HeaderWrapper customClass={customClass} reserveSpaceForStatusBar={reserveSpaceForStatusBar}>
    <div
        data-testid="header-search"
        className={s.headerSearchContainer}
    >
        <Search
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...searchProps as SearchProps}
          LeadingIcon={<BackArrowIcon onBackClick={() => {
            triggerCallback(onBackClick);
          }} />}
          customClass={cx(s.search, searchProps?.customClass)}
        />
    </div>
  </HeaderWrapper>
  );
};

export default HeaderSearch;
