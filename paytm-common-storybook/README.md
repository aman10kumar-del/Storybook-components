# How to contribute ?
- Create JIRA for the component that you want to add / modify
- Clone the repo
- Checkout new branch from *staging*, use JIRA# as branch name
- npm i
- Add / Modify the component, storybook & UT
- npm run storybook - for testing
- Raise PR to staging
- Add prasad.nayak@paytm.com, kartik.kaushal@paytm.com & althaf1.jaleel@paytm.com as reviewers

**How to install?**

Add the below to .npmrc file
```bash
@paytm-h5-common:registry=https://nexusartifactory.paytm.com/repository/h5-npm-releases/
```

and then in the terminal, 

```bash
npm i @paytm-h5-common/paytm_common_ui@version
```
**Latest version**

3.0.1

**How to import any component?**
```js
import { Button } from '@paytm-h5-common/paytm_common_ui';
```

# Node version required
>= 14.19.0

# Peer dependencies
"react": ">=16.8.0"
"react-dom": ">=16.8.0"