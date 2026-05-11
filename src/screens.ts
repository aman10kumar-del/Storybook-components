export type ScreenStatus = "built" | "planned";

export interface AppScreen {
  id: string;
  title: string;
  description: string;
  status: ScreenStatus;
}

export const LOGIN_HOME_SCREEN_ID = "login-home";
export const LOGIN_DETAILS_SCREEN_ID = "login-details";
export const USER_SCREEN_ID = "user";
export const HOME_PAGE_SCREEN_ID = "home-page";
export const CATEGORY_BROWSE_SCREEN_ID = "category-browse";
export const EMI_PAYMENT_SCREEN_ID = "emi-payment";

/** Left nav order: Login Home → Login with credentials → User → Home page → Category browse → EMI payment (376×812 preview). */
export const APP_SCREENS: AppScreen[] = [
  {
    id: LOGIN_HOME_SCREEN_ID,
    title: "Login Home",
    description:
      "Paytm EMI landing — secure login, username/password, explore offers (matches reference shell).",
    status: "built",
  },
  {
    id: LOGIN_DETAILS_SCREEN_ID,
    title: "Login with credentials",
    description:
      "Username and password, show/hide password, Login and Proceed (Paytm EMI flow).",
    status: "built",
  },
  {
    id: USER_SCREEN_ID,
    title: "User",
    description:
      "Post-login hub — welcome, notifications, search, store cards with View details.",
    status: "built",
  },
  {
    id: HOME_PAGE_SCREEN_ID,
    title: "Home page",
    description:
      "Store EMI home — back+avatar header, search, Categories (4×2 + chevron View more), Top Selling horizontal cards, promo banner, Brands chips, EMI entry card.",
    status: "built",
  },
  {
    id: CATEGORY_BROWSE_SCREEN_ID,
    title: "Category browse",
    description:
      "PLP from a category — search, brand chips with icons, price/type filters, product grid.",
    status: "built",
  },
  {
    id: EMI_PAYMENT_SCREEN_ID,
    title: "EMI payment",
    description:
      "Product EMI checkout — price, EMI tabs, card offers, pay with credit/debit cards.",
    status: "built",
  },
];
