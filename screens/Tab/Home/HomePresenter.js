import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, Text } from "react-native";
import { gql } from "apollo-boost";
import SquareBook from "../../../components/SquareBook";

const SEARCH = gql`
  query books($term: String!) {
    books(term: $term) {
      isbn
      title
      link
      image
      author
      price
      discount
      publisher
      description
    }
  }
`;

const BookDisplay = styled.View``;

const HomePresenter = ({ term, shouldFetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: { term },
    skip: !shouldFetch,
    fetchPolicy: "network-only"
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
  console.log(data?.books);
  return (
    <ScrollView refreshControl={refreshing} onRefresh={refresh}>
      {loading && <Text>loading</Text>}
      {!loading && (
        <BookDisplay>
          {!loading &&
            data &&
            data?.books.map(book => {
              console.log(book.title);
              return <SquareBook key={book.isbn} term={book.isbn} {...book} />;
            })}
        </BookDisplay>
      )}
    </ScrollView>
  );
};

HomePresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired
};

export default HomePresenter;
