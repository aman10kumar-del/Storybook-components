import { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  HeaderRegularAvatar,
  Search,
} from "@paytm-h5-common/paytm_common_ui";
import { NotificationsIcon, ShopIcon } from "@paytm-h5-common/paytm_common_ui/icons";
import { useAppScreenSelection } from "../AppScreenSelectionContext";
import {
  formatStoreHomeSubtitle,
  useSelectedStoreHome,
} from "../SelectedStoreContext";
import { HOME_PAGE_SCREEN_ID, LOGIN_DETAILS_SCREEN_ID } from "../screens";
import { MobilePreviewFrame } from "./MobilePreviewFrame";
import s from "./loginScreens.module.scss";
import us from "./userScreen.module.scss";

type Store = {
  id: string;
  name: string;
  mid: string;
  address: string;
};

const STORES: Store[] = [
  {
    id: "1",
    name: "Bharat Electronics",
    mid: "MID · PXIQZ34665245852301",
    address: "12, MG Road, Bengaluru — 560001",
  },
  {
    id: "2",
    name: "Vijay Sales — Koramangala",
    mid: "MID · PXIQZ34665245852302",
    address: "80 Feet Rd, 4th Block, Koramangala, Bengaluru — 560034",
  },
  {
    id: "3",
    name: "Balram Enterprises",
    mid: "MID · PXIQZ34665245852303",
    address: "Shop 4, Commercial Complex, Sector 18, Noida — 201301",
  },
  {
    id: "4",
    name: "Siddharth Retail",
    mid: "MID · PXIQZ34665245852304",
    address: "Plot 22, Ring Road, Rajouri Garden, New Delhi — 110027",
  },
  {
    id: "5",
    name: "Metro Digital Hub",
    mid: "MID · PXIQZ34665245852305",
    address: "Ground Floor, Phoenix Mall, Lower Parel, Mumbai — 400013",
  },
  {
    id: "6",
    name: "Prime Mobile Store",
    mid: "MID · PXIQZ34665245852306",
    address: "88, Anna Salai, Teynampet, Chennai — 600018",
  },
  {
    id: "7",
    name: "City Electronics",
    mid: "MID · PXIQZ34665245852307",
    address: "Block A, City Centre Mall, Salt Lake, Kolkata — 700091",
  },
  {
    id: "8",
    name: "North Star Outlets",
    mid: "MID · PXIQZ34665245852308",
    address: "NH-8 Service Rd, Sector 29, Gurugram — 122001",
  },
];

export function UserScreen() {
  const goToScreen = useAppScreenSelection();
  const { setSelectedStoreHome } = useSelectedStoreHome();
  const [query, setQuery] = useState("");

  const filteredStores = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STORES;
    return STORES.filter(
      (store) =>
        store.name.toLowerCase().includes(q) ||
        store.mid.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <MobilePreviewFrame>
      <div className={s.appCanvas}>
        <div className={`${s.scroll} ${us.userScreenScroll}`}>
          <div className={s.inner}>
            <div className={us.userStickyChrome}>
              <HeaderRegularAvatar
                reserveSpaceForStatusBar
                showBack
                onBackClick={() => goToScreen?.(LOGIN_DETAILS_SCREEN_ID)}
                title="Welcome Aman Kumar"
                subTitle="8 Stores mapped to your ID #54637"
                avatarProps={{
                  type: "initials",
                  avatarInitials: {
                    initials: "AK",
                    initialsColor: "lavender",
                  },
                }}
                TrailingIcons={[
                  <button
                    key="notifications"
                    type="button"
                    aria-label="Notifications"
                    onClick={() => undefined}
                  >
                    <NotificationsIcon role="presentation" />
                  </button>,
                ]}
              />
              <div className={us.searchBlock}>
                <Search
                  label="Search stores"
                  onChange={(value) => setQuery(value)}
                  onClear={() => setQuery("")}
                />
              </div>
            </div>

            <div className={us.storeList}>
              {filteredStores.map((store) => (
                <Card key={store.id} customClass={us.storeCard}>
                  <div className={us.storeCardRow}>
                    <Avatar
                      type="icon"
                      size="regular"
                      avatarIcon={{
                        Icon: <ShopIcon role="presentation" />,
                      }}
                    />
                    <div className={us.storeCardBody}>
                      <div className={us.storeTextCluster}>
                        <p className={us.storeName}>{store.name}</p>
                        <div className={us.storeMetaStack}>
                          <p className={us.storeMid}>{store.mid}</p>
                          <p className={us.storeAddress}>{store.address}</p>
                        </div>
                      </div>
                      <Button
                        type="filled"
                        size="medium"
                        label="View details"
                        onClick={() => {
                          setSelectedStoreHome({
                            id: store.id,
                            name: store.name,
                            subtitle: formatStoreHomeSubtitle(store.address),
                          });
                          goToScreen?.(HOME_PAGE_SCREEN_ID);
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className={s.homeIndicator} aria-hidden>
          <div className={s.homeIndicatorBar} />
        </div>
      </div>
    </MobilePreviewFrame>
  );
}
