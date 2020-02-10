import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_USER } from "../../gql/queries";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import SquareUser from "../../components/SquareUser";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH_USER, {
    variables: { name: navigation.getParam("name") },
    fetchPolicy: "cache-and-network"
  });
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
      {loading && <Loader />}
      {!loading && data && data?.searchUser && (
        <View>
          {data?.searchUser.map(user => (
            <SquareUser key={user.id} {...user} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
