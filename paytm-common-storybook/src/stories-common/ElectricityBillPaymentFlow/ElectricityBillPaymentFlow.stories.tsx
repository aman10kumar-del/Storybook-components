import React from "react";
import type { Meta, StoryFn } from "@storybook/react";

import ElectricityBillPaymentFlow from "./ElectricityBillPaymentFlow";

/**
 * ## Authoring prompt (executed)
 *
 * **Goal:** Interactive Storybook prototype of Paytm-style **electricity bill payment** (India utility funnel).
 *
 * **Research — Paytm (current product pattern):** Entry from Recharge & Pay Bills → Electricity → choose state/board → enter consumer / account ID → Proceed fetches bill → review amount & due date → pick payment mode (UPI / bank / card) → authorize (UPI PIN, etc.) → instant confirmation. Separate path for autopay (profile → Automatic payments). Support copy notes possible delays posting to the board.
 *
 * **Benchmark — PhonePe / Google Pay:** Same high-level funnel (Utilities → Electricity → provider → customer ID → verify outstanding → pay via UPI or cards). Common trust lines: instant app confirmation vs 0–3 days on provider side; card fees sometimes called out.
 *
 * **Repo alignment:** Compose PODS only (`HeaderDefault`, `Card`, `TextField`, `List` / `ListItem`, `Button`, `BottomSheet`, `SectionHeader`, `Alerts`). Mobile shell max-width ~430px, fullscreen story wrapper like Flight booking flow. No production APIs — static boards, simulated fetch delay, fixed demo amount.
 *
 * **Screens:** (1) Home — offer alert, board picker sheet with search, consumer field, recent list, Proceed. (2) Fetching — short wait. (3) Bill details — amount hero, due date, line items, pay CTA. (4) Payment — radio list UPI / balance / card. (5) Success — themed success mark, ref, pay again / receipt.
 */
export default {
  title: "PODS Vertical flows/Recharge & Utilities/Electricity bill payment",
  component: ElectricityBillPaymentFlow,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
<p><strong>Interactive demo</strong> of a utility bill funnel: board selection → consumer number → fetch → bill review → payment method → success. Mirrors the common Paytm / PhonePe / Google Pay electricity flow structure; data is static for Storybook.</p>
`,
      },
    },
  },
} as Meta<typeof ElectricityBillPaymentFlow>;

export const CompleteFlow: StoryFn = () => (
  <div
    style={{
      height: "100vh",
      maxHeight: "100vh",
      boxSizing: "border-box",
      padding: "16px 0",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "var(--surface-level-1)",
    }}
  >
    <div
      style={{
        flex: 1,
        minHeight: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ElectricityBillPaymentFlow />
    </div>
  </div>
);
