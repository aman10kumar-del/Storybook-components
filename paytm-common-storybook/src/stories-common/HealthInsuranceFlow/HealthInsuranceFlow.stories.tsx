import React from "react";
import type { Meta, StoryFn } from "@storybook/react";

import HealthInsuranceFlow from "./HealthInsuranceFlow";

/**
 * ## Authoring prompt (executed)
 *
 * **Goal:** End-to-end **Health insurance** prototype for Paytm (India): discovery → quote inputs (cover type merged with PIN/age) → plan list & compare → PDP → proposal → pay → confirmation → issuance tracker → policy home → policy detail → claim path → renewal.
 *
 * **Source:** PRD-style UX blueprint (no Figma). **Honest diff:** Static demo data, no APIs; copy is illustrative; claim upload is a stub.
 *
 * **Repo alignment:** PODS-only composition (`HeaderDefault`, `Card`, `List` / `ListItem`, `Button`, `TextField`, `Alerts`, `SectionHeader`, `SegmentedControl`, `Checkbox`, `Badge`). Mobile shell max-width 430px, fullscreen wrapper like other vertical flows.
 */
export default {
  title: "PODS Vertical flows/Insurance/Health insurance — full flow",
  component: HealthInsuranceFlow,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
<p><strong>Interactive demo</strong> of a retail health journey on Paytm: landing, quote (cover type + PIN/age / sum insured via radio list / disclosure), quotes loading, stacked plan cards (12px rhythm), listing & horizontal compare, plan detail with list bleed in card, proposal fields in cards, declarations, payment method, success, issuance timeline, policy hub, downloads/support, cashless vs reimbursement claim stub, claim tracking, renewal premium explainer. Layout follows <code>design.mdc</code> §8.1a / §11 (SectionHeader flush + tight groups, full-width inline Alerts, list bleed). Static data for Storybook.</p>
`,
      },
    },
  },
} as Meta<typeof HealthInsuranceFlow>;

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
      <HealthInsuranceFlow />
    </div>
  </div>
);
