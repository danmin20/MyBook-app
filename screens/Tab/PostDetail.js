import React from "react";
import { Text, ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { POST_DETAIL } from "../../gql/queries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";

export default ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") }
  });
  console.log(data.seeFullPost)
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};
