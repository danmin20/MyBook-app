import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { USER_DETAIL } from "../../gql/queries";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import UserBooks from "../../components/UserBooks";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(USER_DETAIL, {
    variables: { userId: navigation.getParam("userId") }
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
        data && data.seeUser && <UserBooks {...data.seeUser} />
      )}
    </ScrollView>
  );
};
