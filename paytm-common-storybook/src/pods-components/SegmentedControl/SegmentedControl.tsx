/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import ControlledSegments from "./ControlledSegments";
import UnControlledSegments from "./UnControlledSegments";
import { ControlledProps, SegmentedControlProps, UnControlledProps } from "./SegmentedControl.types";

const SegmentedControl: React.FC<SegmentedControlProps> = (props) => {
  const { controlType = "uncontrolled" } = props;
  return controlType === "controlled" ? (
    <ControlledSegments {...props as ControlledProps} />
  ) : (
    <UnControlledSegments {...props as UnControlledProps} />
  );
};

export default SegmentedControl;
