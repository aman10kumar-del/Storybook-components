import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "storybook/actions";

import Search from "./Search";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import { ReactComponent as SearchIcon} from "../../assets/ultra-icons/system/action/search.svg";
import { ReactComponent as MicIcon} from "../../assets/ultra-icons/system/action/mic.svg";

export default {
  title: "PODS Components/Search",
  component: Search,
  argTypes: {
    placeholder: {
      description: "Placeholder for the Search"
    },
    loading: {
      description: "To show / hide the loader"
    },
    debounceInterval: {
      description: "Debounce interval for the onChange event"
    },
    onChange: {
      description: "Callback that will be triggered when search value changes"
    },
    onClear: {
      description: "Callback that will be triggered when clear icon is clicked"
    },
    inputProps: {
      description: "Use this prop to pass any extra attributes that should be forwarded to the input field"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=211-3443&m=dev")
      }
    }
  },
} as Meta<typeof Search>;

const Template: StoryFn<typeof Search> = (args) => {
  const [loading, setLoading] = useState(false)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px",
        width: "100%",
        background: args.stroke ? "var(--background-neutral-inverse)" : "lightgray",
        height: "100vh",
      }}
    >
      <Search 
        {...args}
        onChange={(val) => {
          action('onChange')(val)
          setTimeout(() => {
            setLoading(false)
          }, 1000)
        }}
      />
    </div>
   
  );
}

export const Default = Template.bind({});
Default.args = {
}

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  TrailingIcon: <MicIcon />,
}

export const WithCustomInputProps = Template.bind({});
WithCustomInputProps.args = {
  TrailingIcon: <MicIcon />,
  loading: true,
  inputProps: {
    onBlur: ()=>{console.log("blurred")},
    onFocus: () => {console.log("focussed")},
    autoFocus: false
  }
}

export const WithStroke = Template.bind({});
WithStroke.args = {
  stroke: true,
}

export const WithoutDismissIcon = Template.bind({});
WithoutDismissIcon.args = {
  dismissIcon: false,
}

export const WithInputModeSwitch = Template.bind({});
WithInputModeSwitch.args = {
  showInputModeSwitch: true,
}

export const NumericInputMode = Template.bind({});
NumericInputMode.args = {
  defaultInputMode: 'numeric',
}
