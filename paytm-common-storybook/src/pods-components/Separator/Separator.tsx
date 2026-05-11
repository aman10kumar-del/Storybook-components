import React from 'react'

import { SeparatorProps } from './Separator.types';
import cx from "../../utils/classNames";
import s from './Separator.module.scss';

const Separator: React.FC<SeparatorProps> = function ({
  hairline = false,
}) {
  return (
    <div
      role="separator"
      data-testid="separator"
      className={cx(s.separator, {
        [s.hairline]: hairline
      })}
    />
  )
}

export default Separator;
