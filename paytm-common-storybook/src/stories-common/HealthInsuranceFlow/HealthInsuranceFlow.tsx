import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Alerts from "../../pods-components/Alerts/Alerts";
import Badge from "../../pods-components/Badge/Badge";
import Button from "../../pods-components/Button/Button";
import Card from "../../pods-components/Card/Card";
import Checkbox from "../../pods-components/Checkbox/Checkbox";
import { HeaderDefault } from "../../pods-components/Header/Header";
import List from "../../pods-components/List/List";
import ListItem from "../../pods-components/List/ListItem";
import SectionHeader from "../../pods-components/SectionHeader/SectionHeader";
import SegmentedControl from "../../pods-components/SegmentedControl/SegmentedControl";
import TextField from "../../pods-components/TextField/TextField";
import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { ReactComponent as InfoIcon } from "../../assets/ultra-icons/system/action/info.svg";
import { ReactComponent as PendingThemedIcon } from "../../assets/ultra-icons/system/status/pending_themed.svg";
import { ReactComponent as SuccessThemedIcon } from "../../assets/ultra-icons/system/status/success_themed.svg";
import { ReactComponent as TxnSuccessThemed } from "../../assets/ultra-icons/system/status/txn_success_themed.svg";

import s from "./HealthInsuranceFlow.module.scss";

type Step =
  | "landing"
  | "quoteProfile"
  | "quoteSi"
  | "quoteHealth"
  | "quoteLoading"
  | "planList"
  | "planCompare"
  | "planDetail"
  | "proposal"
  | "review"
  | "payment"
  | "confirmation"
  | "issuanceTracker"
  | "policyHome"
  | "policyDetail"
  | "claimType"
  | "claimDocs"
  | "claimTrack"
  | "renewal";

type PayMethod = "upi" | "balance" | "card";
type ClaimPath = "cashless" | "reimbursement";

type PlanDef = {
  id: string;
  name: string;
  insurer: string;
  premiumAnnual: number;
  sumInsured: number;
  roomRent: string;
  cashlessCity: number;
  waitingPed: string;
  ncb: string;
  maternity: string;
  badge?: string;
  badgeContext?: "primary" | "notice" | "positive";
  recommended?: boolean;
  /** Demo-only social proof (Storybook). */
  rating: string;
  ratingsLabel: string;
  soldYtdLabel: string;
  offerEndsLabel: string;
  viewedLabel: string;
};

const PAY_RADIO = "health-insurance-pay-method";
const CLAIM_RADIO = "health-insurance-claim-type";
const SI_RADIO = "health-insurance-sum-insured";

const alertLeadingPrimary = <InfoIcon aria-hidden />;
const alertLeadingNotice = <PendingThemedIcon aria-hidden />;
const alertLeadingPositive = <SuccessThemedIcon aria-hidden />;

const PLANS: PlanDef[] = [
  {
    id: "gold",
    name: "Gold Family Floater",
    insurer: "Demo Health Insurance Co.",
    premiumAnnual: 12840,
    sumInsured: 10_00_000,
    roomRent: "Single private — up to SI",
    cashlessCity: 186,
    waitingPed: "3 years (declared conditions)",
    ncb: "10% / yr, max 50%",
    maternity: "After 2 yr wait",
    badge: "Best value",
    badgeContext: "positive",
    recommended: true,
    rating: "4.6",
    ratingsLabel: "2.1k ratings",
    soldYtdLabel: "9.4k sold YTD",
    offerEndsLabel: "Ends in 2d",
    viewedLabel: "12 viewed",
  },
  {
    id: "silver",
    name: "Silver Secure",
    insurer: "Sample General Insurance",
    premiumAnnual: 9420,
    sumInsured: 10_00_000,
    roomRent: "1% of SI cap",
    cashlessCity: 124,
    waitingPed: "4 years (PED)",
    ncb: "5% / yr, max 25%",
    maternity: "Not covered",
    badge: "Lower premium",
    badgeContext: "primary",
    rating: "4.4",
    ratingsLabel: "1.8k ratings",
    soldYtdLabel: "7.2k sold YTD",
    offerEndsLabel: "Ends in 5d",
    viewedLabel: "8 viewed",
  },
  {
    id: "platinum",
    name: "Platinum Plus",
    insurer: "Demo Health Insurance Co.",
    premiumAnnual: 16890,
    sumInsured: 15_00_000,
    roomRent: "Any room — up to SI",
    cashlessCity: 210,
    waitingPed: "2 years (PED)",
    ncb: "15% / yr, max 50%",
    maternity: "After 1 yr wait",
    badge: "Wider cover",
    badgeContext: "notice",
    rating: "4.7",
    ratingsLabel: "3.0k ratings",
    soldYtdLabel: "11k sold YTD",
    offerEndsLabel: "Ends in 1d",
    viewedLabel: "18 viewed",
  },
];

