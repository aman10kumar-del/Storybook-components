# 3.0.3
- Chips Component: Enhanced with border radius support and border support in itemLayoutProps.
- Avatar Component: Refactored to use a conditional color class for icon styling; added deterministic color support for icon variant.
- List Component: V3 style fixes.
- Header Logo Component: v3 style fixes.
- Progress Bar: New component added.

# 3.0.2
- Color Primitives: Updated existing color tokens and introduced new colors to the design system.
- Header Component: Added a size prop with three variants: Large, Medium, and Small.
- List Component:
  - Added ellipsis support for primary text when used with icons.
  - Improved text overflow handling for a better user experience.
- Dropdown Component: Added an emphasis prop ('high' | 'low') to control visual emphasis.

# 1.4.0
- Improved BottomSheet animation

# 1.3.2
- Updated few pastel color codes

# 1.3.1
- Updated utility function export to fetch the deterministic color and semantic name for Avatar Profile

# 1.3.0
- Added deterministic color selection for Avatar Profile
- Added utility function export to fetch the deterministic color for Avatar Profile

# 1.2.0
- Added new Pastel color support for Avatar component

# 1.1.0
- Added named import support for icons

# 1.0.1
- Added List component

# 1.0.0
- Transformed components to ULTRA design system. Below are the major changes
  - Color tokens updated.
  - Typescale updated.
  - Component props changed for few components. Please see the diff [here](https://docs.google.com/spreadsheets/d/15GBNRvdo2HpM9Z7laVZhFM3uCfVpHxkfgoPd6u3Y2Cw/edit?gid=0#gid=0)
  - Below components are removed
    - Header
    - List Item
    - List Option-Switch
    - List Option Radio
    - Grid Category
    - Activity Timeline
    - Action Sheet
    - Bottom Nav Bar
  - Switched to ULTRA compatible icon set. Some existing icons might not be present in the new version

# 0.0.13
- Added type param for the Button

# 0.0.12
- Upgraded Storybook version to 7
- Added attachToElementID prop for ActionSheet & Dropdown

# 0.0.11
- Added prop to control clamping in Snackbar
- Fixed an SSR issue in tracking code

# 0.0.10
- Added custom fallback loader support for Header
- Deprecated Header
- Added separate Header components to avoid lazy loading 
- Updated Popover & OverflowMenu components to use react-menu library as its positioning engine

# 0.0.9
- Removed global styles. (Important: Please note that if you are migrating to this version from a previous version of PODS, then you need to verify the styles of your own components)
- Added inputProps to OTP component
- Added inputProps to Passcode component
- Fixed issue in Passcode component which caused the passcode to be visible momentarily

# 0.0.9-beta1
- Removed global styles. (Important: Please note that if you are migrating to this version from a previous version of PODS, then you need to verify the styles of your own components)
- Added inputProps to OTP component
- Added inputProps to Passcode component

# 0.0.8
- Segmented Control: Added support for string id
- Tabs: Added support for string id

# 0.0.7
Includes below features and bug fixes from 0.0.7-beta1 & 0.0.7-beta2
- Improved a11y for all components
- Removed ramda peer dep
- Minor improvements / additions to few components
    - Added success theme for button
    - Normalized header heights
    - Added Badge in Segmented-Control
    - Enabled all Badge colors in Bottom-Nav-Bar
- Fixed a bug in the storybook of Alert component
- Fixed a bug that resulted in aggressive tree shaking
- Surrounding padding removed from Form components
- Avoided truncating the title for BottomSheet
- Added pointer cursor for Button
- Added disabled mode for SegmentedControl
- Added disabled mode for Tabs
- Added disabled mode for TextFields
- Modified title and content props to be ReactNode type for Accordion
- Added onHide callback for Snackbar
- Added support for custom title component in HeaderDefault
- Added 4 new icons ( Chart, Redirect, Save & SoftCenter)
- Added Badge support in Chips 

# 0.0.7-beta2
- Surrounding padding removed from Form components
- Avoided truncating the title for BottomSheet
- Added pointer cursor for Button
- Added disabled mode for SegmentedControl
- Added disabled mode for Tabs
- Added disabled mode for TextFields
- Modified title and content props to be ReactNode type for Accordion
- Added onHide callback for Snackbar
- Added support for custom title component in HeaderDefault
- Added 4 new icons ( Chart, Redirect, Save & SoftCenter)
- Added Badge support in Chips 

# 0.0.7-beta1
- Improved a11y for all components
- Removed ramda peer dep
- Minor improvements / additions to few components
    - Added success theme for button
    - Normalized header heights
    - Added Badge in Segmented-Control
    - Enabled all Badge colors in Bottom-Nav-Bar
- Fixed a bug in the storybook of Alert component
- Fixed a bug that resulted in aggressive tree shaking

# 0.0.6
- SSR fix