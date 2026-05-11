import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Alerts from "../../pods-components/Alerts/Alerts";
import Button from "../../pods-components/Button/Button";
import Card from "../../pods-components/Card/Card";
import BottomSheet from "../../pods-components/BottomSheet/BottomSheet";
import { HeaderDefault } from "../../pods-components/Header/Header";
import List from "../../pods-components/List/List";
import ListItem from "../../pods-components/List/ListItem";
import SectionHeader from "../../pods-components/SectionHeader/SectionHeader";
import TextField from "../../pods-components/TextField/TextField";
import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { ReactComponent as TxnSuccessThemed } from "../../assets/ultra-icons/system/status/txn_success_themed.svg";
import cx from "../../utils/classNames";

import s from "./ElectricityBillPaymentFlow.module.scss";

type Step = "home" | "fetching" | "bill" | "payment" | "success";

type PayMethod = "upi" | "balance" | "card";

interface Board {
  id: string;
  name: string;
  state: string;
}

const BOARDS: Board[] = [
  { id: "bses-rpl", name: "BSES Rajdhani Power Ltd", state: "Delhi" },
  { id: "bses-ypl", name: "BSES Yamuna Power Ltd", state: "Delhi" },
  { id: "tata-ddl", name: "Tata Power-DDL", state: "Delhi" },
  { id: "msedcl", name: "MSEDCL", state: "Maharashtra" },
  { id: "best", name: "BEST Undertaking", state: "Maharashtra" },
  { id: "torrent-ahm", name: "Torrent Power — Ahmedabad", state: "Gujarat" },
  { id: "bescom", name: "BESCOM", state: "Karnataka" },
  { id: "tsspdcl", name: "TSSPDCL", state: "Telangana" },
];

const RECENT = [
  {
    id: "r1",
    boardId: "bses-rpl",
    consumerMasked: "Consumer ·••• 2184",
    subtitle: "Paid ₹2,847 · 12 Mar 2026",
  },
  {
    id: "r2",
    boardId: "msedcl",
    consumerMasked: "Consumer ·••• 9031",
    subtitle: "Paid ₹4,120 · 3 Mar 2026",
  },
];

const FETCH_MS = 950;

const PAY_RADIO = "elec-bill-pay-method";

const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

