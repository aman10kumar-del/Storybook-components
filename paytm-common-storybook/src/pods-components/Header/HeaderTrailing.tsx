import React from "react";
import { MAX_TRAILING_ITEMS } from "./Header.types";
import cx from "../../utils/classNames";

import s from "./Header.module.scss";

interface HeaderTrailingProps {
  TrailingIcons?: React.ReactElement[],
  TrailingLinks?: React.ReactElement[],
}

const HeaderTrailing: React.FC<HeaderTrailingProps> = (props) => {
  const { TrailingIcons, TrailingLinks } = props;
  
  const renderTrailingSection = () => { 
    if (!TrailingIcons?.length && !TrailingLinks?.length) {
      return null
    }
    let content = null;
    if (TrailingIcons?.length) {
      content = TrailingIcons.slice(0, MAX_TRAILING_ITEMS).map((TrailingIcon, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={idx} data-testid={`icon-${idx}`} className={cx(s.icon)}>
          {TrailingIcon}
        </span>
      ));
    } else {
      content = TrailingLinks?.slice(0, MAX_TRAILING_ITEMS).map((Link, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <span key={idx} data-testid={`link-${idx}`} className={s.link}>
          {Link}
        </span>
      ));
    }
    return content;
  }
  
  return (
    <section
      className={cx(s.trailingSection, {
        [s.icons]: TrailingIcons?.length,
      })}
    >
     {renderTrailingSection()}
    </section>
  )
};

export default HeaderTrailing;