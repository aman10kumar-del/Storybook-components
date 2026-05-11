import React, { useEffect, useMemo, useState } from "react";

import Button from "../../pods-components/Button/Button";
import { ReactComponent as ChevronLeftIcon } from "../../assets/ultra-icons/system/nav/chevron_left.svg";
import { ReactComponent as ChevronRightIcon } from "../../assets/ultra-icons/system/nav/chevron_right.svg";
import cx from "../../utils/classNames";

import s from "./FlightDateCalendar.module.scss";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function formatFlightDateLabel(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function parseFlightDateLabel(label: string): Date | null {
  const t = Date.parse(label);
  if (Number.isNaN(t)) return null;
  return startOfDay(new Date(t));
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export type FlightDateCalendarProps = {
  selectedLabel: string;
  /** Earliest selectable day (e.g. departure date for return picker). */
  minLabel?: string;
  onSelect: (label: string) => void;
};

const FlightDateCalendar: React.FC<FlightDateCalendarProps> = ({
  selectedLabel,
  minLabel,
  onSelect,
}) => {
  const today = useMemo(() => startOfDay(new Date()), []);

  const minSelectable = useMemo(() => {
    const fromMin = minLabel ? parseFlightDateLabel(minLabel) : null;
    if (fromMin && fromMin.getTime() > today.getTime()) return fromMin;
    return today;
  }, [minLabel, today]);

  const selected = useMemo(() => {
    const parsed = parseFlightDateLabel(selectedLabel);
    if (!parsed) return minSelectable;
    if (parsed.getTime() < minSelectable.getTime()) return minSelectable;
    return parsed;
  }, [selectedLabel, minSelectable]);

  const maxMonthStart = useMemo(
    () => addMonths(startOfMonth(today), 13),
    [today],
  );

  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(selected),
  );

  useEffect(() => {
    const parsed = parseFlightDateLabel(selectedLabel);
    const minT = minSelectable.getTime();
    const focus =
      parsed && parsed.getTime() >= minT ? parsed : minSelectable;
    setViewMonth(startOfMonth(focus));
  }, [selectedLabel, minSelectable]);

  const monthTitle = viewMonth.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const viewStart = startOfMonth(viewMonth).getTime();
  const minMonthStart = startOfMonth(minSelectable).getTime();
  const maxStart = maxMonthStart.getTime();

  const canPrev = viewStart > minMonthStart;
  const canNext = viewStart < maxStart;

  const cells = useMemo(() => {
    const lastDay = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0,
    ).getDate();
    const first = startOfMonth(viewMonth);
    const lead = (first.getDay() + 6) % 7;
    const out: ({ kind: "blank" } | { kind: "day"; date: Date })[] = [];
    for (let i = 0; i < lead; i += 1) out.push({ kind: "blank" });
    for (let day = 1; day <= lastDay; day += 1) {
      out.push({
        kind: "day",
        date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day),
      });
    }
    while (out.length % 7 !== 0) out.push({ kind: "blank" });
    return out;
  }, [viewMonth]);

  return (
    <div className={s.root}>
      <div className={s.monthNav}>
        <Button
          type="stroke"
          size="medium"
          ariaLabel="Previous month"
          disabled={!canPrev}
          LeadingIcon={<ChevronLeftIcon aria-hidden />}
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
        />
        <span className={s.monthTitle}>{monthTitle}</span>
        <Button
          type="stroke"
          size="medium"
          ariaLabel="Next month"
          disabled={!canNext}
          LeadingIcon={<ChevronRightIcon aria-hidden />}
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
        />
      </div>
      <div className={s.weekdays}>
        {WEEKDAYS.map((w) => (
          <span key={w} className={s.weekday}>
            {w}
          </span>
        ))}
      </div>
      <div className={s.grid}>
        {cells.map((cell, idx) => {
          if (cell.kind === "blank") {
            return <div key={`b-${idx}`} className={s.cellPad} aria-hidden />;
          }
          const d = startOfDay(cell.date);
          const disabled = d.getTime() < minSelectable.getTime();
          const isSelected = isSameDay(d, selected);
          const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              className={cx(s.day, isSelected && s.daySelected, disabled && s.dayDisabled)}
              aria-label={formatFlightDateLabel(d)}
              aria-pressed={isSelected}
              onClick={() => onSelect(formatFlightDateLabel(d))}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FlightDateCalendar;
