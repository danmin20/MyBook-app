import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import { View } from "react-native";
import MainNavigation from "../navigation/MainNavigation";
import AuthNavigation from "../navigation/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <View style={{ flex: 1 }}>
      {<AuthNavigation />}
    </View>
  );
};
