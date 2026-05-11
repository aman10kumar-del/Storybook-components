import React from 'react';
import cx from '../../utils/classNames';
import { SearchSwitchProps } from './Search.types';
import s from './SearchSwitch.module.scss';

const SearchSwitch: React.FC<SearchSwitchProps> = ({
  value,
  onChange,
  customClass,
}) => {
  const options: { label: string, value: 'text' | 'numeric' }[] = [{
    label: 'ABC',
    value: 'text',
  }, {
    label: '123',
    value: 'numeric',
  }];

  return (
    <div className={cx(s.switchContainer, customClass)}>
      <div className={s.switchContent}>
        {options.map((option) => (
          <div
            key={option.value}
            role="button"
            tabIndex={0}
            className={cx(s.option, {
              [s.active]: value === option.value,
            })}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onChange(option.value);
              }
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SearchSwitch); 