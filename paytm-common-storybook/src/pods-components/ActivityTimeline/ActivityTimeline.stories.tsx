import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ActivityTimeline from './ActivityTimeline';
import { getFigmaLinkHTML } from '../../stories-common/utils';

export default {
  title: 'PODS Components/ActivityTimeline',
  component: ActivityTimeline,
  argTypes: {
    options: {
      description: `VerticalOption schema: \n
      id: string: Unique ID to distinguish each item in the list, \n
      step: string: User can pass one of the four allowed step (awaited | processing | failed |  completed | completed-brand | loading | warning | number), \n
      active: boolean: Optional boolean to show the number step as active or inactive, \n
      title: string: Optional title for the step, \n
      subtitle: string: Optional subtitle for the step (only in vertical layout), \n
      actionProps: { label: string, onClick: () => void }: Optional action button (only in vertical layout) \n
      
      
      HorizontalOption schema: \n
      id: string: Unique ID to distinguish each item in the list, \n
      step: string: User can pass one of the four allowed step (awaited | processing | failed |  completed | completed-brand | loading | warning | number), \n
      active: boolean: Optional boolean to show the number step as active or inactive, \n
      title: string: Optional title for the step, \n
      `
    },
    type: {
      description: 'To show the timeline horizontally or vertically. Allowed strings are vertical or horizontal'
    },
    alignment: {
      description: 'Only applicable for vertical layout. Allowed strings are top, center'
    },
    appearance: {
      description: 'Vertical only: `payment-details` uses body-regular copy and smaller step icons (Gen-AI timeline card).'
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=1165-198&m=dev")
      }
    }
  },
} as Meta<typeof ActivityTimeline>;

const Template: StoryFn<typeof ActivityTimeline> = (args) => {

  return (
    <ActivityTimeline
      {...args}
    />
  )
}

export const OneStep = Template.bind({});
OneStep.args = {
  options: [
    { id: "1", step: "completed" }
  ],
};

export const TwoStepHorizontal = Template.bind({});
TwoStepHorizontal.args = {
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" }
  ],
};

export const ThreeStepHorizontal = Template.bind({});
ThreeStepHorizontal.args = {
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "processing" }
  ],
};


export const FourStepHorizontal = Template.bind({});
FourStepHorizontal.args = {
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "processing" },
    { id: "4", step: "failed" }
  ],
};

export const FiveStepHorizontal = Template.bind({});
FiveStepHorizontal.args = {
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "awaited" },
    { id: "4", step: "processing" },
    { id: "5", step: "failed" }
  ],
};

export const SixStepHorizontal = Template.bind({});
SixStepHorizontal.args = {
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "awaited" },
    { id: "4", step: "awaited" },
    { id: "5", step: "processing" },
    { id: "6", step: "failed" }
  ],
};

export const HorizontalAllSteps = Template.bind({});
HorizontalAllSteps.args = {
  options: [
    { id: "1", step: "completed-brand" },
    { id: "2", step: "completed" },
    { id: "3", step: "failed" },
    { id: "4", step: "warning" },
    { id: "5", step: "processing" },
    { id: "6", step: "loading" },
    { id: "7", step: "awaited" },
    { id: "8", step: 8 }
  ],
};

export const HorizontalWithTitle = Template.bind({});
HorizontalWithTitle.args = {
  options: [
    { id: "1", step: "completed-brand", title: "Completed" },
    { id: "2", step: "completed", title: "Completed" },
    { id: "3", step: "failed", title: "Failed" },
    { id: "4", step: "warning", title: "Warning" },
    { id: "5", step: "processing", title: "Processing" },
    { id: "6", step: "loading", title: "Loading" },
    { id: "7", step: "awaited", title: "Awaited" },
    { id: "8", step: 8, title: "Number" }
  ],
};

export const HorizontalInactiveNumber = Template.bind({});
HorizontalInactiveNumber.args = {
  options: [
    { id: "1", step: "completed-brand", active: false },
    { id: "2", step: "completed", active: false },
    { id: "3", step: "failed", active: false },
    { id: "4", step: "warning", active: false },
    { id: "5", step: "processing", active: false },
    { id: "6", step: "loading", active: false },
    { id: "7", step: "awaited", active: false },
    { id: "8", step: 8, active: false }
  ],
};

export const TwoStepVertical = Template.bind({});
TwoStepVertical.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" }
  ],
};

export const ThreeStepVertical = Template.bind({});
ThreeStepVertical.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "processing" }
  ],
};

export const FourStepVertical = Template.bind({});
FourStepVertical.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "processing" },
    { id: "4", step: "failed" }
  ],
};

export const FiveStepVertical = Template.bind({});
FiveStepVertical.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "awaited" },
    { id: "4", step: "processing" },
    { id: "5", step: "failed" }
  ],
};


