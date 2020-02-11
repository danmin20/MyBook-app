import React, { useState } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import SquareUser from "../../components/SquareUser";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const follow = navigation.getParam("follow");
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {follow && (
        <View>
          {follow.map(user => (
            <SquareUser key={user.id} {...user} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
