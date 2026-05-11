import React, { useRef, useState } from "react";

import { SearchProps } from "./Search.types";
import { debounce, triggerCallback } from "../../utils/utils";
import { ReactComponent as SearchIcon } from "../../assets/ultra-icons/system/action/search.svg";
import { ReactComponent as CrossIcon } from "../../assets/ultra-icons/system/nav/dismiss.svg";
import cx from "../../utils/classNames";
import s from "./Search.module.scss";
import SearchSwitch from "./SearchSwitch";

const Search: React.FC<SearchProps> = ({
  label = "Search",
  debounceInterval = 200,
  onChange,
  onClear,
  TrailingIcon,
  customClass = "",
  inputProps = {},
  showDismissIcon = true,
  LeadingIcon,
  stroke = false,
  defaultInputMode = 'text',
  onInputModeChange,
  showInputModeSwitch = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputMode, setInputMode] = useState<'text' | 'numeric'>(defaultInputMode);

  const handleInputModeChange = (mode: 'text' | 'numeric') => {
    setInputMode(mode);
    triggerCallback(onInputModeChange, mode);
  };

  return (
    <div
      role="searchbox"
      aria-label={label}
      data-testid="search-container"
      className={cx(s.searchFieldContainer, customClass, {
        [s.stroke]: stroke,
      })}
    >
      <span className={cx(s.icon, s.searchIcon)}>
        {LeadingIcon || <SearchIcon />}
      </span>
      <input
        data-testid="search-field"
        type="text"
        placeholder={label}
        onChange={debounce((e: any) => {
          triggerCallback(onChange, e?.target?.value);
        }, debounceInterval)}
        ref={inputRef}
        inputMode={inputMode}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
      />
      {showDismissIcon && (
        <span
          role="button"
          aria-label="clear"
          id="clear-icon"
          tabIndex={0}
          data-testid="clear-icon"
          className={cx(s.icon, s.crossIcon)}
          onMouseDown={() => {
            if (!inputRef.current) {
              return;
            }
            inputRef.current.value = "";
            // TODO: Improve this
            setTimeout(() => {
              if (!inputRef.current) {
                return;
              }
              inputRef.current!.focus();
            }, 0)
            triggerCallback(onClear);
          }}
        >
          <CrossIcon />
        </span>
      )}
      {showInputModeSwitch && (
        <SearchSwitch
          value={inputMode}
          onChange={handleInputModeChange}
        />
      )}
      {TrailingIcon && (
        <span data-testid="trailing-icon" className={cx(s.icon, s.trailingIcon)}>{TrailingIcon}</span>
      )}
    </div>
  );
};

export default React.memo(Search);
