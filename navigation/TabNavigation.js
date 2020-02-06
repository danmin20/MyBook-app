import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";
import MyBooks from "../screens/Tab/MyBooks";
import Feed from "../screens/Tab/Feed";
import BookDetail from "../screens/Tab/BookDetail";
import UserDetail from "../screens/Tab/UserDetail";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig
        }
      },
      BookDetail: {
        screen: BookDetail,
        navigationOptions: {
          headerTitle: () => {
            "none";
          }
        }
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("username")
        })
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

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "home" : "home-outline"}
            color={"white"}
            size={30}
          />
        )
      }
    },
    Feed: {
      screen: stackFactory(Feed),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name={focused ? "people" : "people-outline"}
            color={"white"}
            size={30}
          />
        )
      }
    },
    MyBooks: {
      screen: stackFactory(MyBooks),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "bookmark" : "bookmark-outline"}
            color={"white"}
            size={30}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: { backgroundColor: "black" }
    }
  }
);
