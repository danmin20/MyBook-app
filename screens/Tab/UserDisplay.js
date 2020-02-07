import React from "react";
import { useQuery } from "react-apollo-hooks";
import { SEARCH_USER } from "../../gql/queries";
import { ScrollView, View, Text } from "react-native";
import Loader from "../../components/Loader";
import SquareUser from "../../components/SquareUser";

export default ({ navigation }) => {
  const { data, loading } = useQuery(SEARCH_USER, {
    variables: { name: navigation.getParam("name") }
  });
  console.log(data);
  return (
    <ScrollView>
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
