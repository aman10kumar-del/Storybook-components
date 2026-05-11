import React, { useCallback, useEffect, useMemo, useState } from "react";

import AirlineLogo from "./AirlineLogo";
import FlightDateCalendar, {
  formatFlightDateLabel,
  parseFlightDateLabel,
} from "./FlightDateCalendar";
import Alerts from "../../pods-components/Alerts/Alerts";
import Badge from "../../pods-components/Badge/Badge";
import BottomNavBar from "../../pods-components/BottomNavBar/BottomNavBar";
import BottomSheet from "../../pods-components/BottomSheet/BottomSheet";
import Button from "../../pods-components/Button/Button";
import Card from "../../pods-components/Card/Card";
import Chips from "../../pods-components/Chips/Chips";
import { HeaderDefault } from "../../pods-components/Header/Header";
import List from "../../pods-components/List/List";
import ListItem from "../../pods-components/List/ListItem";
import SectionHeader from "../../pods-components/SectionHeader/SectionHeader";
import SegmentedControl from "../../pods-components/SegmentedControl/SegmentedControl";
import TextField from "../../pods-components/TextField/TextField";
import { ReactComponent as AddIcon } from "../../assets/ultra-icons/system/action/add.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { ReactComponent as HomeIcon } from "../../assets/ultra-icons/system/category/home.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/ultra-icons/system/action/notifications.svg";
import { ReactComponent as RemoveIcon } from "../../assets/ultra-icons/system/action/remove.svg";
import { ReactComponent as RoundTripIcon } from "../../assets/ultra-icons/system/action/round_trip.svg";
import { ReactComponent as ScanQrIcon } from "../../assets/ultra-icons/system/category/scan_qr_code.svg";
import { ReactComponent as SendIcon } from "../../assets/ultra-icons/system/category/send.svg";
import { ReactComponent as SettingsIcon } from "../../assets/ultra-icons/system/action/settings.svg";
import { ReactComponent as SupportIcon } from "../../assets/ultra-icons/system/category/support.svg";
import { onEnter } from "../../utils/utils";
import cx from "../../utils/classNames";

import s from "./FlightBookingFlow.module.scss";

type Step =
  | "home"
  | "results"
  | "returnResults"
  | "fare"
  | "passengers"
  | "review"
  | "success";

type Sheet = "none" | "from" | "to" | "depart" | "return" | "pax" | "promo" | "notify" | "settings";

type TripTab = "rt" | "ow";

type FareId = "saver" | "flex";

interface Airport {
  code: string;
  city: string;
}

type FlightPromoBadge = {
  label: string;
  context: "positive" | "notice" | "negative" | "primary" | "highlight";
};

interface FlightLeg {
  id: string;
  airline: string;
  /** IATA airline designator for bundled tail logo */
  iata: string;
  flightNo: string;
  dep: string;
  arr: string;
  duration: string;
  stops: number;
  price: number;
  /** Social proof + FOMO (PODS Badge) */
  badges: FlightPromoBadge[];
}

const AIRPORTS: Airport[] = [
  { code: "DEL", city: "New Delhi" },
  { code: "BOM", city: "Mumbai" },
  { code: "BLR", city: "Bengaluru" },
  { code: "CCU", city: "Kolkata" },
  { code: "HYD", city: "Hyderabad" },
  { code: "MAA", city: "Chennai" },
];

