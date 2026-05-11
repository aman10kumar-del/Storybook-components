import React from "react";

import { ControlledProps } from "./SegmentedControl.types";
import SegmentsCommon from "./SegmentsCommon";
import { triggerCallback } from "../../utils/utils";

const ControlledSegments: React.FC<ControlledProps> = ({
  tabs = [],
  onChange,
  controlled: {
    activeTabID
  } = {},
  customClass
}) => {
  return (
    <SegmentsCommon
      tabs={tabs}
      activeTabID={activeTabID ?? tabs[0]?.id}
      onChange={(tab) => {
        triggerCallback(onChange, tab)
      }}
      customClass={customClass}
    />
  )
};

export default ControlledSegments;
