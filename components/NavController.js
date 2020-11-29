import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import { View } from "react-native";
import MainNavigation from "../navigation/MainNavigation";
import AuthNavigation from "../navigation/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  console.log("aaa", isLoggedIn);
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