const OUTBOUND_FLIGHTS: FlightLeg[] = [
  {
    id: "o1",
    airline: "IndiGo",
    iata: "6E",
    flightNo: "6E 201",
    dep: "06:10",
    arr: "08:25",
    duration: "2h 15m",
    stops: 0,
    price: 4521,
    badges: [
      { label: "Lowest fare today", context: "positive" },
      { label: "Only 5 seats left", context: "notice" },
      { label: "312 booked this week", context: "highlight" },
    ],
  },
  {
    id: "o2",
    airline: "Air India",
    iata: "AI",
    flightNo: "AI 815",
    dep: "09:40",
    arr: "12:05",
    duration: "2h 25m",
    stops: 0,
    price: 4890,
    badges: [
      { label: "Top rated on this route", context: "primary" },
      { label: "Selling fast · 12 left", context: "notice" },
      { label: "89 chose this flight today", context: "highlight" },
    ],
  },
  {
    id: "o3",
    airline: "SpiceJet",
    iata: "SG",
    flightNo: "SG 8163",
    dep: "14:15",
    arr: "16:40",
    duration: "2h 25m",
    stops: 1,
    price: 3999,
    badges: [
      { label: "1.2k flyers picked SpiceJet today", context: "highlight" },
      { label: "1 stop · Short layover", context: "notice" },
    ],
  },
  {
    id: "o4",
    airline: "Vistara",
    iata: "UK",
    flightNo: "UK 995",
    dep: "19:30",
    arr: "21:50",
    duration: "2h 20m",
    stops: 0,
    price: 5200,
    badges: [
      { label: "Free meal included", context: "positive" },
      { label: "Extra legroom rows left: 3", context: "notice" },
    ],
  },
];

const RETURN_FLIGHTS: FlightLeg[] = [
  {
    id: "r1",
    airline: "IndiGo",
    iata: "6E",
    flightNo: "6E 204",
    dep: "07:00",
    arr: "09:10",
    duration: "2h 10m",
    stops: 0,
    price: 4680,
    badges: [
      { label: "Earliest return · Popular", context: "highlight" },
      { label: "47 booked in last 24h", context: "primary" },
    ],
  },
  {
    id: "r2",
    airline: "Air India",
    iata: "AI",
    flightNo: "AI 816",
    dep: "11:20",
    arr: "13:35",
    duration: "2h 15m",
    stops: 0,
    price: 4950,
    badges: [
      { label: "Few seats at this price", context: "notice" },
      { label: "Members save extra", context: "positive" },
    ],
  },
  {
    id: "r3",
    airline: "IndiGo",
    iata: "6E",
    flightNo: "6E 612",
    dep: "20:45",
    arr: "22:55",
    duration: "2h 10m",
    stops: 0,
    price: 4320,
    badges: [
      { label: "Late flight · Best value", context: "positive" },
      { label: "8 seats left", context: "notice" },
    ],
  },
];

const FARES: Record<
  FareId,
  { name: string; desc: string; add: number }
> = {
  saver: {
    name: "Saver",
    desc: "No refund · Date change with fee",
    add: 0,
  },
  flex: {
    name: "Flex",
    desc: "Free date change · Partial refund",
    add: 1200,
  },
};

function formatInr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

const HOME_HEADER_COLLAPSE_SCROLL_PX = 56;
const HOME_HEADER_EXPAND_SCROLL_PX = 20;

