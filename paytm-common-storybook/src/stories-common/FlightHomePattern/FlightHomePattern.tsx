import React, { useCallback, useState } from "react";

import BottomNavBar from "../../pods-components/BottomNavBar/BottomNavBar";
import Button from "../../pods-components/Button/Button";
import Card from "../../pods-components/Card/Card";
import { HeaderDefault } from "../../pods-components/Header/Header";
import List from "../../pods-components/List/List";
import ListItem from "../../pods-components/List/ListItem";
import SectionHeader from "../../pods-components/SectionHeader/SectionHeader";
import SegmentedControl from "../../pods-components/SegmentedControl/SegmentedControl";
import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import { ReactComponent as HomeIcon } from "../../assets/ultra-icons/system/category/home.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/ultra-icons/system/action/notifications.svg";
import { ReactComponent as RoundTripIcon } from "../../assets/ultra-icons/system/action/round_trip.svg";
import { ReactComponent as ScanQrIcon } from "../../assets/ultra-icons/system/category/scan_qr_code.svg";
import { ReactComponent as SendIcon } from "../../assets/ultra-icons/system/category/send.svg";
import { ReactComponent as SettingsIcon } from "../../assets/ultra-icons/system/action/settings.svg";
import { ReactComponent as SupportIcon } from "../../assets/ultra-icons/system/category/support.svg";
import { onEnter, triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";

import s from "./FlightHomePattern.module.scss";

export interface FlightHomePatternProps {
  onBack?: () => void;
  onSwapCities?: () => void;
  onSearchFlights?: () => void;
  onSelectRecent?: (id: string) => void;
  onNav?: (id: string) => void;
}

const FlightHomePattern: React.FC<FlightHomePatternProps> = ({
  onBack,
  onSwapCities,
  onSearchFlights,
  onSelectRecent,
  onNav,
}) => {
  const [fromCode, setFromCode] = useState("DEL");
  const [fromCity, setFromCity] = useState("New Delhi");
  const [toCode, setToCode] = useState("BOM");
  const [toCity, setToCity] = useState("Mumbai");

  const swap = useCallback(() => {
    setFromCode(toCode);
    setToCode(fromCode);
    setFromCity(toCity);
    setToCity(fromCity);
    triggerCallback(onSwapCities);
  }, [fromCity, fromCode, onSwapCities, toCity, toCode]);

  const trailingNotifications = (
    <NotificationsIcon
      role="button"
      tabIndex={0}
      aria-label="Notifications"
      style={{ cursor: "pointer" }}
      onClick={() => triggerCallback(onNav, "notifications")}
      onKeyUp={(e) => onEnter(e, () => triggerCallback(onNav, "notifications"))}
    />
  );

  const trailingSettings = (
    <SettingsIcon
      role="button"
      tabIndex={0}
      aria-label="More options"
      style={{ cursor: "pointer" }}
      onClick={() => triggerCallback(onNav, "more")}
      onKeyUp={(e) => onEnter(e, () => triggerCallback(onNav, "more"))}
    />
  );

  return (
    <div className={s.root} data-testid="flight-home-pattern">
      <HeaderDefault
        size="large"
        title="Flights"
        subTitle="Search domestic & international"
        showBack
        onBackClick={onBack}
        TrailingIcons={[trailingNotifications, trailingSettings]}
      />

      <div className={s.scroll}>
        <Card customClass={s.searchCard}>
          <div className={s.searchCardInner}>
            <div className={s.routeRow}>
              <div className={s.routeBlock}>
                <span className={s.routeCode}>{fromCode}</span>
                <span className={s.routeCity}>{fromCity}</span>
              </div>
              <div className={s.routeMid}>
                <Button
                  type="stroke"
                  size="medium"
                  ariaLabel="Swap origin and destination"
                  customClass={s.swapButton}
                  LeadingIcon={<RoundTripIcon aria-hidden />}
                  onClick={swap}
                />
              </div>
              <div className={cx(s.routeBlock, s.routeBlockEnd)}>
                <span className={s.routeCode}>{toCode}</span>
                <span className={s.routeCity}>{toCity}</span>
              </div>
            </div>

            <SegmentedControl
              controlType="uncontrolled"
              unControlled={{ initialActiveTabID: "rt" }}
              customClass={s.searchCardSegmented}
              tabs={[
                { id: "rt", title: "Round trip" },
                { id: "ow", title: "One way" },
              ]}
              onChange={() => {}}
            />

            <div className={s.dateRow}>
              <div className={s.dateCell}>
                <span className={s.dateLabel}>Depart</span>
                <span className={s.dateValue}>12 Apr 2026</span>
              </div>
              <div className={s.dateCell}>
                <span className={s.dateLabel}>Return</span>
                <span className={s.dateValue}>18 Apr 2026</span>
              </div>
            </div>

            <button
              type="button"
              className={s.paxRow}
              onClick={() => triggerCallback(onNav, "pax-class")}
            >
              <span className={s.paxTextCol}>
                <span className={s.paxPrimary}>Travellers & class</span>
                <span className={s.paxSecondary}>1 Adult · Economy</span>
              </span>
              <span className={s.paxChevronWrap} aria-hidden>
                <ChevronRightIcon />
              </span>
            </button>

            <Button
              type="filled"
              size="large"
              label="Search flights"
              onClick={() => triggerCallback(onSearchFlights)}
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
            onClick={() => triggerCallback(onNav, "promo-details")}
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
                onClick={() => triggerCallback(onNav, "offers-all")}
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
                onClick={(id) => triggerCallback(onSelectRecent, id)}
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
                onClick={(id) => triggerCallback(onSelectRecent, id)}
              />
            </List>
          </Card>
        </div>
      </div>

      <div className={s.navDock}>
        <BottomNavBar
          options={[
            {
              id: "home",
              label: "Home",
              icon: <HomeIcon aria-hidden />,
            },
            {
              id: "flights",
              label: "Flights",
              icon: <SendIcon aria-hidden />,
              active: true,
            },
            {
              id: "scan",
              label: "Scan",
              icon: <ScanQrIcon aria-hidden />,
            },
            {
              id: "help",
              label: "Help",
              icon: <SupportIcon aria-hidden />,
            },
          ]}
          onClick={(item) => triggerCallback(onNav, item.id)}
        />
      </div>
    </div>
  );
};

export default React.memo(FlightHomePattern);
