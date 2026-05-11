import React, { Fragment } from "react";

import { AvatarPropsExceptSize, HeaderRegularAvatarProps, MAX_TRAILING_ITEMS } from "../Header.types";
import Avatar from "../../Avatar/Avatar";
import { ReactComponent as BackArrow } from "../../../assets/ultra-icons/system/nav/arrow_with_tail_left.svg";
import { onEnter, triggerCallback } from "../../../utils/utils";
import cx from "../../../utils/classNames";
import s from "./HeaderRegularAvatar.module.scss";
import HeaderWrapper from "../HeaderWrapper";
import HeaderTrailing from "../HeaderTrailing";

const HeaderRegularAvatar: React.FC<HeaderRegularAvatarProps> = function ({
  TrailingIcons = [],
  TrailingLinks = [],
  showBack = true,
  onBackClick,
  title = "",
  subTitle = "",
  TitleIcon,
  avatarProps = {},
  customClass = "",
  reserveSpaceForStatusBar
}) {
  const renderTitlesSection = () => {
    return (
      <Fragment>
        {avatarProps && Object.keys(avatarProps).length > 0 && (
          <div
            data-testid="avatar-image"
            className={s.avatarImage}
          >
              <Avatar
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...avatarProps as AvatarPropsExceptSize}
                size="regular"
              />
          </div>
        )}
        <div className={s.titlesContainer}>
          <div className={s.titleContainer}>
            <span role="heading" aria-level={1} data-testid="title" className={s.title}>{title}</span>
            {TitleIcon && <span data-testid="title-icon" className={s.titleIcon}>{TitleIcon}</span>}
          </div>
          {subTitle && <span role="note" data-testid="sub-title" className={s.subTitle}>{subTitle}</span>}
        </div>
      </Fragment>
    );
  };

  return (
    <HeaderWrapper customClass={customClass} reserveSpaceForStatusBar={reserveSpaceForStatusBar}>
      <div
        data-testid="header-regular-avatar"
        className={s.headerRegularAvatarContainer}
      >
        {showBack && (
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
            <BackArrow />
          </span>
        )}
        <section className={s.titlesSection}>{renderTitlesSection()}</section>
        <HeaderTrailing
          TrailingIcons={TrailingIcons}
          TrailingLinks={TrailingLinks}
        />
      </div>
    </HeaderWrapper>
  );
};

export default HeaderRegularAvatar;
