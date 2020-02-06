import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../gql/queries";
import SquareBook from "../../components/SquareBook";
import { Text, Image } from "react-native";
import Loader from "../../components/Loader";

const Container = styled.View``;
const Info = styled.View``;

export default ({ navigation }) => {
  const { loading, data } = useQuery(SEARCH, {
    variables: { term: navigation.getParam("isbn") }
  });
  const detail = data?.books[0];
  console.log(detail);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        detail && (
          <Container>
            <Image
              source={{ uri: detail.image }}
              style={{ width: 100, height: 100 }}
            />
            <Info>
              <Text>{detail.title}</Text>
              <Text>{detail.publisher}</Text>
            </Info>
          </Container>
        )
      )}
    </>
  );
};
