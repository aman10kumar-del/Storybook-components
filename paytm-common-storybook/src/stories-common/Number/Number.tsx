import React from "react";
import s from "./Number.module.scss";

interface NumberBlockProps {
  value: string;
  label: string;
  type: 'unit' | 'margin' | 'padding' | 'gap' | 'radius';
}

const NumberBlock: React.FC<NumberBlockProps> = ({ value, label, type }) => {
  return (
    <div className={s.numberBlock}>
      <div className={s.numberVisual}>
        {type === 'radius' ? (
          <div className={s.radiusDemo} style={{ borderRadius: value }} />
        ) : (
          <div className={s.numberDemo} style={{ 
            [type === 'unit' ? 'width' : type]: value,
            height: type === 'unit' ? value : '40px'
          }} />
        )}
      </div>
      <div className={s.numberInfo}>
        <div className={s.label}>{label}</div>
        <div className={s.value}>{value}</div>
      </div>
    </div>
  );
};

const NumberSection: React.FC<{ title: string; tokens: { label: string; value: string }[]; type: NumberBlockProps['type'] }> = ({ title, tokens, type }) => {
  return (
    <section className={s.numberSection}>
      <h2>{title}</h2>
      <div className={s.numberGrid}>
        {tokens.map((token, index) => (
          <NumberBlock 
            key={index}
            value={token.value}
            label={token.label}
            type={type}
          />
        ))}
      </div>
    </section>
  );
};

const Number: React.FC = () => {
  const unitTokens = Array.from({ length: 15 }, (_, i) => ({
    label: `$unit-${i}`,
    value: `${i === 0 ? 0 : i === 1 ? 2 : i === 2 ? 4 : i === 3 ? 6 : i === 4 ? 8 : i === 5 ? 12 : i === 6 ? 16 : i === 7 ? 20 : i === 8 ? 24 : i === 9 ? 32 : i === 10 ? 36 : i === 11 ? 40 : i === 12 ? 48 : i === 13 ? 56 : 64}px`
  }));

  const marginTokens = [
    { label: '$margin-horizontal-xs', value: '0px' },
    { label: '$margin-horizontal-s', value: '8px' },
    { label: '$margin-horizontal-m', value: '12px' },
    { label: '$margin-horizontal-l', value: '16px' },
    { label: '$margin-vertical-xs', value: '0px' },
    { label: '$margin-vertical-s', value: '6px' },
    { label: '$margin-vertical-m', value: '8px' },
    { label: '$margin-vertical-l', value: '12px' },
  ];

  const paddingTokens = [
    { label: '$padding-horizontal-xs', value: '0px' },
    { label: '$padding-horizontal-s', value: '2px' },
    { label: '$padding-horizontal-m', value: '4px' },
    { label: '$padding-horizontal-l', value: '6px' },
    { label: '$padding-horizontal-xl', value: '8px' },
    { label: '$padding-horizontal-2xl', value: '12px' },
    { label: '$padding-horizontal-3xl', value: '16px' },
    { label: '$padding-vertical-xs', value: '0px' },
    { label: '$padding-vertical-s', value: '2px' },
    { label: '$padding-vertical-m', value: '4px' },
    { label: '$padding-vertical-l', value: '6px' },
    { label: '$padding-vertical-xl', value: '8px' },
    { label: '$padding-vertical-2xl', value: '12px' },
    { label: '$padding-vertical-3xl', value: '16px' },
  ];

  const gapTokens = [
    { label: '$gap-xs', value: '0px' },
    { label: '$gap-s', value: '2px' },
    { label: '$gap-m', value: '4px' },
    { label: '$gap-l', value: '6px' },
    { label: '$gap-xl', value: '8px' },
    { label: '$gap-2xl', value: '12px' },
    { label: '$gap-3xl', value: '16px' },
    { label: '$gap-4xl', value: '24px' },
  ];

  const radiusTokens = [
    { label: '$radius-xs', value: '0px' },
    { label: '$radius-s', value: '4px' },
    { label: '$radius-m', value: '8px' },
    { label: '$radius-l', value: '12px' },
    { label: '$radius-xl', value: '16px' },
    { label: '$radius-2xl', value: '20px'},
    { label: '$radius-3xl', value: '24px'},
    { label: '$radius-max', value: '64px' },
  ];

  return (
    <div className={s.numberContainer}>
      <NumberSection title="Unit Tokens" tokens={unitTokens} type="unit" />
      <NumberSection title="Margin Tokens" tokens={marginTokens} type="margin" />
      <NumberSection title="Padding Tokens" tokens={paddingTokens} type="padding" />
      <NumberSection title="Gap Tokens" tokens={gapTokens} type="gap" />
      <NumberSection title="Border Radius Tokens" tokens={radiusTokens} type="radius" />
    </div>
  );
};

export default Number; 