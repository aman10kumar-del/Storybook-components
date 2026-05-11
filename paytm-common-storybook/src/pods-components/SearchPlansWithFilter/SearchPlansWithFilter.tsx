import React, { useRef } from "react";

import { ReactComponent as SearchIcon } from "../../assets/ultra-icons/system/action/search.svg";
import { ReactComponent as DismissIcon } from "../../assets/ultra-icons/system/nav/dismiss.svg";
import { ReactComponent as FilterIcon } from "../../assets/ultra-icons/system/action/filter.svg";
import Loader from "../Loader/Loader";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import type { SearchPlansWithFilterProps } from "./SearchPlansWithFilter.types";
import s from "./SearchPlansWithFilter.module.scss";

const SearchPlansWithFilter: React.FC<SearchPlansWithFilterProps> = ({
  value,
  onChange,
  placeholder = "Search plans",
  searchAriaLabel,
  disabled = false,
  loading = false,
  error = "",
  assistiveText = "",
  showAssistiveWhenNoError = true,
  customClass = "",
  inputProps = {},
  LeadingIcon,
  showClearButton = true,
  onClear,
  showFilter = true,
  filterLabel = "Filter",
  onFilterClick,
  filterActive = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const resolvedAriaLabel = searchAriaLabel ?? placeholder;

  const {
    onChange: inputOnChange,
    ...restInputProps
  } = inputProps;

  const handleClear = () => {
    onChange("");
    triggerCallback(onClear);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <div
      data-testid="search-plans-with-filter"
      className={cx(s.root, customClass)}
      role="search"
    >
      <div className={s.row}>
        <div
          className={cx(s.pill, {
            [s.error]: Boolean(error),
            [s.disabled]: disabled && !loading,
            [s.loading]: loading,
          })}
        >
          <span className={s.searchIcon} aria-hidden>
            {LeadingIcon || <SearchIcon />}
          </span>
          {loading ? (
            <div className={s.loaderWrap}>
              <Loader type="theme" size="small" />
            </div>
          ) : (
            <>
              <input
                ref={inputRef}
                data-testid="search-plans-input"
                className={s.input}
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                aria-label={resolvedAriaLabel}
                aria-invalid={Boolean(error)}
                onChange={(e) => {
                  triggerCallback(inputOnChange, e);
                  onChange(e.target.value);
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...restInputProps}
              />
              {showClearButton && Boolean(value) && (
                <button
                  type="button"
                  data-testid="search-plans-clear"
                  className={s.clearButton}
                  disabled={disabled}
                  aria-label="Clear search"
                  onClick={handleClear}
                >
                  <DismissIcon />
                </button>
              )}
            </>
          )}
        </div>
        {showFilter && (
          <button
            type="button"
            data-testid="search-plans-filter"
            className={s.filter}
            disabled={disabled || loading}
            aria-pressed={filterActive}
            onClick={() => triggerCallback(onFilterClick)}
          >
            <span className={s.filterIcon}>
              <FilterIcon />
            </span>
            <span className={s.filterLabel}>{filterLabel}</span>
          </button>
        )}
      </div>
      {(error || (assistiveText && showAssistiveWhenNoError && !error)) && (
        <section className={s.infoSection} role="note">
          {error ? (
            <span data-testid="search-plans-error" className={s.errorText}>
              {error}
            </span>
          ) : (
            <span data-testid="search-plans-assistive">{assistiveText}</span>
          )}
        </section>
      )}
    </div>
  );
};

export default React.memo(SearchPlansWithFilter);
