import React from "react";
import { useQuery } from "react-apollo-hooks";
import { USER_DETAIL } from "../../gql/queries";
import { ScrollView } from "react-native";
import Loader from "../../components/Loader";
import UserBooks from "../../components/UserBooks";

export default ({ navigation }) => {
  const { loading, data } = useQuery(USER_DETAIL, {
    variables: { userId: navigation.getParam("userId") }
  });
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeUser && <UserBooks {...data.seeUser} />
      )}
    </ScrollView>
  );
};
