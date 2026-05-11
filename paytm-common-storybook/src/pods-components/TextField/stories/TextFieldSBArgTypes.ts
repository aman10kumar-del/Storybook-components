export const argTypes = {
  assistiveText: {
    description: "Assistive text to be shown"
  },
  error: {
    description: "Error text to be shown"
  },
  label: {
    description: "Label for the TextField"
  },
  LeadingIcon: {
    description: "Leading icon to be dispalyed"
  },
  TrailingIcon: {
    description: "Trailing icon to be displayed"
  },
  TrailingLink: {
    description: `Trailing link to be displayed. If both TrailingLink and TrailingIcon are passed,
    then only TrailingIcon will be displayed
    `
  },
  onChange: {
    description: "Callback that will be triggered when user types on the field"
  },
  emphasis: {
    description: "Specifies the emphasis of the TextField. Possible values are"
  },
  value: {
    description: "TextField is a controlled component. Use this prop to control the value"
  },
  highEmphasis: {
    description : `Configs specific to HighEmphasis TextField. Pass this only if 'type' is 'high'.
    Pass an object with the below shape\n
    {
      prefix: string: Prefix text to be shown. If both LeadingIcon and prefix are passed, only the LeadingIcon will be shown
    }
    `,
    table: { 
      type: "",
      defaultValue: { 
        summary: ""
      } 
    },
  },
  inputProps: {
    description: "Use this prop to pass any extra attributes that should be forwarded to the input field"
  },
  disabled: {
    description: "Property to enable and disable the state of the input",
  }
}