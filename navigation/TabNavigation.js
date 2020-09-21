import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import styles from "../styles";
import { Text, View } from "react-native";
import {
  Home,
  MyBooks,
  Feed,
  BookDetail,
  UserDetail,
  PostDetail,
  BookDisplay,
  UserDisplay,
  Upload,
  EditPost,
  FollowDisplay,
  EditUser,
  PostDisplay,
  LikeDisplay,
} from "../screens/Tab";

const tabBarVisible = (navigation) => {
  const { routes } = navigation.state;
  routes.forEach((route) => {
    if (route.routeName === "PostDetail") {
      return false;
    } else {
      return true;
    }
  });
};

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig,
        },
      },
      BookDetail: {
        screen: BookDetail,
        navigationOptions: {
          title: "책 상세정보",
        },
      },
      PostDetail: {
        screen: PostDetail,
        navigationOptions: ({ navigation }) => ({
          title: '" ' + navigation.getParam("title") + ' "',
        }),
      },
      UserDetail: {
        screen: UserDetail,
        navigationOptions: {
          headerTitle: () => {
            "none";
          },
        },
      },
      BookDisplay: {
        screen: BookDisplay,
        navigationOptions: ({ navigation }) => ({
          title: "' " + navigation.getParam("term") + " '  검색결과",
        }),
      },
      UserDisplay: {
        screen: UserDisplay,
        navigationOptions: ({ navigation }) => ({
          title: "' " + navigation.getParam("name") + " '  검색결과",
        }),
      },
      Upload: {
        screen: Upload,
        navigationOptions: {
          headerTitle: () => {
            "none";
          },
        },
      },
      EditPost: {
        screen: EditPost,
        navigationOptions: {
          headerTitle: () => {
            "none";
          },
        },
      },
      FollowDisplay: {
        screen: FollowDisplay,
        navigationOptions: ({ navigation }) => ({
          title: navigation.getParam("type"),
        }),
      },
      LikeDisplay: {
        screen: LikeDisplay,
        navigationOptions: {
          title: "스크랩",
        },
      },
      EditUser: {
        screen: EditUser,
        navigationOptions: {
          title: "내 정보 수정",
        },
      },
      PostDisplay: {
        screen: PostDisplay,
        navigationOptions: ({ navigation }) => ({
          title: "      " + navigation.getParam("title") + "      ",
        }),
      },
    },
    {
      defaultNavigationOptions: {
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: styles.brownColor,
          elevation: 0,
        },
        headerTitleStyle: {
          color: "white",
        },
        headerTitleAlign: "center",
        headerBackTitle: null,
        cardStyle: { backgroundColor: "white" },
      },
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
              justifyContent: "center",
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
        headerTitleAlign: "center",
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: tabBarVisible(navigation),
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "home" : "home-outline"}
            color={"white"}
            size={30}
          />
        ),
      }),
    },
    Feed: {
      screen: stackFactory(Feed, {
        headerTitle: () => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
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
        headerTitleAlign: "center",
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: tabBarVisible(navigation),
        tabBarIcon: ({ focused }) => (
          <MaterialIcons
            name={focused ? "people" : "people-outline"}
            color={"white"}
            size={30}
          />
        ),
      }),
    },
    MyBooks: {
      screen: stackFactory(MyBooks, {
        title: "",
      }),
      navigationOptions: ({ navigation }) => ({
        tabBarVisible: tabBarVisible(navigation),
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "bookmark" : "bookmark-outline"}
            color={"white"}
            size={30}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: { backgroundColor: styles.moderateBrownColor },
    },
  }
);
