import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../gql/queries";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(ME);

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
  console.log(data)
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {loading ? <Loader /> : null}
    </ScrollView>
  );
};
