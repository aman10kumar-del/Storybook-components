import React from 'react';
import { Meta } from '@storybook/react';
import Number from './Number';

export default {
  title: 'PODS Number System/Number System',
  component: Number,
  parameters: {
    docs: {
      page: require('./Number.mdx').default,
    },
  },
} as Meta;

export const Default = () => <Number />; 