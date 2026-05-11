import React from "react";
import {render, screen} from "@testing-library/react";
import { fireEvent } from '@testing-library/dom';
import Slider from './Slider';

describe("Test Slider", () => {
  test("is present", () => {
    render((
      <Slider
      onChange={() => {}}
      min={{
        key: 7000,
        text: '₹7000'
      }}
      max={{
        key: 15000,
        text: '₹15000'
      }}
      value={{
        key: 11000,
        text: '₹11000'
      }}
      />
    ));
    const slider = screen.getByTestId('slider-container');
    expect(slider).toBeInTheDocument();
  });
  test("check value", () => {
    render((
      <Slider
      onChange={() => {}}
      min={{
        key: 7000,
        text: '₹7000'
      }}
      max={{
        key: 15000,
        text: '₹15000'
      }}
      value={{
        key: 11000,
        text: '₹11000'
      }}
      />
    ));
    const sliderValue = screen.getByTestId('slider-value');
    expect(sliderValue).toHaveTextContent('₹11000');
  });
  test("check range texts", () => {
    render((
      <Slider
      onChange={() => {}}
      min={{
        key: 7000,
        text: '₹7000'
      }}
      max={{
        key: 15000,
        text: '₹15000'
      }}
      value={{
        key: 11000,
        text: '₹11000'
      }}
      />
    ));
    const rangeTexts = screen.getByTestId('slider-range-texts');
    expect(rangeTexts).toBeInTheDocument();
  });
  test("check min range text", () => {
    render((
      <Slider
      onChange={() => {}}
      min={{
        key: 7000,
        text: '₹7000'
      }}
      max={{
        key: 15000,
        text: '₹15000'
      }}
      value={{
        key: 11000,
        text: '₹11000'
      }}
      />
    ));
    const minRangeText = screen.getByTestId('slider-min-text');
    expect(minRangeText).toHaveTextContent('₹7000');
  });
  test("check max range text", () => {
    render((
      <Slider
      onChange={() => {}}
      min={{
        key: 7000,
        text: '₹7000'
      }}
      max={{
        key: 15000,
        text: '₹15000'
      }}
      value={{
        key: 11000,
        text: '₹11000'
      }}
      />
    ));
    const maxRangeText = screen.getByTestId('slider-max-text');
    expect(maxRangeText).toHaveTextContent('₹15000');
  });
  test("check on-change", () => {
    const onChange = jest.fn();
    render((
      <Slider
      onChange={onChange}
      min={{
        key: 7000,
        text: '₹7000'
      }}
      max={{
        key: 15000,
        text: '₹15000'
      }}
      value={{
        key: 11000,
        text: '₹11000'
      }}
      />
    ));
    const sliderInput = screen.getByTestId('slider-input');
    fireEvent.change(sliderInput, { target: { value: '10000' } });
    expect(onChange).toHaveBeenCalledWith(10000);
  });
  test("check style width on change", () => {
    const onChange = jest.fn();
    let value = {
      key: 11000,
      text: '₹11000'
    };
    let min = {
      key: 7000,
      text: '₹7000'
    };
    let max = {
      key: 15000,
      text: '₹15000'
    };
    let getComponent = () => (
      <Slider
      onChange={onChange}
      min={min}
      max={max}
      value={value}
      />
    );
    const {rerender} = render(getComponent());
    const sliderInput = screen.getByTestId('slider-input');
    fireEvent.change(sliderInput, { target: { value: '10000' } });
    value = {
      key: 10000,
      text: '₹10000'
    };
    rerender(getComponent());
    const temp = (value.key-min.key)/(max.key-min.key)*100;
    expect(sliderInput).toHaveStyle({
      '--slider-width': `${temp}%`
    });
  });
});