const FlightBookingFlow: React.FC = () => {
  const portalHostId = React.useId().replace(/:/g, "");

  const [step, setStep] = useState<Step>("home");
  const [homeHeaderCompact, setHomeHeaderCompact] = useState(false);
  const [sheet, setSheet] = useState<Sheet>("none");
  const [tripTab, setTripTab] = useState<TripTab>("rt");
  const [from, setFrom] = useState(AIRPORTS[0]);
  const [to, setTo] = useState(AIRPORTS[1]);
  const [departDate, setDepartDate] = useState("12 Apr 2026");
  const [returnDate, setReturnDate] = useState("18 Apr 2026");
  const [adults, setAdults] = useState(1);
  const [cabin, setCabin] = useState<"Economy" | "Business">("Economy");
  const [searchError, setSearchError] = useState(false);
  const [resultsFilter, setResultsFilter] = useState<"all" | "direct">("all");
  const [returnFilter, setReturnFilter] = useState<"all" | "direct">("all");
  const [selectedOutbound, setSelectedOutbound] = useState<FlightLeg | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<FlightLeg | null>(null);
  const [fareId, setFareId] = useState<FareId | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengerError, setPassengerError] = useState("");
  const [bookingRef, setBookingRef] = useState("");

  const closeSheet = useCallback(() => setSheet("none"), []);

  useEffect(() => {
    const dep = parseFlightDateLabel(departDate);
    const ret = parseFlightDateLabel(returnDate);
    if (!dep || !ret) return;
    if (ret.getTime() < dep.getTime()) {
      setReturnDate(formatFlightDateLabel(dep));
    }
  }, [departDate, returnDate]);

  useEffect(() => {
    if (step !== "home") {
      setHomeHeaderCompact(false);
    }
  }, [step]);

  const handleHomeScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const y = e.currentTarget.scrollTop;
      setHomeHeaderCompact((prev) => {
        if (y > HOME_HEADER_COLLAPSE_SCROLL_PX) return true;
        if (y < HOME_HEADER_EXPAND_SCROLL_PX) return false;
        return prev;
      });
    },
    [],
  );

  const swapCities = useCallback(() => {
    setFrom((f) => {
      const t = to;
      setTo(f);
      return t;
    });
  }, [to]);

  const filteredOutbound = useMemo(
    () =>
      OUTBOUND_FLIGHTS.filter((f) =>
        resultsFilter === "direct" ? f.stops === 0 : true,
      ),
    [resultsFilter],
  );

  const filteredReturn = useMemo(
    () =>
      RETURN_FLIGHTS.filter((f) =>
        returnFilter === "direct" ? f.stops === 0 : true,
      ),
    [returnFilter],
  );

  const baseFareTotal = useMemo(() => {
    if (!selectedOutbound) return 0;
    const ob = selectedOutbound.price * adults;
    if (tripTab === "ow") return ob;
    if (!selectedReturn) return ob;
    return ob + selectedReturn.price * adults;
  }, [adults, selectedOutbound, selectedReturn, tripTab]);

  const fareAddon = fareId ? FARES[fareId].add * adults * (tripTab === "rt" && selectedReturn ? 2 : 1) : 0;

  const grandTotal = baseFareTotal + fareAddon;

  const runSearch = () => {
    if (from.code === to.code) {
      setSearchError(true);
      return;
    }
    setSearchError(false);
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setFareId(null);
    setStep("results");
  };

  const applyRecent = (primary: string) => {
    if (primary.startsWith("DEL")) {
      setFrom(AIRPORTS[0]);
      setTo(AIRPORTS[1]);
      setDepartDate("12 Apr 2026");
      setReturnDate("18 Apr 2026");
      setTripTab("rt");
    } else {
      setFrom(AIRPORTS[2]);
      setTo(AIRPORTS[3]);
      setDepartDate("15 Apr 2026");
      setTripTab("ow");
    }
    setSearchError(false);
  };

  const goBack = () => {
    if (step === "results") setStep("home");
    else if (step === "returnResults") {
      setStep("results");
      setSelectedOutbound(null);
    } else if (step === "fare") {
      if (tripTab === "rt" && selectedOutbound) setStep("returnResults");
      else setStep("results");
    } else if (step === "passengers") setStep("fare");
    else if (step === "review") setStep("passengers");
  };

  const resetFlow = () => {
    setStep("home");
    setSheet("none");
    setTripTab("rt");
    setFrom(AIRPORTS[0]);
    setTo(AIRPORTS[1]);
    setDepartDate("12 Apr 2026");
    setReturnDate("18 Apr 2026");
    setAdults(1);
    setCabin("Economy");
    setSearchError(false);
    setResultsFilter("all");
    setReturnFilter("all");
    setSelectedOutbound(null);
    setSelectedReturn(null);
    setFareId(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassengerError("");
    setBookingRef("");
    setHomeHeaderCompact(false);
  };

  const pickOutbound = (f: FlightLeg) => {
    setSelectedOutbound(f);
    if (tripTab === "ow") {
      setStep("fare");
    } else {
      setSelectedReturn(null);
      setStep("returnResults");
    }
  };

  const pickReturn = (f: FlightLeg) => {
    setSelectedReturn(f);
    setStep("fare");
  };

  const validatePassengers = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setPassengerError("Enter first and last name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setPassengerError("Enter a valid email.");
      return;
    }
    if (phone.trim().length < 10) {
      setPassengerError("Enter a valid 10-digit mobile number.");
      return;
    }
    setPassengerError("");
    setStep("review");
  };

  const confirmPay = () => {
    setBookingRef(`PTM-${Date.now().toString(36).toUpperCase()}`);
    setStep("success");
  };

  const trailingNotifications = (
    <NotificationsIcon
      role="button"
      tabIndex={0}
      aria-label="Notifications"
      style={{ cursor: "pointer" }}
      onClick={() => setSheet("notify")}
      onKeyUp={(e) => onEnter(e, () => setSheet("notify"))}
    />
  );

  const trailingSettings = (
    <SettingsIcon
      role="button"
      tabIndex={0}
      aria-label="More options"
      style={{ cursor: "pointer" }}
      onClick={() => setSheet("settings")}
      onKeyUp={(e) => onEnter(e, () => setSheet("settings"))}
    />
  );

  const renderSheets = () => (
    <>
      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "from"}
        title="Flying from"
        triggerClose={closeSheet}
        showGrabber
      >
        <List customClass={s.sheetList}>
          {AIRPORTS.map((a) => (
            <ListItem
              key={a.code}
              id={a.code}
              primary={`${a.code} — ${a.city}`}
              separator
              trailing={
                from.code === a.code
                  ? {
                      type: "detail",
                      detail: "Selected",
                      position: "center",
                    }
                  : {
                      type: "icon",
                      Icon: <ChevronRightIcon aria-hidden />,
                      position: "center",
                    }
              }
              onClick={() => {
                setFrom(a);
                closeSheet();
              }}
            />
          ))}
        </List>
      </BottomSheet>

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "to"}
        title="Flying to"
        triggerClose={closeSheet}
        showGrabber
      >
        <List customClass={s.sheetList}>
          {AIRPORTS.map((a) => (
            <ListItem
              key={a.code}
              id={a.code}
              primary={`${a.code} — ${a.city}`}
              separator
              trailing={
                to.code === a.code
                  ? {
                      type: "detail",
                      detail: "Selected",
                      position: "center",
                    }
                  : {
                      type: "icon",
                      Icon: <ChevronRightIcon aria-hidden />,
                      position: "center",
                    }
              }
              onClick={() => {
                setTo(a);
                closeSheet();
              }}
            />
          ))}
        </List>
      </BottomSheet>

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "depart"}
        title="Departure date"
        triggerClose={closeSheet}
        showGrabber
      >
        <FlightDateCalendar
          selectedLabel={departDate}
          onSelect={(label) => {
            setDepartDate(label);
            closeSheet();
          }}
        />
      </BottomSheet>

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "return"}
        title="Return date"
        triggerClose={closeSheet}
        showGrabber
      >
        <FlightDateCalendar
          selectedLabel={returnDate}
          minLabel={departDate}
          onSelect={(label) => {
            setReturnDate(label);
            closeSheet();
          }}
        />
      </BottomSheet>

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "pax"}
        title="Travellers & cabin"
        triggerClose={closeSheet}
        showGrabber
        primaryButton={{
          label: "Done",
          onClick: closeSheet,
        }}
      >
        <div className={s.paxRow}>
          <span className={s.paxLabel}>Adults</span>
          <div className={s.paxControls}>
            <Button
              type="stroke"
              size="medium"
              ariaLabel="Decrease adults"
              LeadingIcon={<RemoveIcon aria-hidden />}
              disabled={adults <= 1}
              onClick={() => setAdults((n) => Math.max(1, n - 1))}
            />
            <span className={s.paxCount}>{adults}</span>
            <Button
              type="stroke"
              size="medium"
              ariaLabel="Increase adults"
              LeadingIcon={<AddIcon aria-hidden />}
              disabled={adults >= 9}
              onClick={() => setAdults((n) => Math.min(9, n + 1))}
            />
          </div>
        </div>
        <SectionHeader size="medium" title="Cabin" />
        <div className={s.chipRow}>
          <Chips
            type="normal"
            label="Economy"
            selected={cabin === "Economy"}
            onClick={() => setCabin("Economy")}
          />
          <Chips
            type="normal"
            label="Business"
            selected={cabin === "Business"}
            onClick={() => setCabin("Business")}
          />
        </div>
      </BottomSheet>

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "promo"}
        title="Offer details"
        description="Zero convenience fee on this route for a limited time. Taxes as applicable."
        triggerClose={closeSheet}
        primaryButton={{ label: "Got it", onClick: closeSheet }}
      />

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "notify"}
        title="Notifications"
        description="You have no new flight alerts. Turn on price alerts from search results (demo)."
        triggerClose={closeSheet}
        primaryButton={{ label: "OK", onClick: closeSheet }}
      />

      <BottomSheet
        attachToElementID={portalHostId}
        active={sheet === "settings"}
        title="More"
        description="Manage currency, language, and travel preferences (demo)."
        triggerClose={closeSheet}
        primaryButton={{ label: "Close", onClick: closeSheet }}
      />
    </>
  );

  const renderHomeBody = () => (
    <div className={s.homeScroll}>
          {searchError && (
            <Alerts
              active
              layout="inline"
              context="negative"
              title="Same origin and destination"
              subTitle="Pick two different cities to search."
              customClass={s.inlineAlert}
              showDismissIcon
              triggerClose={() => setSearchError(false)}
            />
          )}
          <Card customClass={s.searchCard}>
            <div className={s.searchCardInner}>
              <div className={s.routeRow}>
                <button
                  type="button"
                  className={s.routeBlock}
                  onClick={() => setSheet("from")}
                >
                  <span className={s.routeCode}>{from.code}</span>
                  <span className={s.routeCity}>{from.city}</span>
                </button>
                <div className={s.routeMid}>
                  <Button
                    type="stroke"
                    size="medium"
                    ariaLabel="Swap origin and destination"
                    customClass={s.swapButton}
                    LeadingIcon={<RoundTripIcon aria-hidden />}
                    onClick={swapCities}
                  />
                </div>
                <button
                  type="button"
                  className={cx(s.routeBlock, s.routeBlockEnd)}
                  onClick={() => setSheet("to")}
                >
                  <span className={s.routeCode}>{to.code}</span>
                  <span className={s.routeCity}>{to.city}</span>
                </button>
              </div>

              <SegmentedControl
                controlType="controlled"
                controlled={{ activeTabID: tripTab }}
                customClass={s.searchCardSegmented}
                tabs={[
                  { id: "rt", title: "Round trip" },
                  { id: "ow", title: "One way" },
                ]}
                onChange={(tab) => {
                  setTripTab(tab.id as TripTab);
                }}
              />

              <div className={s.dateRow}>
                <button
                  type="button"
                  className={s.dateCell}
                  onClick={() => setSheet("depart")}
                >
                  <span className={s.dateLabel}>Depart</span>
                  <span className={s.dateValue}>{departDate}</span>
                </button>
                {tripTab === "rt" ? (
                  <button
                    type="button"
                    className={s.dateCell}
                    onClick={() => setSheet("return")}
                  >
                    <span className={s.dateLabel}>Return</span>
                    <span className={s.dateValue}>{returnDate}</span>
                  </button>
                ) : (
                  <div className={s.dateCell} style={{ opacity: 0.5 }}>
                    <span className={s.dateLabel}>Return</span>
                    <span className={s.dateValue}>—</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                className={s.paxRow}
                onClick={() => setSheet("pax")}
              >
                <span className={s.paxTextCol}>
                  <span className={s.paxPrimary}>Travellers & class</span>
                  <span className={s.paxSecondary}>
                    {adults} Adult{adults > 1 ? "s" : ""} · {cabin}
                  </span>
                </span>
                <span className={s.paxChevronWrap} aria-hidden>
                  <ChevronRightIcon />
                </span>
              </button>

              <Button
                type="filled"
                size="large"
                label="Search flights"
                onClick={runSearch}
              />
            </div>
          </Card>

          <div className={s.promoStrip} role="status">
            <span className={s.promoText}>
              Zero convenience fee on this route for a limited time.
            </span>
            <Button
              type="link"
              size="small"
              label="Details"
              onClick={() => setSheet("promo")}
            />
          </div>

          <div className={s.offersBlock}>
            <SectionHeader
              size="large"
              title="Offers for you"
              TrailingLink={
                <Button
                  type="link"
                  size="small"
                  label="View all"
                  onClick={() => setSheet("promo")}
                />
              }
            />
            <div className={s.offerScroller}>
              <Card customClass={s.offerCard}>
                <p className={s.offerTitle}>Cashback</p>
                <p className={s.offerSub}>Up to ₹800 with Paytm UPI</p>
              </Card>
              <Card customClass={s.offerCard}>
                <p className={s.offerTitle}>International</p>
                <p className={s.offerSub}>Extra baggage on select airlines</p>
              </Card>
              <Card customClass={s.offerCard}>
                <p className={s.offerTitle}>Flex dates</p>
                <p className={s.offerSub}>See cheaper nearby days</p>
              </Card>
            </div>
          </div>

          <div className={s.recentBlock}>
            <SectionHeader size="large" title="Recent searches" />
            <Card customClass={s.recentCard}>
              <List customClass={s.recentList}>
                <ListItem
                  id="r1"
                  primary="DEL — BOM"
                  secondary="12 Apr · 1 Adult"
                  separator
                  trailing={{
                    type: "icon",
                    Icon: <ChevronRightIcon aria-hidden />,
                    position: "center",
                  }}
                  onClick={() => applyRecent("DEL — BOM")}
                />
                <ListItem
                  id="r2"
                  primary="BLR — CCU"
                  secondary="One way · Economy"
                  separator={false}
                  trailing={{
                    type: "icon",
                    Icon: <ChevronRightIcon aria-hidden />,
                    position: "center",
                  }}
                  onClick={() => applyRecent("BLR")}
                />
              </List>
            </Card>
          </div>
    </div>
  );

  const renderHomeNav = () => (
    <div className={s.navDock}>
      <BottomNavBar
        options={[
          { id: "home", label: "Home", icon: <HomeIcon aria-hidden /> },
          {
            id: "flights",
            label: "Flights",
            icon: <SendIcon aria-hidden />,
            active: true,
          },
          { id: "scan", label: "Scan", icon: <ScanQrIcon aria-hidden /> },
          { id: "help", label: "Help", icon: <SupportIcon aria-hidden /> },
        ]}
        onClick={() => setSheet("settings")}
      />
    </div>
  );

  const renderFlightCard = (
    f: FlightLeg,
    selected: boolean,
    onPick: () => void,
    originCode: string,
    destCode: string,
  ) => (
    <Card
      key={f.id}
      customClass={cx(
        s.flightCard,
        s.flightCardDense,
        selected && s.flightCardSelected,
      )}
      onClick={onPick}
    >
      <div className={s.flightRow}>
        <div className={s.flightRailLogo}>
          <AirlineLogo iata={f.iata} airlineName={f.airline} />
        </div>
        <div className={s.flightRailBody}>
          <div className={s.flightAirlineRow}>
            <span className={s.airline}>{f.airline}</span>
            <span className={s.flightNo}>{f.flightNo}</span>
          </div>
          {f.badges.length > 0 && (
            <div
              className={s.flightBadgeRow}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {f.badges.map((b) => (
                <span key={`${f.id}-${b.label}`} className={s.badgeSlot}>
                  <Badge
                    label={b.label}
                    context={b.context}
                    muted
                  />
                </span>
              ))}
            </div>
          )}
          <div className={s.flightScheduleGrid}>
            <span className={s.timeDep}>{f.dep}</span>
            <hr className={s.timeTrack} aria-hidden />
            <span className={s.timeArr}>{f.arr}</span>
            <span className={s.airportDep}>{originCode}</span>
            <span className={s.airportSpacer} aria-hidden />
            <span className={s.airportArr}>{destCode}</span>
          </div>
          <div className={s.flightMetaPriceRow}>
            <span className={s.meta}>
              {f.duration}
              {f.stops === 0 ? " · Non-stop" : ` · ${f.stops} stop(s)`}
            </span>
            <div className={s.priceGroup}>
              <span className={s.price}>{formatInr(f.price)}</span>
              <span className={s.chevron} aria-hidden>
                <ChevronRightIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderResults = (isReturn: boolean) => {
    const list = isReturn ? filteredReturn : filteredOutbound;
    const filter = isReturn ? returnFilter : resultsFilter;
    const setFilter = isReturn ? setReturnFilter : setResultsFilter;
    const selected = isReturn ? selectedReturn : selectedOutbound;
    const title = isReturn ? "Choose return flight" : "Choose outbound flight";
    const sub = `${to.code} → ${from.code} · ${returnDate}`;

    return (
      <>
        <HeaderDefault
          size="medium"
          title={title}
          subTitle={isReturn ? sub : `${from.code} → ${to.code} · ${departDate}`}
          showBack
          onBackClick={goBack}
        />
        <div className={s.stepScroll}>
          <div className={s.chipRow}>
            <Chips
              type="normal"
              label="All flights"
              selected={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <Chips
              type="normal"
              label="Non-stop"
              selected={filter === "direct"}
              onClick={() => setFilter("direct")}
            />
          </div>
          {list.map((f) =>
            renderFlightCard(
              f,
              selected?.id === f.id,
              () => (isReturn ? pickReturn(f) : pickOutbound(f)),
              isReturn ? to.code : from.code,
              isReturn ? from.code : to.code,
            ),
          )}
        </div>
      </>
    );
  };

  const renderFare = () => (
    <>
      <HeaderDefault
        size="medium"
        title="Choose fare"
        subTitle={`${cabin} · ${adults} traveller${adults > 1 ? "s" : ""}`}
        showBack
        onBackClick={goBack}
      />
      <div className={s.stepScroll}>
        {selectedOutbound && (
          <Card>
            <div className={s.reviewBlock}>
              <div className={s.reviewLine}>
                <span className={s.reviewKey}>Outbound</span>
                <span className={s.reviewVal}>
                  {selectedOutbound.airline} {selectedOutbound.flightNo}
                </span>
              </div>
              <div className={s.reviewLine}>
                <span className={s.reviewKey}>Time</span>
                <span className={s.reviewVal}>
                  {selectedOutbound.dep} — {selectedOutbound.arr}
                </span>
              </div>
            </div>
          </Card>
        )}
        {tripTab === "rt" && selectedReturn && (
          <Card>
            <div className={s.reviewBlock}>
              <div className={s.reviewLine}>
                <span className={s.reviewKey}>Return</span>
                <span className={s.reviewVal}>
                  {selectedReturn.airline} {selectedReturn.flightNo}
                </span>
              </div>
              <div className={s.reviewLine}>
                <span className={s.reviewKey}>Time</span>
                <span className={s.reviewVal}>
                  {selectedReturn.dep} — {selectedReturn.arr}
                </span>
              </div>
            </div>
          </Card>
        )}
        <div className={s.fareOptions}>
          {(Object.keys(FARES) as FareId[]).map((id) => {
            const tier = FARES[id];
            const extra = tier.add * adults * (tripTab === "rt" && selectedReturn ? 2 : 1);
            return (
              <Card
                key={id}
                customClass={cx(s.fareCard, fareId === id && s.flightCardSelected)}
                onClick={() => setFareId(id)}
              >
                <div className={s.fareCardInner}>
                  <div className={s.fareName}>{tier.name}</div>
                  <div className={s.fareDesc}>{tier.desc}</div>
                  <div className={s.farePrice}>
                    +{formatInr(extra)} vs base
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <Button
          type="filled"
          size="large"
          label="Continue to traveller details"
          disabled={!fareId}
          onClick={() => setStep("passengers")}
        />
      </div>
    </>
  );

  const renderPassengers = () => (
    <>
      <HeaderDefault
        size="medium"
        title="Traveller details"
        subTitle={`Adult 1 · ${cabin}`}
        showBack
        onBackClick={goBack}
      />
      <div className={s.stepScroll}>
        {passengerError && (
          <Alerts
            active
            layout="inline"
            context="negative"
            title="Check details"
            subTitle={passengerError}
            showDismissIcon
            triggerClose={() => setPassengerError("")}
            customClass={s.inlineAlert}
          />
        )}
        <div className={s.formStack}>
          <TextField
            emphasis="low"
            label="First name"
            value={firstName}
            onChange={setFirstName}
          />
          <TextField
            emphasis="low"
            label="Last name"
            value={lastName}
            onChange={setLastName}
          />
          <TextField
            emphasis="low"
            label="Email"
            value={email}
            onChange={setEmail}
            inputProps={{ type: "email", autoComplete: "email" }}
          />
          <TextField
            emphasis="low"
            label="Mobile number"
            value={phone}
            onChange={setPhone}
            inputProps={{ type: "tel", inputMode: "numeric", autoComplete: "tel" }}
          />
        </div>
        <Button
          type="filled"
          size="large"
          label="Review & pay"
          onClick={validatePassengers}
        />
      </div>
    </>
  );

  const renderReview = () => (
    <>
      <HeaderDefault
        size="medium"
        title="Review"
        subTitle="Check before you pay"
        showBack
        onBackClick={goBack}
      />
      <div className={s.stepScroll}>
        <Card>
          <div className={s.reviewBlock}>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Route</span>
              <span className={s.reviewVal}>
                {from.code} ↔ {to.code}
              </span>
            </div>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Dates</span>
              <span className={s.reviewVal}>
                {departDate}
                {tripTab === "rt" ? ` · ${returnDate}` : ""}
              </span>
            </div>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Travellers</span>
              <span className={s.reviewVal}>
                {adults} · {cabin}
              </span>
            </div>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Fare</span>
              <span className={s.reviewVal}>
                {fareId ? FARES[fareId].name : "—"}
              </span>
            </div>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Passenger</span>
              <span className={s.reviewVal}>
                {firstName} {lastName}
              </span>
            </div>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Contact</span>
              <span className={s.reviewVal}>{email}</span>
            </div>
            <div className={s.reviewLine}>
              <span className={s.reviewKey}>Total</span>
              <span className={s.reviewVal}>{formatInr(grandTotal)}</span>
            </div>
          </div>
        </Card>
        <Button
          type="filled"
          size="large"
          label={`Pay ${formatInr(grandTotal)}`}
          onClick={confirmPay}
        />
      </div>
    </>
  );

  const renderSuccess = () => (
    <div className={s.successPanel}>
      <h1 className={s.successTitle}>Booking confirmed</h1>
      <p className={s.successSub}>
        We’ve sent the itinerary to {email}. This is a demo flow — no real ticket
        was issued.
      </p>
      <div className={s.refPill} data-testid="booking-ref">
        {bookingRef}
      </div>
      <Button type="filled" size="large" label="Book another flight" onClick={resetFlow} />
    </div>
  );

  return (
    <div className={s.shell} data-testid="flight-booking-flow">
      {step === "home" ? (
        <>
          <HeaderDefault
            size={homeHeaderCompact ? "medium" : "large"}
            title="Flights"
            subTitle="Search domestic & international"
            showBack
            onBackClick={() => undefined}
            TrailingIcons={[trailingNotifications, trailingSettings]}
            customClass={s.homeHeader}
          />
          <div className={s.scroll} onScroll={handleHomeScroll}>
            {renderHomeBody()}
          </div>
          {renderHomeNav()}
        </>
      ) : (
        <div className={s.scroll}>
          {step === "results" && renderResults(false)}
          {step === "returnResults" && renderResults(true)}
          {step === "fare" && renderFare()}
          {step === "passengers" && renderPassengers()}
          {step === "review" && renderReview()}
          {step === "success" && renderSuccess()}
        </div>
      )}
      <div id={portalHostId} className={s.portalHost} aria-hidden />
      {renderSheets()}
    </div>
  );
};

export default React.memo(FlightBookingFlow);
