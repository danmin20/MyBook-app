import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { POSTS_BOOK } from "../../gql/queries";
import { RefreshControl, FlatList, View, Image } from "react-native";
import FeedPost from "../../components/FeedPost";
import constants from "../../constants";

const Err = styled.View`
  margin-top: 40px;
  align-items: center;
`;
const Img = styled.View`
  margin-top: 150px;
  align-items: center;
  opacity: 0.5;
`;
const Text = styled.Text`
  font-size: 15px;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(POSTS_BOOK, {
    variables: {
      isbn: navigation.getParam("isbn"),
      first: 5,
      offset: 0
    }
  });
  const onLoadMore = () => {
    fetchMore({
      variables: {
        isbn: navigation.getParam("isbn"),
        first: 5,
        offset: data.postsOfBook.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          postsOfBook: [...prev.postsOfBook, ...fetchMoreResult.postsOfBook]
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
      {!loading && data.postsOfBook[0] === undefined && (
        <View>
          <Err>
            <Text>작성된 글이 없습니다.</Text>
          </Err>
          <Img>
            <Image
              resizeMode={"contain"}
              source={require("../../assets/logo.png")}
              style={{ width: constants.width / 3 }}
            />
          </Img>
        </View>
      )}
      {!loading && data.postsOfBook && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          data={data.postsOfBook}
          onEndReachedThreshold={1}
          onEndReached={onLoadMore}
          dataLength={data.postsOfBook.length}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <FeedPost key={item.id} {...item} />;
          }}
        />
      )}
    </>
  );
};
