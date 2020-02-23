import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { FEED } from "../../gql/queries";
import Loader from "../../components/Loader";
import FeedPost from "../../components/FeedPost";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hook/useInput";
import styles from "../../styles";
import { EvilIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";

const Box = styled.View`
  flex-direction: row;
  background-color: ${styles.brownColor};
  align-items: center;
`;
const Search = styled.TouchableOpacity`
  justify-content: center;
  background-color: ${styles.brownColor};
  padding: 5px 10px;
  padding-bottom: 10px;
  margin-bottom: auto;
`;

export default ({ navigation }) => {
  const [search, setSearch] = useState(false);
  const searchInput = useInput("");
  const toggleSearch = () => {
    setSearch(p => !p);
  };
  const handleSearch = async () => {
    const { value } = searchInput;
    if (value !== "") {
      navigation.navigate("UserDisplay", { name: value });
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch, fetchMore } = useQuery(FEED, {
    variables: {
      first: 10,
      offset: 0
    }
  });
  const onLoadMore = () => {
    fetchMore({
      variables: {
        first: 10,
        offset: data.seeFeed.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
        });
      }
    });
  };
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
    <>
      <Box>
        <Search onPress={toggleSearch}>
          <EvilIcons name="search" size={20} color="white" />
        </Search>
        {search ? (
          <SearchBar
            {...searchInput}
            placeholder="유저 검색"
            onSubmitEditing={handleSearch}
          />
        ) : null}
      </Box>
      {loading && <Loader />}
      {!loading && data && data.seeFeed && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          data={data.seeFeed}
          onEndReachedThreshold={1}
          onEndReached={onLoadMore}
          dataLength={data.seeFeed.length}
          renderItem={({ item }) => {
            return <FeedPost id={item.id} title={item.title} {...item} />;
          }}
        />
      )}
    </>
  );
};
