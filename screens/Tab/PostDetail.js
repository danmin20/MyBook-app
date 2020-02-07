import React, { useState } from "react";
import { Text, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { POST_DETAIL } from "../../gql/queries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") }
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
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
