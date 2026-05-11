import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import { getFigmaLinkHTML } from "../utils";
import TrustedDoubleCheckerSelect from "./TrustedDoubleCheckerSelect";

const figmaUrl =
  "https://www.figma.com/design/aFp7GbHbLFh8QWjOSeOH4t/Untitled?node-id=0-20286";

export default {
  title: "PODS Vertical flows/Payments/Trusted DoubleChecker — select contact",
  component: TrustedDoubleCheckerSelect,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
${getFigmaLinkHTML(figmaUrl)}
<h4 style="padding-top:10px;margin-top:0px">Intent</h4>
<p>User picks someone to act as a trusted contact for double-checking risky payments (demo copy).</p>
<h4 style="padding-top:10px;margin-top:0px">Match vs intentional</h4>
<ul>
<li><strong>Matches Figma:</strong> header title and subtitle, pill search, &quot;Suggestions&quot; grid, &quot;All Contacts&quot; list with row separators and &quot;Change&quot; links, page background and white cards.</li>
<li><strong>Generic / demo:</strong> status bar omitted; footer uses typography instead of raster Paytm/Circle lockup; list avatars use deterministic initials (Figma reused one avatar); contact data is static.</li>
</ul>
`,
      },
    },
  },
} as Meta<typeof TrustedDoubleCheckerSelect>;

export const Default: StoryFn = () => (
  <div
    style={{
      margin: "0 auto",
      width: "100%",
      maxWidth: 430,
      minHeight: "100vh",
      boxSizing: "border-box",
      background: "var(--surface-level-4)",
    }}
  >
    <TrustedDoubleCheckerSelect
      onBack={action("back")}
      onSelectSuggestion={action("select suggestion")}
      onSelectContact={action("select contact")}
      onChangeContact={action("change contact")}
    />
  </div>
);
