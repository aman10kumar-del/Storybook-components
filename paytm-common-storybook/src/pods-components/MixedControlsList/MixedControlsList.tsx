import React from "react";

import Card from "../Card/Card";
import List from "../List/List";
import ListItem from "../List/ListItem";
import { ReactComponent as VisibilityOffIcon } from "../../assets/ultra-icons/system/toggle/visibility_off.svg";
import { ReactComponent as InfoCircleIcon } from "../../assets/ultra-icons/standard/info.svg";
import { ReactComponent as HelpIcon } from "../../assets/ultra-icons/standard/help_and_support.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";

import s from "./MixedControlsList.module.scss";

export interface MixedControlsListProps {
  /** Controlled: hide-payment switch on state. Omit for uncontrolled. */
  hidePaymentActive?: boolean;
  /** Uncontrolled initial state (default `false` = matches Figma off). */
  defaultHidePaymentActive?: boolean;
  onHidePaymentActiveChange?: (active: boolean) => void;
  onContactSupportClick?: (id: string) => void;
  onHelpClick?: (id: string) => void;
  customClass?: string;
}

const ID_HIDE = "mixed-controls-hide-payment";
const ID_SUPPORT = "mixed-controls-contact-support";
const ID_HELP = "mixed-controls-help";

const MixedControlsList: React.FC<MixedControlsListProps> = ({
  hidePaymentActive,
  defaultHidePaymentActive = false,
  onHidePaymentActiveChange,
  onContactSupportClick,
  onHelpClick,
  customClass = "",
}) => {
  const [internalHideActive, setInternalHideActive] = React.useState(
    defaultHidePaymentActive,
  );

  const hideActive =
    hidePaymentActive !== undefined ? hidePaymentActive : internalHideActive;

  const setHideActive = React.useCallback(
    (next: boolean) => {
      if (hidePaymentActive === undefined) {
        setInternalHideActive(next);
      }
      onHidePaymentActiveChange?.(next);
    },
    [hidePaymentActive, onHidePaymentActiveChange],
  );

  const trailingChevron = (
    <ChevronRightIcon aria-hidden focusable="false" />
  );

  return (
    <div
      data-testid="mixed-controls-list"
      className={`${s.root} ${customClass}`.trim()}
    >
      <Card customClass={s.card}>
        <List>
          <ListItem
            id={ID_HIDE}
            primary="Hide payment"
            leading={{
              type: "icon",
              Icon: <VisibilityOffIcon aria-hidden focusable="false" />,
            }}
            trailing={{
              type: "switch",
              switch: {
                active: hideActive,
                accessibleName: "Hide payment",
                onToggle: () => {
                  setHideActive(!hideActive);
                },
              },
            }}
            separator
          />
          <ListItem
            id={ID_SUPPORT}
            primary="Contact Support"
            leading={{
              type: "icon",
              Icon: <InfoCircleIcon aria-hidden focusable="false" />,
            }}
            trailing={{
              type: "icon",
              Icon: trailingChevron,
            }}
            onClick={() => onContactSupportClick?.(ID_SUPPORT)}
            separator
          />
          <ListItem
            id={ID_HELP}
            primary="Help"
            leading={{
              type: "icon",
              Icon: <HelpIcon aria-hidden focusable="false" />,
            }}
            trailing={{
              type: "icon",
              Icon: trailingChevron,
            }}
            onClick={() => onHelpClick?.(ID_HELP)}
            separator={false}
          />
        </List>
      </Card>
    </div>
  );
};

export default React.memo(MixedControlsList);