export const SixStepVertical = Template.bind({});
SixStepVertical.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed" },
    { id: "2", step: "awaited" },
    { id: "3", step: "awaited" },
    { id: "4", step: "awaited" },
    { id: "5", step: "processing" },
    { id: "6", step: "failed" }
  ],
};

export const VerticalWithTitles = Template.bind({});
VerticalWithTitles.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed", title: "Order Placed", subtitle: "Order #123456 placed successfully" },
    { id: "2", step: "completed", title: "Payment Confirmed", subtitle: "Payment of ₹1000 received" },
    { id: "3", step: "processing", title: "Processing", subtitle: "Your order is being processed" },
    { id: "4", step: "awaited", title: "Shipping", subtitle: "Waiting for shipping" }
  ],
};

export const VerticalWithOnlyTitle = Template.bind({});
VerticalWithOnlyTitle.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed", title: "Order Placed" },
    { id: "2", step: "completed", title: "Payment Confirmed" },
    { id: "3", step: "processing", title: "Processing" },
    { id: "4", step: "awaited", title: "Shipping" }
  ],
};

export const VerticalWithOnlySubtitle = Template.bind({});
VerticalWithOnlySubtitle.args = {
  type: 'vertical',
  options: [
    { id: "1", step: "completed", subtitle: "Order #123456 placed successfully" },
    { id: "2", step: "completed", subtitle: "Payment of ₹1000 received" },
    { id: "3", step: "processing", subtitle: "Your order is being processed" },
    { id: "4", step: "awaited", subtitle: "Waiting for shipping" }
  ],
};

export const VerticalWithActions = Template.bind({});
VerticalWithActions.args = {
  type: 'vertical',
  options: [
    { 
      id: "1", 
      step: "completed", 
      title: "Order Placed", 
      subtitle: "Order #123456 placed successfully",
      actionProps: {
        label: "View Order",
        onClick: () => console.log("View Order clicked")
      },
    },
    { 
      id: "2", 
      step: "completed", 
      title: "Payment Confirmed", 
      subtitle: "Payment of ₹1000 received",
      actionProps: {
        label: "View Receipt",
        type: 'stroke',
        onClick: () => console.log("View Receipt clicked")
      },
    },
    { 
      id: "3", 
      step: "processing", 
      title: "Processing", 
      subtitle: "Your order is being processed" 
    },
    { 
      id: "4", 
      step: "awaited", 
      title: "Shipping", 
      subtitle: "Waiting for shipping" 
    }
  ],
};

export const VerticalAllStates = Template.bind({});
VerticalAllStates.args = {
  type: 'vertical',
  options: [
    { 
      id: "1", 
      step: "completed-brand", 
      title: "Completed Brand", 
      subtitle: "With brand color",
    },
    { 
      id: "2", 
      step: "completed", 
      title: "Completed", 
      subtitle: "Regular completed state" 
    },
    { 
      id: "3", 
      step: "failed", 
      title: "Failed", 
      subtitle: "Error state" 
    },
    { 
      id: "4", 
      step: "warning", 
      title: "Warning", 
      subtitle: "Warning state" 
    },
    { 
      id: "5", 
      step: "processing", 
      title: "Processing", 
      subtitle: "In progress" 
    },
    { 
      id: "6", 
      step: "loading", 
      title: "Loading", 
      subtitle: "Loading state" 
    },
    { 
      id: "7", 
      step: "awaited", 
      title: "Awaited", 
      subtitle: "Waiting state" 
    },
    { 
      id: "8", 
      step: 8, 
      title: "Numbered", 
      subtitle: "With number indicator" 
    }
  ],
};

export const VerticalInactiveNumber = Template.bind({});
VerticalInactiveNumber.args = {
  type: 'vertical',
  options: [
    { 
      id: "1", 
      step: "completed", 
      title: "Order Placed", 
      subtitle: "Order #123456 placed successfully",
      active: false
    },
    { 
      id: "2", 
      step: "completed", 
      title: "Payment Confirmed", 
      subtitle: "Payment of ₹1000 received",
      active: false
    },
    { 
      id: "3", 
      step: "processing", 
      title: "Processing", 
      subtitle: "Your order is being processed",
      active: false
    },
    { 
      id: "4", 
      step: 4, 
      title: "Shipping", 
      subtitle: "Waiting for shipping",
      active: false
    }
  ],
};


export const VerticalWithCenterAlignment = Template.bind({});
VerticalWithCenterAlignment.args = {
  type: 'vertical',
  alignment: 'center',
  options: [
    { id: "1", step: "completed", title: "Order Placed", subtitle: "Order #123456 placed successfully" },
    { id: "2", step: "completed", title: "Payment Confirmed", subtitle: "Payment of ₹1000 received" },
    { id: "3", step: "processing", title: "Processing", subtitle: "Your order is being processed" },
    { id: "4", step: "awaited", title: "Shipping", subtitle: "Waiting for shipping" }
  ],
};