import {
  CATEGORY_BROWSE_SCREEN_ID,
  EMI_PAYMENT_SCREEN_ID,
  HOME_PAGE_SCREEN_ID,
  LOGIN_DETAILS_SCREEN_ID,
  LOGIN_HOME_SCREEN_ID,
  USER_SCREEN_ID,
} from "../screens";
import { CategoryBrowseScreen } from "./CategoryBrowseScreen";
import { EMIPaymentScreen } from "./EMIPaymentScreen";
import { HomePageScreen } from "./HomePageScreen";
import { LoginHomeScreen } from "./LoginHomeScreen";
import { UserScreen } from "./UserScreen";

export function ScreenRouter({ screenId }: { screenId: string }) {
  switch (screenId) {
    case LOGIN_HOME_SCREEN_ID:
      return <LoginHomeScreen initialStep="landing" />;
    case LOGIN_DETAILS_SCREEN_ID:
      return <LoginHomeScreen initialStep="credentials" />;
    case USER_SCREEN_ID:
      return <UserScreen />;
    case HOME_PAGE_SCREEN_ID:
      return <HomePageScreen />;
    case CATEGORY_BROWSE_SCREEN_ID:
      return <CategoryBrowseScreen />;
    case EMI_PAYMENT_SCREEN_ID:
      return <EMIPaymentScreen />;
    default:
      return <LoginHomeScreen initialStep="landing" />;
  }
}
