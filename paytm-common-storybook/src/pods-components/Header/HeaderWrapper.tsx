/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { HeaderWrapperProps, STATUS_BAR_HEIGHT } from './Header.types';
import cx from '../../utils/classNames';
import s from './Header.module.scss';

const HeaderWrapper: React.FC<HeaderWrapperProps> = (props) => {
  const {
    customClass = '',
    reserveSpaceForStatusBar = false,
    children,
  } = props;

  return (
    <div
      role="heading"
      aria-level={1}
      className={cx(s.headerContainer, customClass)}
      style={{
        paddingTop: reserveSpaceForStatusBar ? STATUS_BAR_HEIGHT : 0,
      }}
    >
      {children}
    </div>
  );
};

export default HeaderWrapper;
