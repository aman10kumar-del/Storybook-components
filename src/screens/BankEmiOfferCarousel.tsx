import type { ComponentType, CSSProperties, TransitionEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import {
  BankIcon,
  PaytmFirstCreditCardIcon,
  SavedCardsIcon,
} from "@paytm-h5-common/paytm_common_ui/icons";
import sh from "./storeHomePage.module.scss";

const BANNERS: {
  id: string;
  text: string;
  slideClass: string;
  Icon: ComponentType<{ role?: string; "aria-hidden"?: boolean }>;
}[] = [
  {
    id: "icici",
    text: "No cost EMI on ICICI credit card",
    slideClass: sh.bankBannerSlideIcici,
    Icon: BankIcon,
  },
  {
    id: "hdfc",
    text: "Instant discount — HDFC credit card",
    slideClass: sh.bankBannerSlideHdfc,
    Icon: PaytmFirstCreditCardIcon,
  },
  {
    id: "axis",
    text: "Low cost EMI — Axis credit card",
    slideClass: sh.bankBannerSlideAxis,
    Icon: SavedCardsIcon,
  },
];

/** A, B, C, A′ — A′ matches A for a seamless forward loop. */
const LOOP_SLIDES = [...BANNERS, BANNERS[0]];

/** Time each slide stays visible before advancing. */
const ROTATE_MS = 5000;

export function BankEmiOfferCarousel() {
  const [index, setIndex] = useState(0);
  const [skipTransition, setSkipTransition] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const loopMode = !reduceMotion;
  const slides = loopMode ? LOOP_SLIDES : BANNERS;
  const slideCount = slides.length;
  /** Index of the duplicate first slide (loop seam); only used when `loopMode`. */
  const loopSeamIndex = loopMode ? slideCount - 1 : -1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!loopMode) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        if (i >= loopSeamIndex) return i;
        return i + 1;
      });
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [loopMode, loopSeamIndex]);

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (!loopMode) return;
      if (e.propertyName !== "transform") return;
      if (index !== loopSeamIndex) return;
      setSkipTransition(true);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setSkipTransition(false));
      });
    },
    [index, loopMode, loopSeamIndex],
  );

  const goToDot = useCallback(
    (target: number) => {
      const logical =
        loopMode && index === loopSeamIndex ? 0 : index;
      if (target === logical) return;
      if (!loopMode) {
        setIndex(target);
        return;
      }
      if (index === loopSeamIndex) {
        setSkipTransition(true);
        setIndex(0);
        requestAnimationFrame(() => {
          setIndex(target);
          requestAnimationFrame(() => setSkipTransition(false));
        });
        return;
      }
      setIndex(target);
    },
    [index, loopMode, loopSeamIndex],
  );

  const dotActive =
    loopMode && index === loopSeamIndex ? 0 : index;

  const trackStyle: CSSProperties = {
    width: `${slideCount * 100}%`,
    transform: `translateX(calc(-${index} * 100% / ${slideCount}))`,
    ["--bank-slide-count" as string]: String(slideCount),
  };

  return (
    <div
      className={sh.bankBannerWrap}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bank EMI and card offers"
    >
      <div className={sh.bankBannerViewport}>
        <div
          className={sh.bankBannerTrack}
          data-motion={loopMode && !skipTransition}
          data-skip-transition={skipTransition}
          style={trackStyle}
          onTransitionEnd={loopMode ? handleTransitionEnd : undefined}
        >
          {slides.map((b, i) => {
            const Icon = b.Icon;
            const isClone = loopMode && i === loopSeamIndex;
            const key = isClone ? `${b.id}-loop` : b.id;
            return (
              <div
                key={key}
                className={`${sh.bankBannerSlide} ${b.slideClass}`}
                aria-hidden={i !== index}
              >
                <span className={sh.bankBannerDecor} aria-hidden />
                <span className={sh.bankBannerDecor2} aria-hidden />
                <span className={sh.bankBannerIconWrap} aria-hidden>
                  <Icon />
                </span>
                <p className={sh.bankBannerText}>{b.text}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={sh.bankBannerPagination}
        role="tablist"
        aria-label="Banner slides"
      >
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            type="button"
            role="tab"
            className={sh.bankBannerDot}
            data-active={i === dotActive}
            aria-selected={i === dotActive}
            aria-label={`${b.id} offer, slide ${i + 1} of ${BANNERS.length}`}
            tabIndex={i === dotActive ? 0 : -1}
            onClick={() => goToDot(i)}
          />
        ))}
      </div>
    </div>
  );
}
