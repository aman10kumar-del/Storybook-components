import React from "react";

import { ListProps } from "./List.types";
import cx from "../../utils/classNames";
import s from "./List.module.scss";

const List: React.FC<ListProps> = (props) => {
  const { customClass = "", children } = props;
  return (
    <ul
      data-testid="list-item-container"
      className={cx(s.listContainer, customClass)}
    >
      {children}
    </ul>
  );
}

export default List;

