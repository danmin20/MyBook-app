import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Signup from "../screens/Auth/Signup";
import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    Login,
    Signup,
    Confirm
  },
  {
    navigationOptions: {
      cardStyle: { backgroundColor: "white" }
    },
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);
