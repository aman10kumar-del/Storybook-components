import React from "react";
import type { Meta, StoryFn } from "@storybook/react";

import FlightBookingFlow from "./FlightBookingFlow";

export default {
  title: "PODS Vertical flows/Travel/Flight booking",
  component: FlightBookingFlow,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
<h4 style="padding-top:10px;margin-top:0px">Interactive demo</h4>
<p>End-to-end <strong>prototype</strong>: search → outbound list → return list (round trip) → fare → traveller form → review → confirmation. Uses BottomSheets for city, date, and traveller pickers. Flight rows use bundled airline tail marks (IATA) and <strong>PODS Badge</strong> for demo social proof / FOMO only — not live data.</p>
<h4 style="padding-top:10px;margin-top:0px">Intent</h4>
<p>Train and test PODS composition and stateful flows in Storybook — not production Paytm Flights.</p>
`,
      },
    },
  },
} as Meta<typeof FlightBookingFlow>;

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
      <FlightBookingFlow />
    </div>
  </div>
);
