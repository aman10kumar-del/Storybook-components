import React, { useState, useEffect, useRef } from 'react';

import { DropDownProps } from './Dropdown.types';
import BottomSheet from '../BottomSheet/BottomSheet';
import Search from '../Search/Search';
import List from '../List/List';
import { onEnter, triggerCallback } from '../../utils/utils';
import cx from "../../utils/classNames";
import s from './Dropdown.module.scss';
import ListItem from '../List/ListItem';
import SectionHeader from '../SectionHeader/SectionHeader';
import { ReactComponent as CrossIcon } from "../../assets/ultra-icons/system/nav/dismiss.svg";
import NotFound from "../../assets/img/empty.png";

const Dropdown : React.FC<DropDownProps> = function ({
  label = "",
  value = { id: "", text: "" },
  options = [],
  onChange,
  iText = "",
  error = "",
  disabled = false,
  LeadingIcon,
  sKey = "id",
  sValue = "text",
  customClassDropdown = "",
  customClassBottomSheet = "",
  attachToElementID,
  bottomSheetHeaderProps,
  bottomSheetSearchProps,
  emphasis = "low"
}) {
  const [showList, setShowList] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [initialHeight, setInitialHeight] = useState<number | null>(null)
  const childContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showList && childContainerRef.current && !initialHeight) {
      setInitialHeight(childContainerRef.current.offsetHeight)
    }
  }, [showList, initialHeight])

  const onSearchValueChange = (value: string) => {
    setSearchValue(value)
  }

  const getDismissIcon = () => {
    return (
      <CrossIcon 
        className={s.dismissIcon}
        onClick={() => {
          setShowList(false)
        }}
      />
    )
  }

  const getTrailingIconsForHeader = () => {
    const trailingIcons = [getDismissIcon()];
    if (bottomSheetHeaderProps?.TrailingIcons?.length) {
      trailingIcons.unshift(bottomSheetHeaderProps?.TrailingIcons[0])
    }
    return trailingIcons
  }

  const getFilteredOptions = () => {
    return options
      ?.filter(option => option[sValue].toLowerCase().includes(searchValue.toLowerCase()))
  }

  return (
    <div className={cx(s.dropdownContainer, customClassDropdown)}>
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        className={cx(s.dropdown, {
          [s.isError]: error,
          [s.disabled]: disabled,
          [s.lowEmphasis]: emphasis === 'low'
        })}
        data-testid="dropdown"
        onClick={() => { 
          if (disabled) {
            return;
          }
          setShowList(true) 
        }}
        onKeyUp={(e) => {
					onEnter(e, () => { setShowList(true) })
				}}
      >
        {LeadingIcon && <span className={s.icon}>{LeadingIcon}</span>}
        <span className={cx(s.value, {
          [s.lowEmphasis]: emphasis === 'low'
        })} data-testid="value">{value[sValue]}</span>
        <span className={cx(s.caret, {
            [s.up]: showList
          })}
        />
        <span
          role="term"
          className={cx(s.label, {
            [s.alignToTop]: value[sKey],
            [s.extraLeftPadding]: LeadingIcon && !value[sKey],
            [s.lowEmphasis]: emphasis === 'low'
          })}
          data-testid="label"
        >
          {label}
        </span>
      </div>
      {(error || iText) && (
        <section
          role="note"
          className={cx(s.infoSection, {
            [s.disabled]: disabled
          })}
        >
          {error && <span className={cx(s.error, {
            [s.lowEmphasis]: emphasis === 'low'
          })}>{error}</span>}
          {!error && iText && <span className={cx(s.iText, {
            [s.lowEmphasis]: emphasis === 'low'
          })}>{iText}</span>}
        </section>
      )}

      <BottomSheet
        showCloseIcon={false}
        active={showList}
        triggerClose={() => {
          setShowList(false)
        }}
        customClass={cx(s.bottomSheet, customClassBottomSheet)}
        attachToElementID={attachToElementID}
      >
        <div 
          ref={childContainerRef} 
          className={s.childContainer}
          style={initialHeight ? { height: `${initialHeight}px` } : undefined}
        >
          <SectionHeader
            {...bottomSheetHeaderProps} 
            title={bottomSheetHeaderProps?.title || label}
            size={bottomSheetHeaderProps?.size || "large"}
            customClass={cx(bottomSheetHeaderProps?.customClass, s.bottomSheetHeader)}
            TrailingIcons={getTrailingIconsForHeader()}
          />
          {(options?.length > 10 || Object.keys(bottomSheetSearchProps || {}).length > 0) && (
            <div className={s.searchContainer} data-testid="search">
              <Search
                debounceInterval={0}
                {...bottomSheetSearchProps}
                stroke
                onChange={onSearchValueChange}
                onClear={() => setSearchValue("")}
                customClass={cx(bottomSheetSearchProps?.customClass, s.search)}
              />
            </div>
          )}
          <List customClass={s.listOption}>
            {getFilteredOptions()?.map(option => (
                <ListItem
                  key={option[sKey]}
                  id={option[sKey]}
                  primary={option[sValue]}
                  leading={{
                    type: "radio",
                    radio: {
                      name: "search-val",
                      checked: option[sKey] === value[sKey],
                      onChecked: () => {},
                      value: option[sValue]
                    }
                  }}
                  onClick={() => {
                    setShowList(false);
                    triggerCallback(onChange, option);
                  }}
                />
              ))}
              {getFilteredOptions()?.length === 0 && (
                <div className={s.emptyState}>
                  <img src={NotFound} alt="No results" />
                  <span className={s.emptyStateText}>No results found</span>
                </div>
              )}
          </List>
        </div>
      </BottomSheet>
    </div>
  )
}

export default Dropdown;
