import React from "react";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../gql/queries";
import { ScrollView, View } from "react-native";
import Loader from "../../components/Loader";
import SquareBook from "../../components/SquareBook";

export default ({ navigation }) => {
  const { data, loading } = useQuery(SEARCH, {
    variables: { term: navigation.getParam("term") }
  });
  return (
    <ScrollView>
      {loading && <Loader />}
      {!loading && data && data?.books && (
        <View>
          {data?.books.map(book => (
            <SquareBook key={book.isbn} {...book} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