function roomRentShort(roomRent: string) {
  const part = roomRent.split(/[—–-]/)[0];
  return (part ?? roomRent).trim();
}

const FETCH_MS = 1000;

const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const formatSi = (n: number) => {
  const lakhs = n / 1_00_000;
  return `₹${lakhs} Lakh`;
};

function planById(id: string): PlanDef | undefined {
  return PLANS.find((p) => p.id === id);
}

const HealthInsuranceFlow: React.FC = () => {
  const fetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState<Step>("landing");
  const [coverType, setCoverType] = useState<"individual" | "family">("family");
  const [pin, setPin] = useState("560001");
  const [age, setAge] = useState("34");
  const [dependents, setDependents] = useState("Spouse + 1 child");
  const [siLakh, setSiLakh] = useState<5 | 10 | 15>(10);
  const [tobacco, setTobacco] = useState(false);
  const [ped, setPed] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("gold");
  const [proposerName, setProposerName] = useState("Rahul K.");
  const [email, setEmail] = useState("rahul.k@email.com");
  const [nomineeName, setNomineeName] = useState("Neha K.");
  const [nomineeRelation, setNomineeRelation] = useState("Spouse");
  const [decl1, setDecl1] = useState<"true" | "false">("false");
  const [decl2, setDecl2] = useState<"true" | "false">("false");
  const [payMethod, setPayMethod] = useState<PayMethod>("upi");
  const [claimPath, setClaimPath] = useState<ClaimPath>("cashless");

  const applicationId = "PAYTM-HI-2404138821";
  const policyNo = "DHIC-25-HE-883921";

  const selectedPlan = useMemo(
    () => planById(selectedPlanId) ?? PLANS[0],
    [selectedPlanId],
  );

  const clearFetchTimer = useCallback(() => {
    if (fetchTimerRef.current != null) {
      clearTimeout(fetchTimerRef.current);
      fetchTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearFetchTimer(), [clearFetchTimer]);

  const resetFlow = useCallback(() => {
    clearFetchTimer();
    setStep("landing");
    setCoverType("family");
    setPin("560001");
    setAge("34");
    setDependents("Spouse + 1 child");
    setSiLakh(10);
    setTobacco(false);
    setPed(false);
    setSelectedPlanId("gold");
    setProposerName("Rahul K.");
    setEmail("rahul.k@email.com");
    setNomineeName("Neha K.");
    setNomineeRelation("Spouse");
    setDecl1("false");
    setDecl2("false");
    setPayMethod("upi");
    setClaimPath("cashless");
  }, [clearFetchTimer]);

  const goBack = useCallback(() => {
    switch (step) {
      case "landing":
        return;
      case "quoteProfile":
        setStep("landing");
        return;
      case "quoteSi":
        setStep("quoteProfile");
        return;
      case "quoteHealth":
        setStep("quoteSi");
        return;
      case "quoteLoading":
        clearFetchTimer();
        setStep("quoteHealth");
        return;
      case "planList":
        setStep("quoteHealth");
        return;
      case "planCompare":
        setStep("planList");
        return;
      case "planDetail":
        setStep("planList");
        return;
      case "proposal":
        setStep("planDetail");
        return;
      case "review":
        setStep("proposal");
        return;
      case "payment":
        setStep("review");
        return;
      case "confirmation":
        setStep("payment");
        return;
      case "issuanceTracker":
        setStep("confirmation");
        return;
      case "policyHome":
        resetFlow();
        return;
      case "policyDetail":
        setStep("policyHome");
        return;
      case "claimType":
        setStep("policyHome");
        return;
      case "claimDocs":
        setStep("claimType");
        return;
      case "claimTrack":
        setStep("claimDocs");
        return;
      case "renewal":
        setStep("policyHome");
        return;
      default:
        return;
    }
  }, [clearFetchTimer, resetFlow, step]);

  const startQuoteLoad = () => {
    setStep("quoteLoading");
    clearFetchTimer();
    fetchTimerRef.current = setTimeout(() => {
      fetchTimerRef.current = null;
      setStep("planList");
    }, FETCH_MS);
  };

  const canProfile =
    pin.trim().length >= 6 && age.trim().length >= 1 && Number(age) >= 18;
  const canProposal =
    proposerName.trim().length >= 2 &&
    email.includes("@") &&
    nomineeName.trim().length >= 2 &&
    nomineeRelation.trim().length >= 1;
  const canReview = decl1 === "true" && decl2 === "true";

  const headerTitle = useMemo(() => {
    const titles: Record<Step, string> = {
      landing: "Health insurance",
      quoteProfile: "Your details",
      quoteSi: "Cover amount",
      quoteHealth: "Health disclosure",
      quoteLoading: "Fetching quotes",
      planList: "Recommended for you",
      planCompare: "Compare plans",
      planDetail: "Plan details",
      proposal: "Proposer details",
      review: "Review & declare",
      payment: "Pay premium",
      confirmation: "Payment successful",
      issuanceTracker: "Policy status",
      policyHome: "My health cover",
      policyDetail: "Policy",
      claimType: "Start a claim",
      claimDocs: "Upload documents",
      claimTrack: "Claim status",
      renewal: "Renew policy",
    };
    return titles[step];
  }, [step]);

  const headerSub = useMemo(() => {
    switch (step) {
      case "landing":
        return "Compare · Buy · Claim — on Paytm";
      case "quoteProfile":
        return "Cover type, PIN & age";
      case "quoteSi":
        return "Sum insured (indicative)";
      case "quoteHealth":
        return "Honest answers protect your claim";
      case "quoteLoading":
        return "Matching licensed insurers (demo)";
      case "planList":
        return `${formatSi(siLakh * 1_00_000)} · PIN ${pin}`;
      case "planCompare":
        return "Up to 3 plans side by side";
      case "planDetail":
        return selectedPlan.insurer;
      case "proposal":
        return "As per proposal form";
      case "review":
        return "Please read before you pay";
      case "payment":
        return formatInr(selectedPlan.premiumAnnual);
      case "confirmation":
        return applicationId;
      case "issuanceTracker":
        return "We will notify you when ready";
      case "policyHome":
        return "Active policies";
      case "policyDetail":
        return policyNo;
      case "claimType":
        return "Cashless or reimbursement";
      case "claimDocs":
        return "Bills, discharge summary, ID";
      case "claimTrack":
        return "CLM-2026-009821";
      case "renewal":
        return `Due 12 May 2026 · ${formatInr(selectedPlan.premiumAnnual + 420)}`;
      default:
        return "";
    }
  }, [applicationId, pin, policyNo, selectedPlan.insurer, selectedPlan.premiumAnnual, siLakh, step]);

  const showBack = step !== "confirmation";

  const renderLanding = () => (
    <div className={`${s.page} ${s.pageFirstHero}`}>
      <div className={s.heroBlock}>
        <h1 className={s.heroTitle}>Cover hospital bills with trusted insurers</h1>
        <p className={s.heroSub}>
          See plans for your city, compare benefits, pay with UPI — then manage policy and claims in one place.
        </p>
        <p className={s.trustFoot}>
          Paytm is a registered insurance intermediary. Policies are issued by licensed insurers. Final terms apply.
        </p>
      </div>
      <Alerts
        active
        layout="inline"
        context="primary"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPrimary}
        title="Tax season"
        subTitle="Section 80D may apply — consult your CA (demo nudge)."
      />
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Why Paytm" customClass={s.sectionHeaderFlushH} />
        <Card>
          <List customClass={s.listBleedInCard}>
            <ListItem
              id="w1"
              primary="UPI & saved cards"
              secondary="Checkout with the same Paytm you already use"
              separator
              trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
              onClick={() => undefined}
            />
            <ListItem
              id="w2"
              primary="Reminders"
              secondary="Renewal and document alerts on your phone"
              separator={false}
              trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
              onClick={() => undefined}
            />
          </List>
        </Card>
      </div>
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Get quote" onClick={() => setStep("quoteProfile")} />
        <Button type="stroke" size="large" label="View my policies" onClick={() => setStep("policyHome")} />
      </div>
    </div>
  );

  const renderQuoteProfile = () => (
    <div className={s.page}>
      <Alerts
        active
        layout="inline"
        context="notice"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingNotice}
        title="Family floater"
        subTitle="One cover shared by named members — one premium, one renewal. Switch below if you only need cover for yourself."
      />
      <Card>
        <p className={s.inCardSectionTitle}>Who are you covering?</p>
        <p className={s.inCardHelp}>
          Individual insures one person. Family floater shares the sum insured across everyone on the policy.
        </p>
        <div className={s.segmentWrap}>
          <SegmentedControl
            controlType="controlled"
            controlled={{ activeTabID: coverType }}
            tabs={[
              { id: "individual", title: "Individual" },
              { id: "family", title: "Family floater" },
            ]}
            onChange={(tab) => setCoverType(tab.id as "individual" | "family")}
          />
        </div>
      </Card>
      <Card>
        <div className={s.cardFieldStack}>
          <TextField
            label="PIN code"
            value={pin}
            onChange={setPin}
            emphasis="high"
            assistiveText="Helps show cashless hospitals near you (demo)."
            inputProps={{ inputMode: "numeric", maxLength: 6 }}
          />
          <TextField
            label="Your age"
            value={age}
            onChange={setAge}
            emphasis="high"
            inputProps={{ inputMode: "numeric" }}
          />
          {coverType === "family" && (
            <TextField
              label="Members to cover"
              value={dependents}
              onChange={setDependents}
              emphasis="high"
              assistiveText="Example: Spouse + 2 children — final list on proposal."
            />
          )}
        </div>
      </Card>
      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label="Continue"
          disabled={!canProfile}
          onClick={() => setStep("quoteSi")}
        />
      </div>
    </div>
  );

  const renderQuoteSi = () => (
    <div className={s.page}>
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Sum insured" customClass={s.sectionHeaderFlushH} />
        <Card>
          <List customClass={s.listBleedInCard}>
            {([5, 10, 15] as const).map((lk, i, arr) => (
              <ListItem
                key={lk}
                id={`si-${lk}`}
                primary={formatSi(lk * 1_00_000)}
                secondary="Tap to select sum insured"
                separator={i < arr.length - 1}
                onClick={() => setSiLakh(lk)}
                leading={{
                  type: "radio",
                  radio: {
                    name: SI_RADIO,
                    value: String(lk),
                    checked: siLakh === lk,
                    onChecked: () => setSiLakh(lk),
                  },
                }}
              />
            ))}
          </List>
        </Card>
      </div>
      <Alerts
        active
        layout="inline"
        context="primary"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPrimary}
        title="Indicative only"
        subTitle="Final sum insured and premium depend on insurer rules and underwriting."
      />
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Continue" onClick={() => setStep("quoteHealth")} />
      </div>
    </div>
  );

  const renderQuoteHealth = () => (
    <div className={s.page}>
      <Card>
        <div className={s.declarationStack}>
          <Checkbox
            id="hi-tobacco"
            label="Anyone to be insured uses tobacco or nicotine products"
            checked={tobacco ? "true" : "false"}
            onChange={(c) => setTobacco(c === "true")}
            emphasis="high"
          />
          <Checkbox
            id="hi-ped"
            label="Anyone to be insured has a pre-existing disease (diagnosis / treatment as per proposal form)"
            checked={ped ? "true" : "false"}
            onChange={(c) => setPed(c === "true")}
            emphasis="high"
          />
        </div>
      </Card>
      <Alerts
        active
        layout="inline"
        context="notice"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingNotice}
        title="Why we ask"
        subTitle="Insurers use this for fair pricing. Non-disclosure can affect claims later."
      />
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="See quotes" onClick={startQuoteLoad} />
      </div>
    </div>
  );

  const renderQuoteLoading = () => (
    <div className={s.page}>
      <div className={s.fetchingBody}>
        <p className={s.fetchingTitle}>Finding plans for your profile</p>
        <p className={s.fetchingSub}>
          Checking premiums, room rent rules, and hospital networks for your PIN (demo delay).
        </p>
        <Button type="stroke" size="medium" label="Cancel" onClick={goBack} />
      </div>
    </div>
  );

  const renderPlanList = () => (
    <div className={s.page}>
      <Alerts
        active
        layout="inline"
        context="positive"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPositive}
        title="Recommended"
        subTitle={`Based on ${coverType === "family" ? "family floater" : "individual"} · ${formatSi(siLakh * 1_00_000)}.`}
      />
      <div className={s.compareToolbar}>
        <Button type="stroke" size="medium" label="Compare all plans" onClick={() => setStep("planCompare")} />
      </div>
      <div className={s.planCardStack}>
        {PLANS.map((p) => (
          <Card key={p.id}>
            <div className={s.planCardTop}>
              <div className={s.planTitles}>
                <p className={s.planName}>{p.name}</p>
                <p className={s.planInsurer}>{p.insurer}</p>
              </div>
              {p.badge && (
                <Badge label={p.badge} context={p.badgeContext ?? "primary"} shape="normal" />
              )}
            </div>
            <p className={s.planSocialLine}>
              ★{p.rating} · {p.ratingsLabel} · {p.soldYtdLabel} (demo)
            </p>
            <p className={s.planSocialFomo}>
              Popular for PIN {pin} · {p.cashlessCity}+ cashless hospitals (demo)
            </p>
            <div className={s.planPremiumRow}>
              <span className={s.planPremiumMain}>{formatInr(p.premiumAnnual)} / yr</span>
              <span className={s.planFomoMeta}>
                {p.offerEndsLabel} · {p.viewedLabel} (demo)
              </span>
            </div>
            <p className={s.planCompactFacts}>
              {formatSi(p.sumInsured)} · {roomRentShort(p.roomRent)} · Strong cashless network (demo)
            </p>
            <div className={s.planCardCta}>
              <Button
                type="tonal"
                size="small"
                label="View details"
                onClick={() => {
                  setSelectedPlanId(p.id);
                  setStep("planDetail");
                }}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const compareRows: { label: string; pick: (p: PlanDef) => string }[] = [
    { label: "Premium / yr", pick: (p) => formatInr(p.premiumAnnual) },
    { label: "Sum insured", pick: (p) => formatSi(p.sumInsured) },
    { label: "Room rent", pick: (p) => p.roomRent },
    { label: "Cashless (city)", pick: (p) => `${p.cashlessCity}+ hospitals` },
    { label: "PED wait", pick: (p) => p.waitingPed },
    { label: "Maternity", pick: (p) => p.maternity },
    { label: "NCB", pick: (p) => p.ncb },
  ];

  const renderPlanCompare = () => (
    <div className={s.page}>
      <Alerts
        active
        layout="inline"
        context="primary"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPrimary}
        title="Key differences"
        subTitle="Tap a plan to read wordings and exclusions before you buy."
      />
      <div className={s.compareStrip}>
        {PLANS.map((p) => (
          <Card key={p.id} customClass={s.compareCol}>
            <p className={s.compareHead}>{p.name}</p>
            <div className={s.compareRows}>
              {compareRows.map((row) => (
                <p key={row.label} className={s.compareRow}>
                  {row.label}
                  <span className={s.compareVal}>{row.pick(p)}</span>
                </p>
              ))}
            </div>
            <div className={s.cardActions}>
              <Button
                type="filled"
                size="large"
                label="Choose"
                onClick={() => {
                  setSelectedPlanId(p.id);
                  setStep("planDetail");
                }}
              />
            </div>
          </Card>
        ))}
      </div>
      <div className={s.footerActions}>
        <Button type="stroke" size="large" label="Back to list" onClick={() => setStep("planList")} />
      </div>
    </div>
  );

  const renderPlanDetail = () => (
    <div className={s.page}>
      <Card>
        <div className={s.planCardTop}>
          <div className={s.planTitles}>
            <p className={s.planDetailName}>{selectedPlan.name}</p>
            <p className={s.planInsurer}>{selectedPlan.insurer}</p>
          </div>
          {selectedPlan.badge && (
            <Badge
              label={selectedPlan.badge}
              context={selectedPlan.badgeContext ?? "primary"}
              shape="normal"
            />
          )}
        </div>
        <p className={s.planPremium}>{formatInr(selectedPlan.premiumAnnual)} / yr</p>
        <div className={s.reviewBlock}>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Sum insured</span>
            <span className={s.reviewVal}>{formatSi(selectedPlan.sumInsured)}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Cashless hospitals</span>
            <span className={s.reviewVal}>{selectedPlan.cashlessCity}+ in your area</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Room rent</span>
            <span className={s.reviewVal}>{selectedPlan.roomRent}</span>
          </div>
        </div>
      </Card>
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Included" customClass={s.sectionHeaderFlushH} />
        <Card>
          <List customClass={s.listBleedInCard}>
            <ListItem id="b1" primary="In-patient hospitalisation" secondary="As per policy wordings" separator />
            <ListItem id="b2" primary="Day care procedures" secondary="Listed procedures only" separator />
            <ListItem id="b3" primary="Pre & post hospitalisation" secondary="60 / 90 days (demo)" separator={false} />
          </List>
        </Card>
      </div>
      <Alerts
        active
        layout="inline"
        context="notice"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingNotice}
        title="Exclusions apply"
        subTitle="Cosmetic, war, self-harm, undisclosed PED — see policy document for full list."
      />
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Buy this plan" onClick={() => setStep("proposal")} />
        <Button type="stroke" size="large" label="Compare again" onClick={() => setStep("planCompare")} />
      </div>
    </div>
  );

  const renderProposal = () => (
    <div className={s.page}>
      <Card>
        <div className={s.cardFieldStack}>
          <TextField label="Proposer name" value={proposerName} onChange={setProposerName} emphasis="high" />
          <TextField
            label="Email"
            value={email}
            onChange={setEmail}
            emphasis="high"
            inputProps={{ autoComplete: "email" }}
          />
        </div>
      </Card>
      <Card>
        <p className={s.inCardSectionTitle}>Nominee</p>
        <div className={s.cardFieldStack}>
          <TextField label="Nominee full name" value={nomineeName} onChange={setNomineeName} emphasis="high" />
          <TextField label="Relationship" value={nomineeRelation} onChange={setNomineeRelation} emphasis="high" />
        </div>
      </Card>
      <Alerts
        active
        layout="inline"
        context="primary"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPrimary}
        title="KYC"
        subTitle="CKYC or OTP verification may be required by the insurer above certain limits (demo)."
      />
      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label="Review application"
          disabled={!canProposal}
          onClick={() => setStep("review")}
        />
      </div>
    </div>
  );

  const renderReview = () => (
    <div className={s.page}>
      <Card>
        <div className={s.reviewBlock}>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Plan</span>
            <span className={s.reviewVal}>{selectedPlan.name}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Premium</span>
            <span className={s.reviewVal}>{formatInr(selectedPlan.premiumAnnual)}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Proposer</span>
            <span className={s.reviewVal}>{proposerName}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Nominee</span>
            <span className={s.reviewVal}>
              {nomineeName} ({nomineeRelation})
            </span>
          </div>
        </div>
      </Card>
      <Card>
        <div className={s.declarationStack}>
          <Checkbox
            id="hi-decl-1"
            label="I confirm details are true to the best of my knowledge. I have read the sales brochure / benefits (demo)."
            checked={decl1}
            onChange={(c) => setDecl1(c as "true" | "false")}
            emphasis="high"
          />
          <Checkbox
            id="hi-decl-2"
            label="I agree to share data with the insurer for underwriting and servicing as per applicable law."
            checked={decl2}
            onChange={(c) => setDecl2(c as "true" | "false")}
            emphasis="high"
          />
        </div>
      </Card>
      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label={`Pay ${formatInr(selectedPlan.premiumAnnual)}`}
          disabled={!canReview}
          onClick={() => setStep("payment")}
        />
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className={s.page}>
      <Card>
        <List customClass={s.listBleedInCard}>
          <ListItem
            id="m-upi"
            primary="UPI"
            secondary="Paytm UPI — instant"
            separator
            onClick={() => setPayMethod("upi")}
            leading={{
              type: "radio",
              radio: {
                name: PAY_RADIO,
                value: "upi",
                checked: payMethod === "upi",
                onChecked: () => setPayMethod("upi"),
              },
            }}
          />
          <ListItem
            id="m-balance"
            primary="Paytm balance"
            secondary="Available ₹1,240"
            separator
            onClick={() => setPayMethod("balance")}
            leading={{
              type: "radio",
              radio: {
                name: PAY_RADIO,
                value: "balance",
                checked: payMethod === "balance",
                onChecked: () => setPayMethod("balance"),
              },
            }}
          />
          <ListItem
            id="m-card"
            primary="Debit / Credit card"
            secondary="May include convenience fee"
            separator={false}
            onClick={() => setPayMethod("card")}
            leading={{
              type: "radio",
              radio: {
                name: PAY_RADIO,
                value: "card",
                checked: payMethod === "card",
                onChecked: () => setPayMethod("card"),
              },
            }}
          />
        </List>
      </Card>
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Pay securely" onClick={() => setStep("confirmation")} />
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className={s.page}>
      <div className={s.successPanel}>
        <TxnSuccessThemed className={s.successIcon} aria-hidden />
        <h2 className={s.successTitle}>Premium received</h2>
        <p className={s.successSub}>
          {selectedPlan.name} · Application {applicationId}
        </p>
        <span className={s.refPill}>Policy usually issued within 24–48 hours</span>
      </div>
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Track policy" onClick={() => setStep("issuanceTracker")} />
        <Button type="stroke" size="large" label="Go to home" onClick={() => setStep("policyHome")} />
      </div>
    </div>
  );

  const renderIssuanceTracker = () => (
    <div className={s.page}>
      <Card>
        <div className={s.timeline}>
          <div className={s.timelineItem}>
            <span className={s.timelineDot} aria-hidden />
            <div className={s.timelineBody}>
              <p className={s.timelineTitle}>Payment confirmed</p>
              <p className={s.timelineSub}>Just now · {formatInr(selectedPlan.premiumAnnual)}</p>
            </div>
          </div>
          <div className={s.timelineItem}>
            <span className={s.timelineDot} aria-hidden />
            <div className={s.timelineBody}>
              <p className={s.timelineTitle}>Underwriting in progress</p>
              <p className={s.timelineSub}>Insurer may request documents — we will notify you.</p>
            </div>
          </div>
          <div className={s.timelineItem}>
            <span className={`${s.timelineDot} ${s.timelineDotMuted}`} aria-hidden />
            <div className={s.timelineBody}>
              <p className={s.timelineTitle}>Policy document</p>
              <p className={s.timelineSub}>E-policy to email + PDF in My policies</p>
            </div>
          </div>
        </div>
      </Card>
      <Alerts
        active
        layout="inline"
        context="notice"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingNotice}
        title="If additional information is needed"
        subTitle="Upload from this screen when we ping you (demo copy)."
      />
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Open my policies" onClick={() => setStep("policyHome")} />
      </div>
    </div>
  );

  const renderPolicyHome = () => (
    <div className={s.page}>
      <Card>
        <div className={s.policyCardTitleRow}>
          <p className={s.policyCardTitle}>{selectedPlan.name}</p>
          <Badge
            label={formatSi(selectedPlan.sumInsured)}
            context="primary"
            shape="normal"
            customClass={s.policySiBadge}
          />
        </div>
        <p className={s.policyStatusLine}>Active · Expires 12 May 2026</p>
        <div className={s.policyCardFacts}>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Policy</span>
            <span className={s.reviewVal}>{policyNo}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Insurer</span>
            <span className={s.reviewVal}>{selectedPlan.insurer}</span>
          </div>
        </div>
      </Card>
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Quick actions" customClass={s.sectionHeaderFlushH} />
        <Card>
          <List customClass={s.listBleedInCard}>
          <ListItem
            id="qa1"
            primary="Policy details & downloads"
            secondary="Wordings, tax certificate"
            separator
            onClick={() => setStep("policyDetail")}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
          <ListItem
            id="qa2"
            primary="File a claim"
            secondary="Cashless or reimbursement"
            separator
            onClick={() => setStep("claimType")}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
          <ListItem
            id="qa3"
            primary="Renew policy"
            secondary="Premium may change with age band"
            separator={false}
            onClick={() => setStep("renewal")}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
        </List>
        </Card>
      </div>
      <div className={s.footerActions}>
        <Button
          type="stroke"
          size="large"
          label="Get another quote"
          onClick={() => {
            resetFlow();
            setStep("quoteProfile");
          }}
        />
      </div>
    </div>
  );

  const renderPolicyDetail = () => (
    <div className={s.page}>
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Downloads" customClass={s.sectionHeaderFlushH} />
        <Card>
          <List customClass={s.listBleedInCard}>
          <ListItem
            id="d1"
            primary="Policy PDF"
            secondary="E-policy"
            separator
            onClick={() => undefined}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
          <ListItem
            id="d2"
            primary="80D tax certificate"
            secondary="FY 2025–26"
            separator={false}
            onClick={() => undefined}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
        </List>
        </Card>
      </div>
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Support" customClass={s.sectionHeaderFlushH} />
        <Card>
          <List customClass={s.listBleedInCard}>
          <ListItem
            id="s1"
            primary="Chat with Paytm support"
            secondary="Insurance orders & app issues"
            separator
            onClick={() => undefined}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
          <ListItem
            id="s2"
            primary="Insurer helpline"
            secondary="Claims & policy servicing"
            separator={false}
            onClick={() => undefined}
            trailing={{ type: "icon", Icon: <ChevronRightIcon aria-hidden /> }}
          />
        </List>
        </Card>
      </div>
    </div>
  );

  const renderClaimType = () => (
    <div className={s.page}>
      <Alerts
        active
        layout="inline"
        context="primary"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPrimary}
        title="Cashless"
        subTitle="Hospital ties up with insurer / TPA — pre-auth required before admission where applicable."
      />
      <Card>
        <List customClass={s.listBleedInCard}>
          <ListItem
            id="c-cash"
            primary="Cashless claim"
            secondary="Planned or emergency — network hospital"
            separator
            onClick={() => setClaimPath("cashless")}
            leading={{
              type: "radio",
              radio: {
                name: CLAIM_RADIO,
                value: "cashless",
                checked: claimPath === "cashless",
                onChecked: () => setClaimPath("cashless"),
              },
            }}
          />
          <ListItem
            id="c-reim"
            primary="Reimbursement"
            secondary="Pay first, upload bills after discharge"
            separator={false}
            onClick={() => setClaimPath("reimbursement")}
            leading={{
              type: "radio",
              radio: {
                name: CLAIM_RADIO,
                value: "reimbursement",
                checked: claimPath === "reimbursement",
                onChecked: () => setClaimPath("reimbursement"),
              },
            }}
          />
        </List>
      </Card>
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Continue" onClick={() => setStep("claimDocs")} />
      </div>
    </div>
  );

  const renderClaimDocs = () => (
    <div className={s.page}>
      <Alerts
        active
        layout="inline"
        context="notice"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingNotice}
        title="Clear photos reduce rejections"
        subTitle="Discharge summary, final bill, prescriptions, investigation reports (demo checklist)."
      />
      <div className={s.sectionHeaderTight}>
        <SectionHeader title="Upload" customClass={s.sectionHeaderFlushH} />
        <Card>
        <p className={s.planInsurer}>No files stored in Storybook — tap below to simulate upload.</p>
        <div className={s.cardActions}>
          <Button type="stroke" size="large" label="Add photos or PDF (demo)" onClick={() => undefined} />
        </div>
        </Card>
      </div>
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Submit claim" onClick={() => setStep("claimTrack")} />
      </div>
    </div>
  );

  const renderClaimTrack = () => (
    <div className={s.page}>
      <Card>
        <div className={s.timeline}>
          <div className={s.timelineItem}>
            <span className={s.timelineDot} aria-hidden />
            <div className={s.timelineBody}>
              <p className={s.timelineTitle}>Received</p>
              <p className={s.timelineSub}>CLM-2026-009821 · {claimPath === "cashless" ? "Cashless" : "Reimbursement"}</p>
            </div>
          </div>
          <div className={s.timelineItem}>
            <span className={`${s.timelineDot} ${s.timelineDotMuted}`} aria-hidden />
            <div className={s.timelineBody}>
              <p className={s.timelineTitle}>Under review</p>
              <p className={s.timelineSub}>Typically a few working days — insurer dependent</p>
            </div>
          </div>
        </div>
      </Card>
      <div className={s.footerActions}>
        <Button type="filled" size="large" label="Back to policy" onClick={() => setStep("policyHome")} />
      </div>
    </div>
  );

  const renderRenewal = () => (
    <div className={s.page}>
      <Alerts
        active
        layout="inline"
        context="primary"
        customClass={s.alertContentFull}
        LeadingIcon={alertLeadingPrimary}
        title="Renewal premium"
        subTitle="Age band, GST, and benefit changes can affect price — compare before you pay."
      />
      <Card>
        <div className={s.reviewBlock}>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Last year</span>
            <span className={s.reviewVal}>{formatInr(selectedPlan.premiumAnnual)}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>This year</span>
            <span className={s.reviewVal}>{formatInr(selectedPlan.premiumAnnual + 420)}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Why higher?</span>
            <span className={s.reviewVal}>Age band + 3% demo index</span>
          </div>
        </div>
      </Card>
      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label={`Renew for ${formatInr(selectedPlan.premiumAnnual + 420)}`}
          onClick={() => setStep("policyHome")}
        />
        <Button type="stroke" size="large" label="Review coverage first" onClick={() => setStep("policyDetail")} />
      </div>
    </div>
  );

  return (
    <div className={s.shell} data-testid="health-insurance-flow">
      <HeaderDefault
        size="medium"
        title={headerTitle}
        subTitle={headerSub}
        showBack={showBack}
        onBackClick={goBack}
      />
      <div className={s.scroll}>
        {step === "landing" && renderLanding()}
        {step === "quoteProfile" && renderQuoteProfile()}
        {step === "quoteSi" && renderQuoteSi()}
        {step === "quoteHealth" && renderQuoteHealth()}
        {step === "quoteLoading" && renderQuoteLoading()}
        {step === "planList" && renderPlanList()}
        {step === "planCompare" && renderPlanCompare()}
        {step === "planDetail" && renderPlanDetail()}
        {step === "proposal" && renderProposal()}
        {step === "review" && renderReview()}
        {step === "payment" && renderPayment()}
        {step === "confirmation" && renderConfirmation()}
        {step === "issuanceTracker" && renderIssuanceTracker()}
        {step === "policyHome" && renderPolicyHome()}
        {step === "policyDetail" && renderPolicyDetail()}
        {step === "claimType" && renderClaimType()}
        {step === "claimDocs" && renderClaimDocs()}
        {step === "claimTrack" && renderClaimTrack()}
        {step === "renewal" && renderRenewal()}
      </div>
    </div>
  );
};

export default React.memo(HealthInsuranceFlow);
