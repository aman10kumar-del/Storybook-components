import { useState } from "react";
import {
  Button,
  Card,
  HeaderDefault,
  List,
  ListItem,
} from "@paytm-h5-common/paytm_common_ui";
import { MenuOverflowIcon } from "@paytm-h5-common/paytm_common_ui/icons";
import { MobilePreviewFrame } from "./MobilePreviewFrame";
import s from "./emiScreens.module.scss";

const MERCHANTS = [
  {
    id: "bharat",
    name: "Bharat Enterprises",
    mid: "PXIQZ34665245852304",
    address: "Sarjapur Road, Bangalore, 560066",
    badge: "Active" as const,
  },
  {
    id: "vijay",
    name: "Vijay Sales",
    mid: "PXIQZ34665245852304",
    address: "Sarjapur Road, Bangalore, 560066",
    badge: "Primary" as const,
  },
  {
    id: "balram",
    name: "Balram Enterprises",
    mid: "PXIQZ34665245852304",
    address: "Sarjapur Road, Bangalore, 560066",
    badge: "Active" as const,
  },
  {
    id: "siddharth",
    name: "Siddharth Enterprises",
    mid: "PXIQZ34665245852304",
    address: "Sarjapur Road, Bangalore, 560066",
    badge: "Active" as const,
  },
];

export function SelectBusinessV3Screen() {
  const [selected, setSelected] = useState("bharat");

  const overflow = (
    <MenuOverflowIcon
      role="button"
      tabIndex={0}
      aria-label="More options"
      style={{ cursor: "pointer" }}
      onClick={() => undefined}
    />
  );

  return (
    <MobilePreviewFrame>
      <div className={s.flowRoot}>
        <HeaderDefault
          size="medium"
          reserveSpaceForStatusBar
          title="Select business"
          TrailingIcons={[overflow]}
        />
        <div className={s.selectScroll}>
          <div className={s.cardStack}>
            {MERCHANTS.map((m) => (
              <Card key={m.id} customClass={s.fullWidth}>
                <List>
                  <ListItem
                    id={m.id}
                    primary={m.name}
                    secondary={`MID · ${m.mid}`}
                    tertiary={m.address}
                    leading={{
                      type: "radio",
                      radio: {
                        name: "merchant",
                        value: m.id,
                        checked: selected === m.id,
                        onChecked: () => setSelected(m.id),
                        emphasis: "high",
                      },
                    }}
                    trailing={{
                      type: "badge",
                      badge: {
                        context: m.badge === "Primary" ? "primary" : "positive",
                        label: m.badge,
                        muted: m.badge === "Primary",
                      },
                    }}
                    separator={false}
                    onClick={() => setSelected(m.id)}
                  />
                </List>
              </Card>
            ))}
          </div>
        </div>
        <div className={s.ctaDock}>
          <Button
            type="filled"
            size="large"
            label="Proceed"
            customClass={s.fullWidth}
            onClick={() => undefined}
          />
        </div>
      </div>
    </MobilePreviewFrame>
  );
}
