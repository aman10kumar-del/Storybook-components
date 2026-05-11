import type { LoginFlowInitialStep } from "../flows/PaytmEmiLogin/PaytmEmiLoginFlow";
import { PaytmEmiLoginFlow } from "../flows/PaytmEmiLogin/PaytmEmiLoginFlow";
import { MobilePreviewFrame } from "./MobilePreviewFrame";

/**
 * Paytm EMI login flow — landing and/or credentials (`initialStep` matches left nav).
 */
export function LoginHomeScreen({
  initialStep = "landing",
}: {
  initialStep?: LoginFlowInitialStep;
}) {
  return (
    <MobilePreviewFrame>
      <PaytmEmiLoginFlow initialStep={initialStep} />
    </MobilePreviewFrame>
  );
}
