import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../gql/queries";
import { Image, FlatList, RefreshControl } from "react-native";
import Loader from "../../components/Loader";
import SquareBook from "../../components/SquareBook";
import constants from "../../constants";
import styles from "../../styles";

const ErrView = styled.View`
  margin-top: 50px;
`;
const Error = styled.View`
  margin: 30px;
  justify-content: center;
  flex-direction: row;
`;
const Ex = styled.View`
  margin: 0 30px;
`;
const Red = styled.Text`
  color: ${styles.redColor};
`;
const Row = styled.View`
  flex-direction: row;
`;
const Text = styled.Text`
  margin-bottom: 10px;
`;
const Img = styled.View`
  margin-top: 100px;
  align-items: center;
  opacity: 0.5;
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(SEARCH, {
    variables: { term: navigation.getParam("term"), start: 1 }
  });
  const onLoadMore = () => {
    fetchMore({
      variables: {
        start: data?.books.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          books: [...prev.books, ...fetchMoreResult.books]
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
      {loading && <Loader />}
      {!loading && data?.books === undefined && (
        <ErrView>
          <Error>
            <Red>' {navigation.getParam("term")} '</Red>
            <Text> 에 대한 검색결과가 없습니다.</Text>
          </Error>
          <Ex>
            <Row>
              <Text>· </Text>
              <Text>단어의 철자가 정확한지 확인해 보세요.</Text>
            </Row>
            <Row>
              <Text>· </Text>
              <Text>
                한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.
              </Text>
            </Row>
            <Row>
              <Text>· </Text>
              <Text>
                검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해
                보세요.
              </Text>
            </Row>
          </Ex>
          <Img>
            <Image
              resizeMode={"contain"}
              source={require("../../assets/logo.png")}
              style={{ width: constants.width / 3 }}
            />
          </Img>
        </ErrView>
      )}
      {!loading && data && data?.books && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          data={data?.books}
          onEndReachedThreshold={1}
          onEndReached={onLoadMore}
          dataLength={data?.books.length}
          renderItem={({ item }) => {
            return <SquareBook key={item.isbn} {...item} />;
          }}
          keyExtractor={item =>
            item.isbn + Math.floor(Math.random() * 10).toString()
          }
        />
      )}
    </>
  );
};
