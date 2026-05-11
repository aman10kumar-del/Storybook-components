import landingIllustration from "../assets/paytm-emi/landing-page-illustration.png";
import s from "./EmiLoginFormHero.module.scss";

/** Display size 80% of 269×200 (20% smaller than reference). */
const HERO_W = 215;
const HERO_H = 160;

/**
 * Paytm EMI login hero — single illustration.
 */
export function EmiLoginFormHero({ className }: { className?: string }) {
  return (
    <div className={`${s.root} ${className ?? ""}`}>
      <img
        src={landingIllustration}
        alt=""
        className={s.heroImg}
        width={HERO_W}
        height={HERO_H}
        decoding="async"
      />
    </div>
  );
}
