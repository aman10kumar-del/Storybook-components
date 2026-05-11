import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import EnterMobileNumber from "./EnterMobileNumber";
import {
  INDIAN_MOBILE_FORMAT_ERROR,
  INDIAN_MOBILE_REQUIRED_ERROR,
  isValidIndianMobile,
} from "./indianMobileValidation";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import storyStyles from "./EnterMobileNumber.stories.module.scss";

const FIGMA_SOT =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6587";
const FIGMA_VARIANT_2 =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6609";

const TOKEN_NOTE = `
**Tokens:** Uses existing spacing, radius (\`radius-max\`), typography (\`body-medium\` / \`body-bold\`), and semantic colors only. **Focus:** \`outline\` uses \`--border-primary-strong\` (no separate focus-ring token in the dictionary — flag if product wants a dedicated token).

**Modes (when \`showInputModeSwitch\`):** **123** → digits only, placeholder **Enter Mobile Number**, \`tel-national\`, max **10**. **ABC** → letters, digits, spaces (\`sanitizeAlphanumericName\`), placeholder **Enter Name**, \`name\` autocomplete, max **100**. Toggling re-sanitizes \`value\` and calls \`onChange\` if it changes.

**Numeric-only (no switch):** Same as 123 mode; Indian validation helpers apply to the string as **10 digits** (first digit 6–9).

**Story layout:** The field is **not** shown inside **Card** — it sits as a block in the **content gutter** (horizontal inset), full width of that column, not edge-to-edge on the canvas.
`;

const meta: Meta<typeof EnterMobileNumber> = {
  title: "PODS Components - New/EnterMobileNumber",
  component: EnterMobileNumber,
  parameters: {
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA_SOT, "Figma (SOT)")}${getFigmaLinkHTML(
          FIGMA_VARIANT_2,
          "Figma (variant 2)",
        )}${TOKEN_NOTE}`,
      },
    },
  },
};

export default meta;

/** Page-style wash + content-area inset only (no Card). */
const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={storyStyles.contentArea}>{children}</div>
);

const Template: StoryFn<typeof EnterMobileNumber> = (args) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <Shell>
      <EnterMobileNumber
        {...args}
        value={value}
        onChange={(v) => {
          action("onChange")(v);
          setValue(v);
        }}
      />
    </Shell>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: "",
  showContacts: false,
  showInputModeSwitch: false,
};

export const WithContacts = Template.bind({});
WithContacts.args = {
  value: "",
  showContacts: true,
  onContactsClick: action("onContactsClick"),
};

export const FilledValid = Template.bind({});
FilledValid.args = {
  value: "9876543210",
  showContacts: false,
};

export const WithInputModeSwitch = Template.bind({});
WithInputModeSwitch.args = {
  value: "",
  showContacts: true,
  showInputModeSwitch: true,
  defaultInputMode: "numeric",
  onContactsClick: action("onContactsClick"),
  onInputModeChange: action("onInputModeChange"),
};

export const NameModeDefault = Template.bind({});
NameModeDefault.args = {
  value: "",
  showContacts: true,
  showInputModeSwitch: true,
  defaultInputMode: "text",
  onContactsClick: action("onContactsClick"),
  onInputModeChange: action("onInputModeChange"),
};

export const NameModeFilled = Template.bind({});
NameModeFilled.args = {
  value: "Priya Sharma",
  showContacts: true,
  showInputModeSwitch: true,
  defaultInputMode: "text",
  onContactsClick: action("onContactsClick"),
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "9876543210",
  disabled: true,
  showContacts: true,
};

export const Loading = Template.bind({});
Loading.args = {
  value: "",
  loading: true,
  showContacts: true,
};

export const ErrorRequired = Template.bind({});
ErrorRequired.args = {
  value: "",
  error: INDIAN_MOBILE_REQUIRED_ERROR,
};

export const ErrorInvalidFormat = Template.bind({});
ErrorInvalidFormat.args = {
  value: "5876543210",
  error: INDIAN_MOBILE_FORMAT_ERROR,
};

export const AssistiveOnly = Template.bind({});
AssistiveOnly.args = {
  value: "",
  assistiveText: "We will send an OTP to this number",
  error: "",
};

const ValidateOnBlurTemplate: StoryFn<typeof EnterMobileNumber> = () => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const error =
    touched && value.length === 0
      ? INDIAN_MOBILE_REQUIRED_ERROR
      : touched && value.length === 10 && !isValidIndianMobile(value)
        ? INDIAN_MOBILE_FORMAT_ERROR
        : touched && value.length > 0 && value.length < 10
          ? INDIAN_MOBILE_FORMAT_ERROR
          : "";

  return (
    <Shell>
      <EnterMobileNumber
        value={value}
        onChange={(v) => {
          action("onChange")(v);
          setValue(v);
        }}
        error={error}
        showContacts
        inputProps={{
          onBlur: () => setTouched(true),
        }}
        onContactsClick={action("onContactsClick")}
      />
      <p
        style={{
          marginTop: 12,
          fontSize: 12,
          color: "var(--text-neutral-moderate)",
        }}
      >
        Blur the field to run validation (story demo).
      </p>
    </Shell>
  );
};

export const ValidateOnBlur = ValidateOnBlurTemplate.bind({});
