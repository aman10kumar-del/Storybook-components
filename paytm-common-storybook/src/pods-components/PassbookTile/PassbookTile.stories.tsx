import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import { ReactComponent as AddIcon } from "../../assets/ultra-icons/system/action/add.svg";
import { getFigmaLinkHTML } from "../../stories-common/utils";

import PassbookAccountTile from "./PassbookAccountTile";
import PassbookGraphicTile from "./PassbookGraphicTile";
import { PassbookTileRow } from "./PassbookTileRow";
import { passbookStoryAssets } from "./passbookStoryAssets";

import storyStyles from "./PassbookTile.stories.module.scss";

const FIGMA_CTA =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6860";
const FIGMA_GRAPHIC =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6869";
const FIGMA_ROW =
  "https://www.figma.com/design/e58GKvGTgkVs6jputDoINS/Design-Standardisation-for-Gen-AI?node-id=252-6915";

const DOCS = `
**Passbook tiles** — horizontal strips on a neutral wash (see **Linked accounts row**).

| Piece | Role |
|-------|------|
| **PassbookAccountTile** | Bank row: logo, title, subtitle, bottom slot = **CTA** → **PODS Button \`loading\`** (dot loader) → **balance** (PIN / navigation is **outside** this component). |
| **PassbookGraphicTile** | Promo / add flow: centered icon + label, optional **full-bleed** footer slot for art. |
| **PassbookTileRow** | Parent **horizontal scroll** when many tiles (\`overflow-x: auto\`, gap token). |

**Story assets** — run \`python3 scripts/fetch-passbook-story-assets.py\` from \`paytm-common-storybook\` after refreshing Figma MCP asset URLs (they expire ~weekly).
`;

const BankLogo: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img src={src} alt={alt} className={storyStyles.bankLogo} />
);

const meta: Meta<typeof PassbookAccountTile> = {
  title: "PODS Components - New/PassbookTile",
  component: PassbookAccountTile,
  parameters: {
    docs: {
      description: {
        component: `${getFigmaLinkHTML(FIGMA_ROW, "Figma — Passbook / linked accounts strip")}${DOCS}`,
      },
    },
  },
};

export default meta;

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={storyStyles.wash}>{children}</div>
);

export const AccountTileCta: StoryFn = () => (
  <Shell>
    <PassbookAccountTile
      title="Axis Bank"
      subtitle="A/c No - 2334"
      leading={
        <BankLogo src={passbookStoryAssets.bankAxis} alt="Axis Bank" />
      }
      actionState="cta"
      ctaLabel="Check Balance"
      onCtaClick={action("onCtaClick")}
    />
  </Shell>
);
AccountTileCta.storyName = "Account tile — CTA";
AccountTileCta.parameters = {
  docs: {
    description: {
      story: getFigmaLinkHTML(FIGMA_CTA, "Figma — Global / Tile (CTA)"),
    },
  },
};

export const AccountTileLoading: StoryFn = () => (
  <Shell>
    <PassbookAccountTile
      title="Axis Bank"
      subtitle="A/c No - 2334"
      leading={
        <BankLogo src={passbookStoryAssets.bankAxis} alt="Axis Bank" />
      }
      actionState="loading"
    />
  </Shell>
);
AccountTileLoading.storyName = "Account tile — loading (Button loader)";

export const AccountTileBalance: StoryFn = () => (
  <Shell>
    <PassbookAccountTile
      title="Axis Bank"
      subtitle="A/c No - 2334"
      leading={
        <BankLogo src={passbookStoryAssets.bankAxis} alt="Axis Bank" />
      }
      actionState="balance"
      balanceText="₹24,180.50"
    />
  </Shell>
);
AccountTileBalance.storyName = "Account tile — balance (happy case)";

