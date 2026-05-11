import React, {useEffect, useState} from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "storybook/actions";

import OTP from "./OTP";
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/OTP",
  component: OTP,
  argTypes: {
    title: { 
			description: "Title for the OTP" 
		},
    inputLength: { 
			description: "Number of digits in the OTP" 
		},
		value: {
			description: "OTP is a controlled component. Use this prop to control the value"
		},
		onChange: {
			description: "Callback for value change"
		},
		error: {
			description: "Pass any error string to be displayed"
		},
		warning: {
			description: "Pass any warning string to be displayed"
		},
		resendOTPText: {
			description: "Text for the Resend OTP button. Pass empty string to hide it"
		},
		onResendOTPClick: {
			description: "Callback that will be triggered when Resend OTP button is clicked"
		},
		resendOTPInterval: {
			description: "Pass a value in seconds to prevent resending the OTP until the given time has been passed"
		},
		alternativeActionText: {
			description: "Text for the Alternative Action button. Pass empty string to hide it"
		},
		onAlternativeActionClick: {
			description: "Callback that will be triggered when Alternative Action button is clicked"
		},
		inputProps: {
      description: "Use this prop to pass any extra attributes that should be forwarded to the input field"
    }
  },
	parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=3115-8517&t=Ao0dkCncV1IN9noh-0")
      }
    }
  },
} as Meta<typeof OTP>;

const Template: StoryFn<typeof OTP> = ({value: ValueFromArgs, ...args}) => {
	const [value, setValue] = useState(ValueFromArgs || "")
	useEffect(() => {
		setValue(ValueFromArgs)
	}, [ValueFromArgs])

	return (
		<OTP 
			{...args} 
			value={value}
			onChange={(e) => {
				action('onChange')(e)
				setValue(e)
			}}
		/>
	);
}

export const Default = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
	title: "OTP"
}

export const WithoutResendOTP = Template.bind({});
WithoutResendOTP.args = {
	resendOTPText: "",
}

export const WithWarning = Template.bind({});
WithWarning.args = {
	warning: "Make sure you enter correct OTP",
}

export const WithError = Template.bind({});
WithError.args = {
	error: "Wrong OTP entered",
}

export const WithAlternateAction = Template.bind({});
WithAlternateAction.args = {
	error: "Wrong OTP entered",
	alternativeActionText: "Try another verification method",
}
