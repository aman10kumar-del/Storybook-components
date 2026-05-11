import React from 'react';

import { LoaderProps } from './Loader.types';
import s from './Loader.module.scss';
import cx from "../../utils/classNames";

const Loader: React.FC<LoaderProps> = ({
  type = "theme",
  size = "large"
}) => {
  const loader = (
    <div
      data-testid="loader"
      className={cx(s.loader, {
        [s.monotone]: type === "monotone",
        [s.large]: size === "large",
        [s.medium]: size === "medium",
        [s.small]: size === "small"
      })}
    >
      <span data-testid="bounce-1" className={s.bounce1} />
      <span className={s.bounce2} />
      <span className={s.bounce3} />
      <span className={s.bounce4} />
      <span className={s.bounce5} />
    </div>
  );

  return loader;
};

export default React.memo(Loader);
