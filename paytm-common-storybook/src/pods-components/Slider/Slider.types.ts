export interface SliderProps {
  min: RangeItem;
  max: RangeItem;
  value: RangeItem;
  onChange: (arg: number) => void;
  customClass?: string;
};

export interface RangeItem {
  key: number;
  text: string;
}