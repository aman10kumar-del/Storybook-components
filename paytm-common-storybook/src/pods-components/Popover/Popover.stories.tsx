import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Popover from "./Popover";
import Button from "../Button/Button"
import { getFigmaLinkHTML } from "../../stories-common/utils";
import {ReactComponent as InfoIcon} from "../../assets/ultra-icons/system/action/info.svg"
import SampleImage1 from "../../assets/img/sampleImage1.png"

export default {
  title: "PODS Components/Popover",
  component: Popover,
  argTypes: {
    caretPosition: {
      description: "Position of the caret. Possible values are"
    },
    children: {
      description: "Pass the component as children, clicking on which the Popover should open"
    },
    content: {
      description: "Content of the popover. Could be a string or a component"
    },
    initialOpen: {
      description: "Inital open state of the Popover"
    },
    portal: {
      description: "Use this prop to render the Popover using Portal",
      defaultValue: false
    },
    customProps: {
      description: "You can use this prop to pass props from https://szhsin.github.io/react-menu/docs#menu for some custom functionalities. Please note that such customizations should be fully owned by verticals"
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "200px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=1233-159&m=dev")
      }
    }
  },
} as Meta<typeof Popover>;

const getChildren = () => {
  return (
    <div 
      style={{
        color: getComputedStyle(document.documentElement).getPropertyValue('--icon-neutral-weak')}}
    >
      <InfoIcon />
    </div>
  )
}

const horizontalMap = {
  leading: "left",
  trailing: "right",
  center: "center"
}

const Template: StoryFn<typeof Popover> = (args) => {
  const [vertical, horizontal] = args.caretPosition?.split("-")
  const getIconPositionStyles = () => {
    if (typeof args.content === "object" || horizontal === "center") {
      return {
        top: "20%",
        left: "20%",
      }
    }
    return {
      [vertical]: "32px",
      [horizontalMap[horizontal]]: "32px"
    }
  }
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        position: "fixed",
        ...getIconPositionStyles(),
      }}
    >
      <Popover 
        content={args.content}
        caretPosition={args.caretPosition}
        initialOpen={args.initialOpen}
      >
        {args.children}
      </Popover>
    </div>
  )
}

export const CaretAtTopLeading = Template.bind({});
CaretAtTopLeading.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "top-leading"
}

export const CaretAtTopTrailing = Template.bind({});
CaretAtTopTrailing.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "top-trailing"
}

export const CaretAtTopCenter = Template.bind({});
CaretAtTopCenter.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "top-center"
}

export const CaretAtBottomTrailing = Template.bind({});
CaretAtBottomTrailing.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "bottom-trailing"
}

export const CaretAtBottomLeading = Template.bind({});
CaretAtBottomLeading.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "bottom-leading"
}

export const CaretAtBottomCenter = Template.bind({});
CaretAtBottomCenter.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "bottom-center"
}

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  content: "Popover description copy goes here",
  children: getChildren(),
  caretPosition: "bottom-leading",
  initialOpen: true
}

export const CustomContent = Template.bind({});
CustomContent.args = {
  content: (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "246px"
    }}>
      <label 
        style={{
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "20px",
          marginBottom: "8px"
        }}
      >
        Hi there, this is our new home page. Would you like to take a tour ?
      </label>
      <img 
        style={{
          width: "100%",
          height: "100%"
        }}
        src={SampleImage1} 
      />
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          justifyContent: "center",
          gap: "8px"
        }}
      >
        <Button 
          type="filled"
          size="medium"
          onClick={()=>{}}
          label="Start tour"
        />
        <Button 
          type="stroke"
          size="medium"
          onClick={()=>{}}
          label="Later"
        />
      </div>
    </div>
  ),
  children: getChildren(),
  caretPosition: "top-leading"
}
