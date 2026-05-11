import React, { Fragment } from "react";

import { AvatarPropsExceptSize, HeaderDefaultProps, MAX_TRAILING_ITEMS } from "../Header.types";
import { ReactComponent as BackArrow } from "../../../assets/ultra-icons/system/nav/arrow_with_tail_left.svg";
import { onEnter, triggerCallback } from "../../../utils/utils";
import cx from "../../../utils/classNames";
import s from "./HeaderDefault.module.scss";
import HeaderWrapper from "../HeaderWrapper";
import Avatar from "../../Avatar/Avatar";
import HeaderTrailing from "../HeaderTrailing";

const HeaderDefault: React.FC<HeaderDefaultProps> = function ({
  TrailingIcons = [],
  showBack = true,
  onBackClick,
  title = "",
  subTitle = "",
  TrailingLinks = [],
  customTitleComponent,
  customClass = '',
  avatarProps,
  reserveSpaceForStatusBar,
  size = 'medium',
  TitleIcon,
  actionProps
}) {
  const renderLargeLayout = () => {
    const renderCustomTitleComponent = () => {
      if (title || subTitle) {
        return null
      }
      return customTitleComponent
    }

    const renderTitles = () => {
      return (
        <div className={s.titlesContainer}>
          {title && <span role="heading" aria-level={1} data-testid="title" className={s.title}>{title}</span>}
          {subTitle && <div className={s.subTitleContainer}>
            <span role="note" data-testid="sub-title" className={s.subTitle}>{subTitle}</span>
            {actionProps && (
              <a
                data-testid="action-link"
                className={cx(s.actionButton, actionProps.customClass)}
                onClick={actionProps.onClick}
                aria-label={actionProps.label}
              >
                {actionProps.label}
              </a>
            )}
          </div>}
        </div>
      );
    };

    const renderSecondLine = () => {
      if (!avatarProps && !title && !subTitle) {
        return null
      }
      return (
        <div
          data-testid="second-line"
          className={s.secondLine}
        >
          {avatarProps && (<Avatar
            customClass={cx(s.avatar, avatarProps.customClass)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...avatarProps as AvatarPropsExceptSize}
            size="regular"
          /> )}
          {renderTitles()}
        </div>
      )
    }

    return (
      <div
        data-testid="header-default"
        className={cx(s.headerDefaultContainer)}
      >
        <div
          data-testid="first-line"
          className={s.firstLine}
        >
          {showBack && (
            <span
              role="button"
              tabIndex={0}
              aria-label="back"
              data-testid="back-button"
              onClick={() => {
                triggerCallback(onBackClick);
              }}
              onKeyUp={(e) => {
                onEnter(e, onBackClick)
              }}
              className={cx(s.icon, s.backArrow)}
            >
              <BackArrow />
            </span>
          )}
          <section className={s.customContent}>
            {renderCustomTitleComponent()}
          </section>
          <HeaderTrailing
            TrailingIcons={TrailingIcons}
            TrailingLinks={TrailingLinks}
          />
        </div>
        {renderSecondLine()}
      </div>
    );
  };

  const renderMediumLayout = () => {
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
            {subTitle && <div className={s.subTitleContainer}>
             <span role="note" data-testid="sub-title" className={s.subTitle}>{subTitle}</span>
            {actionProps && (
              <a
                data-testid="action-link"
                className={cx(s.actionButton, actionProps.customClass)}
                onClick={actionProps.onClick}
                aria-label={actionProps.label}
              >
                {actionProps.label}
              </a>
            )}
            </div>}
          </div>
        </Fragment>
      );
    };

    return (
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
    );
  };

  const renderSmallLayout = () => {
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
                  size="small"
                />
            </div>
          )}
          <div className={s.titlesContainer}>
            <div className={s.titleContainer}>
              <span role="heading" aria-level={1} data-testid="title" className={s.title}>{title}</span>
            </div>
            {subTitle && <div  className={s.subTitleContainer}>
               <span role="note" data-testid="sub-title" className={s.subTitle}>{subTitle}</span>
              {actionProps && (
                <a
                  data-testid="action-link"
                  className={cx(s.actionButton, actionProps.customClass)}
                  onClick={actionProps.onClick}
                  aria-label={actionProps.label}
                >
                  {actionProps.label}
                </a>
              )}
            </div>}
          </div>
        </Fragment>
      );
    };

    return (
      <div
        data-testid="header-small-avatar"
        className={s.headerSmallAvatarContainer}
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
    );
  };

  const renderLayout = () => {
    switch (size) {
      case 'small':
        return renderSmallLayout();
      case 'medium':
        return renderMediumLayout();
      case 'large':
      default:
        return renderLargeLayout();
    }
  };

  return (
    <HeaderWrapper customClass={customClass} reserveSpaceForStatusBar={reserveSpaceForStatusBar}>
      {renderLayout()}
    </HeaderWrapper>
  );
};

export default HeaderDefault;
