import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation";

const MainNavigation = createStackNavigator(
  {
    TabNavigation
  },
  {
    defaultNavigationOptions: {
      cardStyle: { backgroundColor: "white" }
    },
    headerMode: "none"
  }
);

export default createAppContainer(MainNavigation);
