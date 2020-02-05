import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";

const Icon = styled.View``;

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "black"
        },
        headerBackTitle: null,
        cardStyle: { backgroundColor: "white" }
      }
    }
  );

export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home)
  }
});
