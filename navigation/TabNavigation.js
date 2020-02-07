import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Home from "../screens/Tab/Home";
import MyBooks from "../screens/Tab/MyBooks";
import Feed from "../screens/Tab/Feed";
import BookDetail from "../screens/Tab/BookDetail";
import UserDetail from "../screens/Tab/UserDetail";
import PostDetail from "../screens/Tab/PostDetail";
import BookDisplay from "../screens/Tab/BookDisplay";
import UserDisplay from "../screens/Tab/UserDisplay";
import styles from "../styles";
import { Text, View } from "react-native";
import Upload from "../screens/Tab/Upload";

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
          title: "책 상세정보"
        }
      },
      PostDetail: {
        screen: PostDetail,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("title")
        })
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: {
          headerTitle: () => {
            "none";
          }
        }
      },
      BookDisplay: {
        screen: BookDisplay,
        navigationOptions: ({ navigation }) => ({
          title: "' " + navigation.getParam("term") + " '  검색결과"
        })
      },
      UserDisplay: {
        screen: UserDisplay,
        navigationOptions: ({ navigation }) => ({
          title: "' " + navigation.getParam("name") + " '  검색결과"
        })
      },
      Upload: {
        screen: Upload,
        navigationOptions: {
          headerTitle: () => {
            "none";
          }
        }
      }
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: styles.blackColor
        },
        headerTitleStyle: {
          color: "white"
        },
        headerTitleAlign: "center",
        headerBackTitle: null,
        cardStyle: { backgroundColor: "white" }
      }
    }
  );

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <MaterialCommunityIcons
              name="book-variant"
              size={25}
              color="white"
            />
            <Text style={{ fontSize: 22, color: "white" }}> MY BOOK</Text>
          </View>
        ),
        headerTitleAlign: "center"
      }),
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
      screen: stackFactory(Feed, {
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <MaterialCommunityIcons
              name="book-variant"
              size={25}
              color="white"
            />
            <Text style={{ fontSize: 22, color: "white" }}> MY BOOK</Text>
          </View>
        ),
        headerTitleAlign: "center"
      }),
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
      screen: stackFactory(MyBooks, {
        title: ""
      }),
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
      style: { backgroundColor: styles.blackColor }
    }
  }
);
