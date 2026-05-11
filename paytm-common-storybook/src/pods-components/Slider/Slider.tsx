import React, { useLayoutEffect, useRef } from "react";
import { SliderProps } from "./Slider.types";
import s from './Slider.module.scss';
import cx from "../../utils/classNames";
import { triggerCallback } from "../../utils/utils";

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  onChange,
  value,
  customClass = ''
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (sliderRef.current) {
      const temp = ((value.key - min.key) / (max.key - min.key)) * 100;
      sliderRef.current.style.setProperty('--slider-width', `${temp}%`);
    }
  }, [value.key])

  return (
    <section data-testid="slider-container" className={cx(s.sliderContainer, customClass)}>
      <div className={s.rangeValue}>
        <h5 data-testid="slider-value">{value.text}</h5>
        <input
          aria-label="slider"
          ref={sliderRef}
          type="range"
          min={min.key}
          max={max.key}
          value={value.key}
          className={s.slider}
          id="sliderRange"
          data-testid="slider-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            triggerCallback(onChange, parseInt(val, 10));
          }}
        />
      </div>
      <div data-testid="slider-range-texts" className={s.rangeTexts}>
        <p data-testid="slider-min-text">{min.text}</p>
        <p data-testid="slider-max-text">{max.text}</p>
      </div>
    </section>
  );
};

export default Slider;