const ElectricityBillPaymentFlow: React.FC = () => {
  const portalHostId = React.useId().replace(/:/g, "");
  const fetchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [step, setStep] = useState<Step>("home");
  const [boardSheetOpen, setBoardSheetOpen] = useState(false);
  const [boardSearch, setBoardSearch] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [consumerNo, setConsumerNo] = useState("");
  const [payMethod, setPayMethod] = useState<PayMethod>("upi");

  const billAmount = 3247;
  const dueDate = "18 Apr 2026";
  const billPeriod = "15 Feb 2026 – 15 Mar 2026";
  const consumerName = "Rahul K.";
  const txnRef = "POTB240413884921";

  const filteredBoards = useMemo(() => {
    const q = boardSearch.trim().toLowerCase();
    if (!q) {
      return BOARDS;
    }
    return BOARDS.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.state.toLowerCase().includes(q),
    );
  }, [boardSearch]);

  const canProceedHome =
    Boolean(selectedBoard) && consumerNo.replace(/\s/g, "").length >= 5;

  const clearFetchTimer = useCallback(() => {
    if (fetchTimerRef.current != null) {
      clearTimeout(fetchTimerRef.current);
      fetchTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearFetchTimer(), [clearFetchTimer]);

  const goBack = useCallback(() => {
    if (step === "home") {
      return;
    }
    if (step === "fetching") {
      clearFetchTimer();
      setStep("home");
      return;
    }
    if (step === "bill") {
      setStep("home");
      return;
    }
    if (step === "payment") {
      setStep("bill");
      return;
    }
    if (step === "success") {
      setStep("home");
      setConsumerNo("");
      setSelectedBoard(null);
      setPayMethod("upi");
    }
  }, [clearFetchTimer, step]);

  const startFetch = () => {
    if (!canProceedHome) {
      return;
    }
    setStep("fetching");
    clearFetchTimer();
    fetchTimerRef.current = setTimeout(() => {
      fetchTimerRef.current = null;
      setStep("bill");
    }, FETCH_MS);
  };

  const pickBoard = (b: Board) => {
    setSelectedBoard(b);
    setBoardSheetOpen(false);
    setBoardSearch("");
  };

  const pickRecent = (boardId: string) => {
    const b = BOARDS.find((x) => x.id === boardId);
    if (b) {
      setSelectedBoard(b);
    }
  };

  const headerTitle = useMemo(() => {
    switch (step) {
      case "home":
        return "Electricity";
      case "fetching":
        return "Fetching bill";
      case "bill":
        return "Bill details";
      case "payment":
        return "Pay with";
      case "success":
        return "Payment successful";
      default:
        return "Electricity";
    }
  }, [step]);

  const headerSub = useMemo(() => {
    switch (step) {
      case "home":
        return "100+ boards · Secure payments";
      case "fetching":
        return "Please wait";
      case "bill":
        return selectedBoard?.name ?? "";
      case "payment":
        return formatInr(billAmount);
      case "success":
        return "Saved to your history";
      default:
        return "";
    }
  }, [billAmount, selectedBoard?.name, step]);

  const renderBoardSheet = () => (
    <BottomSheet
      active={boardSheetOpen}
      title="Select electricity board"
      description="Search by board or state"
      showCloseIcon
      triggerClose={() => {
        setBoardSheetOpen(false);
        setBoardSearch("");
      }}
      attachToElementID={portalHostId}
    >
      <div className={s.sheetBody}>
        <TextField
          label="Search"
          value={boardSearch}
          onChange={setBoardSearch}
          emphasis="high"
        />
        <div className={s.sheetList}>
          <List>
            {filteredBoards.map((b) => (
              <ListItem
                key={b.id}
                id={b.id}
                primary={b.name}
                secondary={b.state}
                separator
                onClick={() => pickBoard(b)}
                trailing={{
                  type: "icon",
                  Icon: <ChevronRightIcon aria-hidden />,
                }}
              />
            ))}
          </List>
        </div>
      </div>
    </BottomSheet>
  );

  const renderHome = () => (
    <div className={s.homeScroll}>
      <Alerts
        active
        layout="inline"
        context="primary"
        title="Up to ₹50 cashback"
        subTitle="On electricity bill paid with UPI this week (demo offer)."
      />

      <Card>
        <div className={s.boardFieldLabel}>Electricity board</div>
        <button
          type="button"
          className={s.boardField}
          onClick={() => setBoardSheetOpen(true)}
          aria-expanded={boardSheetOpen}
        >
          <span className={s.boardFieldInner}>
            <span
              className={cx(
                s.boardFieldValue,
                !selectedBoard && s.boardFieldPlaceholder,
              )}
            >
              {selectedBoard ? selectedBoard.name : "Tap to choose your board"}
            </span>
            <span className={s.chevron} aria-hidden>
              <ChevronRightIcon />
            </span>
          </span>
        </button>
      </Card>

      <TextField
        label="Consumer number"
        value={consumerNo}
        onChange={setConsumerNo}
        emphasis="high"
        assistiveText="As printed on your bill (demo)."
        inputProps={{ inputMode: "numeric", autoComplete: "off" }}
      />

      <SectionHeader title="Recent" />
      <Card>
        <List>
          {RECENT.map((r) => {
            const b = BOARDS.find((x) => x.id === r.boardId);
            return (
              <ListItem
                key={r.id}
                id={r.id}
                primary={b?.name ?? "Board"}
                secondary={`${r.consumerMasked} · ${r.subtitle}`}
                separator
                onClick={() => {
                  pickRecent(r.boardId);
                  setConsumerNo("21849031");
                }}
                trailing={{
                  type: "icon",
                  Icon: <ChevronRightIcon aria-hidden />,
                }}
              />
            );
          })}
        </List>
      </Card>

      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label="Proceed"
          disabled={!canProceedHome}
          onClick={startFetch}
        />
      </div>
    </div>
  );

  const renderFetching = () => (
    <div className={s.stepScroll}>
      <div className={s.fetchingBody}>
        <p className={s.fetchingTitle}>Getting your latest bill</p>
        <p className={s.fetchingSub}>
          We are fetching the amount from your provider (demo delay).
        </p>
        <Button type="stroke" size="medium" label="Cancel" onClick={goBack} />
      </div>
    </div>
  );

  const renderBill = () => (
    <div className={s.stepScroll}>
      <Alerts
        active
        layout="inline"
        context="notice"
        title="Provider update time"
        subTitle="Some boards take up to 24 hours to show payment in their records."
      />

      <Card>
        <div className={s.amountHero}>
          <span className={s.amountLabel}>Bill amount</span>
          <span className={s.amountFigures}>{formatInr(billAmount)}</span>
          <span className={s.dueLine}>Due on {dueDate}</span>
        </div>
        <div className={s.reviewBlock}>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Name on bill</span>
            <span className={s.reviewVal}>{consumerName}</span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Consumer no.</span>
            <span className={s.reviewVal}>
              {consumerNo.replace(/\s/g, "") || "—"}
            </span>
          </div>
          <div className={s.reviewLine}>
            <span className={s.reviewKey}>Billing period</span>
            <span className={s.reviewVal}>{billPeriod}</span>
          </div>
        </div>
      </Card>

      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label={`Pay ${formatInr(billAmount)}`}
          onClick={() => setStep("payment")}
        />
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className={s.stepScroll}>
      <Card>
        <List>
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
        <Button
          type="filled"
          size="large"
          label="Pay securely"
          onClick={() => setStep("success")}
        />
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className={s.stepScroll}>
      <div className={s.successPanel}>
        <TxnSuccessThemed className={s.successIcon} aria-hidden />
        <h2 className={s.successTitle}>Paid {formatInr(billAmount)}</h2>
        <p className={s.successSub}>
          {selectedBoard?.name ?? "Electricity board"} · {consumerName}
        </p>
        <span className={s.refPill}>Ref {txnRef}</span>
      </div>
      <div className={s.footerActions}>
        <Button
          type="filled"
          size="large"
          label="Pay another bill"
          onClick={() => {
            setStep("home");
            setConsumerNo("");
            setSelectedBoard(null);
            setPayMethod("upi");
          }}
        />
        <Button type="stroke" size="large" label="View receipt" onClick={() => undefined} />
      </div>
    </div>
  );

  return (
    <div className={s.shell} data-testid="electricity-bill-payment-flow">
      <HeaderDefault
        size="medium"
        title={headerTitle}
        subTitle={headerSub}
        showBack
        onBackClick={goBack}
      />
      <div className={s.scroll}>
        {step === "home" && renderHome()}
        {step === "fetching" && renderFetching()}
        {step === "bill" && renderBill()}
        {step === "payment" && renderPayment()}
        {step === "success" && renderSuccess()}
      </div>
      <div id={portalHostId} className={s.portalHost} aria-hidden />
      {renderBoardSheet()}
    </div>
  );
};

export default React.memo(ElectricityBillPaymentFlow);
