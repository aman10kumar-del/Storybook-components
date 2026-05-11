import { useCallback, useEffect, useState } from "react";
import {
  BottomSheet,
  Button,
  HeaderDefault,
  TextField,
} from "@paytm-h5-common/paytm_common_ui";
import { VisibilityOffIcon, VisibilityOnIcon } from "@paytm-h5-common/paytm_common_ui/icons";
import { useAppScreenSelection } from "../../AppScreenSelectionContext";
import paytmLovesEmiLogo from "../../assets/paytm-emi/paytm-loves-emi-logo.png";
import {
  LOGIN_DETAILS_SCREEN_ID,
  LOGIN_HOME_SCREEN_ID,
  USER_SCREEN_ID,
} from "../../screens";
import { EMI_LOGIN_ASSETS } from "../../screens/emiLoginAssets";
import { EmiLoginFormHero } from "../../screens/EmiLoginFormHero";
import { MOBILE_PREVIEW_SHEET_PORTAL_ID } from "../../screens/MobilePreviewFrame";
import s from "../../screens/loginScreens.module.scss";

type LoginStep = "landing" | "credentials";

export type LoginFlowInitialStep = LoginStep;

/**
 * Paytm EMI login — switches between landing (Paytm / username entry points) and credentials form.
 * Syncs the app left nav when the step changes (sidebar highlights Login Home vs Login with credentials).
 */
export function PaytmEmiLoginFlow({
  initialStep = "landing",
}: {
  initialStep?: LoginFlowInitialStep;
}) {
  const [step, setStep] = useState<LoginStep>(initialStep);
  const setSelectedScreen = useAppScreenSelection();

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    if (!setSelectedScreen) return;
    setSelectedScreen(
      step === "credentials"
        ? LOGIN_DETAILS_SCREEN_ID
        : LOGIN_HOME_SCREEN_ID,
    );
  }, [step, setSelectedScreen]);

  if (step === "credentials") {
    return <PaytmEmiLoginCredentials onBack={() => setStep("landing")} />;
  }
  return (
    <PaytmEmiLoginLanding
      onCredentialsClick={() => setStep("credentials")}
    />
  );
}

function PaytmEmiLoginCredentials({ onBack }: { onBack: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const goToScreen = useAppScreenSelection();

  const passwordTrailing = (
    <span
      role="button"
      tabIndex={0}
      aria-label={showPassword ? "Hide password" : "Show password"}
      aria-pressed={showPassword}
      style={{ cursor: "pointer", display: "inline-flex" }}
      onClick={() => setShowPassword((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setShowPassword((v) => !v);
        }
      }}
    >
      {showPassword ? (
        <VisibilityOffIcon role="presentation" />
      ) : (
        <VisibilityOnIcon role="presentation" />
      )}
    </span>
  );

  return (
    <div className={s.loginCanvas}>
      <div className={s.credentialsHeaderStack}>
        <div className={s.statusSpacer} aria-hidden />
        <div className={s.credentialsLogoRow}>
          <img
            className={s.brandLogoPng}
            src={paytmLovesEmiLogo}
            alt="Paytm EMI"
            width={142}
            height={45}
            decoding="async"
          />
        </div>
        <div className={s.credentialsHeaderPad}>
          <HeaderDefault
            size="medium"
            reserveSpaceForStatusBar={false}
            showBack
            title="Login with credentials"
            onBackClick={onBack}
          />
        </div>
      </div>
      <div className={s.scroll}>
        <div className={`${s.inner} ${s.credentialsFormInner}`}>
          <div className={s.fieldStack}>
            <TextField
              emphasis="high"
              label="Username"
              value={username}
              onChange={setUsername}
              inputProps={{ autoComplete: "username" }}
            />
            <TextField
              emphasis="high"
              label="Password"
              value={password}
              onChange={setPassword}
              TrailingIcon={passwordTrailing}
              inputProps={{
                type: showPassword ? "text" : "password",
                autoComplete: "current-password",
              }}
            />
          </div>

          <Button
            type="filled"
            size="large"
            label="Login and Proceed"
            customClass={s.fullWidth}
            onClick={() => goToScreen?.(USER_SCREEN_ID)}
          />
        </div>
      </div>
      <div className={s.homeIndicator} aria-hidden>
        <div className={s.homeIndicatorBar} />
      </div>
    </div>
  );
}

/**
 * Paytm EMI login — landing step (matches Login Details branding + hero + welcome copy; no marketing tagline).
 */
export function PaytmEmiLoginLanding({
  onCredentialsClick,
}: {
  onCredentialsClick: () => void;
}) {
  const [merchantSheetOpen, setMerchantSheetOpen] = useState(false);
  const closeMerchantSheet = useCallback(() => setMerchantSheetOpen(false), []);

  return (
    <div className={s.loginCanvas}>
      <div className={s.statusSpacer} aria-hidden />
      <div className={s.scroll}>
        <div className={`${s.inner} ${s.loginEnter} ${s.landingBrandInner}`}>
          <div className={s.brandBlock}>
            <img
              className={s.brandLogoPng}
              src={paytmLovesEmiLogo}
              alt="Paytm EMI"
              width={142}
              height={45}
              decoding="async"
            />
          </div>
        </div>

        <div className={`${s.heroBleed} ${s.loginEnterD1}`}>
          <EmiLoginFormHero />
        </div>

        <div className={`${s.inner} ${s.innerAfterHeroBleed} ${s.loginEnterD2}`}>
          <div className={s.landingCopyStack}>
            <div className={s.copyBlock}>
              <h1 className={s.welcomeTitle}>Welcome to Paytm EMI</h1>
              <p
                className={`${s.welcomeSub} ${s.welcomeSubSingleLine}`}
              >
                Find the best EMI offers and save on purchases!
              </p>
            </div>

            <div className={`${s.ctaColumn} ${s.loginEnterD3}`}>
              <div className={s.ctaPair}>
                <Button
                  type="filled"
                  size="large"
                  label="Login Securely via Paytm"
                  LeadingIcon={
                    <img
                      src={EMI_LOGIN_ASSETS.lockIcon}
                      alt=""
                      className={s.lockIconImg}
                      decoding="async"
                    />
                  }
                  customClass={s.fullWidth}
                  onClick={() => setMerchantSheetOpen(true)}
                />
                <Button
                  type="stroke"
                  size="large"
                  label="Login via Username and Password"
                  customClass={s.fullWidth}
                  onClick={onCredentialsClick}
                />
              </div>
              <div className={s.landingLinkWrap}>
                <Button
                  type="link"
                  size="large"
                  label="Explore Offers"
                  onClick={() => undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.homeIndicator} aria-hidden>
        <div className={s.homeIndicatorBar} />
      </div>

      <BottomSheet
        active={merchantSheetOpen}
        triggerClose={closeMerchantSheet}
        attachToElementID={MOBILE_PREVIEW_SHEET_PORTAL_ID}
        customClass={s.merchantSheetDescToActionGap}
        title="You are not Registered as a merchant!"
        description="Your MID hasn't been found. Please try login through username and password"
        primaryButton={{
          label: "Try Again",
          onClick: closeMerchantSheet,
        }}
        secondaryButton={{
          label: "Cancel",
        }}
      />
    </div>
  );
}