export const AccountTileInteractive: StoryFn = () => {
  const [state, setState] = useState<"cta" | "loading" | "balance">("cta");

  return (
    <Shell>
      <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--text-neutral-moderate)" }}>
        Simulates CTA → Button loading → balance (PIN screen is not shown — wire your own flow).
      </p>
      <PassbookAccountTile
        title="Axis Bank"
        subtitle="A/c No - 2334"
        leading={
          <BankLogo src={passbookStoryAssets.bankAxis} alt="Axis Bank" />
        }
        actionState={state}
        balanceText="₹24,180.50"
        onCtaClick={() => {
          action("onCtaClick")();
          setState("loading");
          window.setTimeout(() => setState("balance"), 1200);
        }}
      />
      <button
        type="button"
        style={{ marginTop: 12, fontSize: 13 }}
        onClick={() => setState("cta")}
      >
        Reset
      </button>
    </Shell>
  );
};
AccountTileInteractive.storyName = "Account tile — interactive demo";

const graphicLeading = (
  <div className={storyStyles.graphicAddLeading}>
    <img
      src={passbookStoryAssets.graphicAddCircleBlue}
      alt=""
      className={storyStyles.graphicAddCircleImg}
    />
    <span className={storyStyles.graphicAddIcon}>
      <AddIcon aria-hidden />
    </span>
  </div>
);

const AddCardFooter: React.FC = () => (
  <div className={storyStyles.footerCardComposite}>
    <img
      src={passbookStoryAssets.graphicFooterCardStand}
      alt=""
      className={storyStyles.footerCardStand}
    />
    <img
      src={passbookStoryAssets.graphicFooterCardFace}
      alt=""
      className={storyStyles.footerCardFace}
    />
  </div>
);

const UpiLiteFooter: React.FC = () => (
  <div className={storyStyles.upiLiteFooter}>
    <div className={storyStyles.upiLitePhone}>
      <img src={passbookStoryAssets.graphicFooterUpiLite} alt="" />
    </div>
  </div>
);

export const GraphicTile: StoryFn = () => (
  <Shell>
    <PassbookGraphicTile
      label={"Activate UPI\nLite"}
      leading={graphicLeading}
      footer={<UpiLiteFooter />}
      onClick={action("onGraphicTileClick")}
    />
  </Shell>
);
GraphicTile.storyName = "Graphic tile — full-bleed footer slot";
GraphicTile.parameters = {
  docs: {
    description: {
      story: getFigmaLinkHTML(FIGMA_GRAPHIC, "Figma — Global / Tile / Graphic"),
    },
  },
};

export const LinkedAccountsRow: StoryFn = () => (
  <Shell>
    <PassbookTileRow>
      <PassbookAccountTile
        title="Axis Bank"
        subtitle="A/c No - 2334"
        leading={
          <BankLogo src={passbookStoryAssets.bankAxis} alt="Axis Bank" />
        }
        actionState="cta"
        onCtaClick={action("axis")}
      />
      <PassbookAccountTile
        title="SBI Bank"
        subtitle="A/c No - 2334"
        leading={<BankLogo src={passbookStoryAssets.bankSbi} alt="SBI Bank" />}
        actionState="cta"
        onCtaClick={action("sbi")}
      />
      <PassbookAccountTile
        title="ICICI Bank"
        subtitle="A/c No - 2334"
        leading={
          <BankLogo src={passbookStoryAssets.bankIcici} alt="ICICI Bank" />
        }
        actionState="cta"
        onCtaClick={action("icici")}
      />
      <PassbookGraphicTile
        label={"Add Rupay\nCredit Card"}
        leading={graphicLeading}
        footer={<AddCardFooter />}
        onClick={action("addCard")}
      />
      <PassbookGraphicTile
        label={"Add Bank\nAccount"}
        leading={graphicLeading}
        footer={
          <img
            src={passbookStoryAssets.graphicFooterAddBank}
            alt=""
            className={storyStyles.graphicFooterAsset}
          />
        }
        onClick={action("addBank")}
      />
      <PassbookGraphicTile
        label={"Activate UPI\nLite"}
        leading={graphicLeading}
        footer={<UpiLiteFooter />}
        onClick={action("upiLite")}
      />
    </PassbookTileRow>
  </Shell>
);
LinkedAccountsRow.storyName = "Linked accounts row (horizontal scroll)";
LinkedAccountsRow.parameters = {
  docs: {
    description: {
      story: getFigmaLinkHTML(FIGMA_ROW, "Figma — Passbook / Linked Accounts"),
    },
  },
};
