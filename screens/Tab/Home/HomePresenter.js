import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, Text } from "react-native";
import SquareBook from "../../../components/SquareBook";
import Loader from "../../../components/Loader";
import { SEARCH } from "../../../Queries";
import HomeScreen from "../../../components/HomeScreen";

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
  return (
    <ScrollView refreshControl={refreshing} onRefresh={refresh}>
      {loading && <Loader />}
      {!loading && (!data || !data?.books) && <HomeScreen />}
      {!loading && (
        <BookDisplay>
          {data &&
            data?.books &&
            data?.books.map(book => (
              <SquareBook key={book.isbn} term={term} {...book} />
            ))}
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
