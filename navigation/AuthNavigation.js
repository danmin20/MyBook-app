import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Signup, AuthHome, Confirm, Login } from "../screens/Auth";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Login,
    Signup,
    Confirm,
  },
  {
    navigationOptions: {
      cardStyle: { backgroundColor: "white" },
    },
    headerMode: "none",
  }
);

export default createAppContainer(AuthNavigation);
