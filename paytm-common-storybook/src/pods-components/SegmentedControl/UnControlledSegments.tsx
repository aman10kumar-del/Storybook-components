import React, { useState } from "react";

import { UnControlledProps } from "./SegmentedControl.types";
import SegmentsCommon from "./SegmentsCommon";
import { triggerCallback } from "../../utils/utils";

const UnControlledSegments: React.FC<UnControlledProps> = ({
  onChange,
  tabs = [],
  unControlled: {
    initialActiveTabID
  } = {},
  customClass
}) => {
  const [activeTabID, setActiveTabID] = useState(initialActiveTabID ?? tabs[0]?.id)
  return (
    <SegmentsCommon
      tabs={tabs}
      activeTabID={activeTabID}
      onChange={(tab) => {
        setActiveTabID(tab.id)
        triggerCallback(onChange, tab)
      }}
      customClass={customClass}
    />
  )
};

export default UnControlledSegments;
