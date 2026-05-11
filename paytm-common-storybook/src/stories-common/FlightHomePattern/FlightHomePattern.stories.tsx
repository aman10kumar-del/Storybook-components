import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import FlightHomePattern from "./FlightHomePattern";

export default {
  title: "PODS Vertical flows/Travel/Flight home",
  component: FlightHomePattern,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
<p><strong>Interactive end-to-end flow:</strong> open <strong>PODS Vertical flows / Travel / Flight booking</strong>.</p>
<h4 style="padding-top:10px;margin-top:0px">Figma</h4>
<p>No single Figma node — pattern demo from the agent Mode&nbsp;A sketch (flight home entry).</p>
<h4 style="padding-top:10px;margin-top:0px">Intent</h4>
<p>User picks route, trip type, dates, and travellers, then searches; sees promos and recent searches; uses bottom nav.</p>
<h4 style="padding-top:10px;margin-top:0px">Match vs intentional</h4>
<ul>
<li><strong>Matches sketch:</strong> header, search card, promo strip, offers row, recent list, bottom nav.</li>
<li><strong>Generic / demo:</strong> copy, dates, offer cards, and nav icons are placeholders; not production Paytm specs.</li>
</ul>
`,
      },
    },
  },
} as Meta<typeof FlightHomePattern>;

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
    <FlightHomePattern
      onBack={action("back")}
      onSwapCities={action("swap cities")}
      onSearchFlights={action("search flights")}
      onSelectRecent={action("recent")}
      onNav={action("nav")}
    />
  </div>
);
