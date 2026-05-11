/**
 * Story rasters: Figma MCP exports + `scripts/fetch-passbook-story-assets.py` (3× / sharp sizes).
 * Regenerate when previews look soft or MCP URLs expire (~7 days).
 */
import bankAxis from "./story-assets/bank-axis.png";
import bankIcici from "./story-assets/bank-icici.png";
import bankSbi from "./story-assets/bank-sbi.png";
import graphicAddCircleBlue from "./story-assets/graphic-add-circle-blue.png";
import graphicFooterAddBank from "./story-assets/graphic-footer-add-bank.png";
import graphicFooterCardFace from "./story-assets/graphic-footer-card-face.png";
import graphicFooterCardStand from "./story-assets/graphic-footer-card-stand.png";
import graphicFooterUpiLite from "./story-assets/graphic-footer-upi-lite.png";

export const passbookStoryAssets = {
  bankAxis,
  bankSbi,
  bankIcici,
  graphicAddCircleBlue,
  graphicFooterAddBank,
  graphicFooterCardFace,
  graphicFooterCardStand,
  graphicFooterUpiLite,
} as const;
