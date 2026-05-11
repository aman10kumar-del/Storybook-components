import { Alerts, SectionHeader } from "@paytm-h5-common/paytm_common_ui";
import { MobilePreviewFrame } from "./MobilePreviewFrame";
import s from "./emiScreens.module.scss";

export function FutureFlowsScreen() {
  return (
    <MobilePreviewFrame>
      <div className={s.flowRoot}>
        <div className={s.flowScroll}>
          <div className={s.page}>
            <div className={s.sectionHeaderTight}>
              <SectionHeader title="Additional EMI flows" size="large" />
              <Alerts
                layout="inline"
                context="notice"
                title="Planned"
                subTitle="Verification, mandate, offers, and post-login journeys will plug in here as you spec them."
                active
              />
            </div>
            <div className={s.plannedBody}>
              <p className={s.heroCardInner} style={{ textAlign: "left" }}>
                Add routes in <code>ScreenRouter.tsx</code> and extend{" "}
                <code>screens.ts</code> when a flow is ready for review.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobilePreviewFrame>
  );
}
