import React, { Fragment } from "react";
import { ActionSheetProps } from "./ActionSheet.types";
import s from "./ActionSheet.module.scss";
import Separator from "../Separator/Separator";
import BottomSheet from "../BottomSheet/BottomSheet";
import cx from "../../utils/classNames";
import List from "../List/List";
import { triggerCallback } from "../../utils/utils";
import ListItem from "../List/ListItem";

const ActionSheet: React.FC<ActionSheetProps> = ({
  options = [],
  customClass = '',
  onClick,
  closeButtonText = 'Close',
  reserveSpaceForBottomBar = false,
  active = true,
  triggerClose,
  ListItemProps,
  attachToElementID
}) => {

  const renderList = () => {
    if (!ListItemProps || !Object.keys(ListItemProps || {}).length) {
      return null;
    }
    return (
      <Fragment>
        <List>
          <ListItem 
            {...ListItemProps}  
            separator={false}
          />
        </List>
        <Separator hairline />
      </Fragment>
    )
  }

  const renderChild = () => {
    return (
      <React.Fragment>
        <section
          data-testid="action-sheet-container"
          className={cx(s.sheetContainer, customClass)}
        >
          {renderList()}
          <ul
            role="menu"
            className={cx(s.sheetList, {
              [s.dynamiceHeight]: reserveSpaceForBottomBar
            })}
          >
            {options?.map((option, index) => {
              const {
                id, LeadingIcon, label, type = "default", disabled, separator = true
              } = option;
              return (
                <li
                  role="menuitem"
                  key={id}
                  className={cx(s.sheetItem, {
                    [s.disabledItem]: disabled && type === "default",
                    [s.destructiveItem]: type === "destructive"
                  })}
                  data-testid={`sheet-item-${index}`}
                  onClick={() => {
                    if (!disabled) {
                      triggerCallback(onClick, option);
                      triggerCallback(triggerClose);
                    }
                  }}
                >
                  {LeadingIcon && (
                    <section className={cx(s.leadingSection)}>
                      <span
                        data-testid="leading-icon"
                        className={cx(s.leadingIcon)}
                      >
                        {LeadingIcon}
                      </span>
                    </section>
                  )}
                  <section className={s.mainSection}>
                    <div
                      data-testid="label-container"
                      className={cx(s.labelContainer)}
                    >
                      <span className={s.label}>{label}</span>
                    </div>
                    {separator && index !== options.length - 1 ? (
                      <div className={s.separator} data-testid="separator-item">
                        <Separator hairline />
                      </div>
                    ) : null}
                  </section>
                </li>
              );
            })}
          </ul>
        </section>
        <section
          role="button"
          tabIndex={0}
          data-testid="bottom-cta"
          className={s.closeSheet}
          onClick={() => triggerCallback(triggerClose)}
        >
          <div className={s.closeButton}>
            <span>{closeButtonText}</span>
          </div>
        </section>
      </React.Fragment>
    );
  }

  return (
    <BottomSheet
      customClass={s.bottomSheet}
      showCloseIcon={false}
      triggerClose={triggerClose}
      active={active}
      reserveSpaceForBottomBar={reserveSpaceForBottomBar}
      attachToElementID={attachToElementID}
    >
      {renderChild()}
    </BottomSheet>
  );
};

export default ActionSheet;
