import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { FEED } from "../../gql/queries";
import { ScrollView, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import FeedPost from "../../components/FeedPost";
import SearchBar from "../../components/SearchBar";
import useInput from "../../hook/useInput";

export default ({ navigation }) => {
  const searchInput = useInput("");
  const handleSearch = async () => {
    const { value } = searchInput;
    if (value !== "") {
      navigation.navigate("UserDisplay", { name: value });
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED);
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
      <SearchBar
        {...searchInput}
        placeholder="유저 검색"
        onSubmitEditing={handleSearch}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {loading ? (
          <Loader />
        ) : (
          data &&
          data.seeFeed &&
          data.seeFeed.map(post => <FeedPost key={post.id} {...post} />)
        )}
      </ScrollView>
    </>
  );
};
