import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import PostPaymentPattern from "./PostPaymentPattern";
import { getFigmaLinkHTML } from "../utils";

const FIGMA_MINI =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-7071&m=dev";
const FIGMA_EXPANDED =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6497&m=dev";

export default {
  title: "PODS Patterns/Post payment",
  component: PostPaymentPattern,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `${getFigmaLinkHTML(
          FIGMA_MINI,
          "Figma — Mini (default)",
        )}${getFigmaLinkHTML(FIGMA_EXPANDED, "Figma — Expanded")}`,
      },
    },
  },
} as Meta<typeof PostPaymentPattern>;

export const MiniAndExpanded: StoryFn = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        padding: "16px",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <p style={{ marginTop: 0, marginBottom: 16, fontFamily: "system-ui" }}>
        <label style={{ cursor: "pointer", userSelect: "none" }}>
          <input
            type="checkbox"
            checked={expanded}
            onChange={(e) => setExpanded(e.target.checked)}
          />{" "}
          Show expanded detail
        </label>
      </p>
      <PostPaymentPattern
        expanded={expanded}
        onExpandedChange={setExpanded}
        onCheckBalance={action("check balance")}
        onShareReceipt={action("share receipt")}
        onPayAgain={action("pay again")}
        onCopyUpiRef={action("copy UPI ref")}
      />
    </div>
  );
};
