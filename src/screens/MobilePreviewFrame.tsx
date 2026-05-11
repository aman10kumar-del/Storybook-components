import type { ReactNode } from "react";
import s from "./MobilePreviewFrame.module.scss";

/** Portal target for PODS BottomSheet inside the 376×812 preview shell (design.mdc §9). */
export const MOBILE_PREVIEW_SHEET_PORTAL_ID = "pods-mobile-sheet-portal";

export function MobilePreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className={s.frame}>
      <div className={s.shell}>
        <div className={s.shellMain}>{children}</div>
        <div
          id={MOBILE_PREVIEW_SHEET_PORTAL_ID}
          className={s.sheetPortal}
          aria-hidden
        />
      </div>
    </div>
  );
}
