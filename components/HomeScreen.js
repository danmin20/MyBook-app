import React from "react";
import styled from "styled-components";
import { SEARCH, POST_DB } from "../gql/queries";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import Loader from "./Loader";
import { withNavigation, FlatList } from "react-navigation";

const Container = styled.View`
  margin-top: 5px;
`;
const ContainerDB = styled.View`
  background-color: ${styles.lightBrownColor};
  margin-bottom: 5px;
`;
const TopicBox = styled.View`
  margin-left: 10px;
  margin-top: 10px;
  margin-right: auto;
  width: auto;
`;
const Topic = styled.Text`
  font-size: 15px;
  padding: 5px 10px;
  color: ${styles.brownColor};
  background-color: ${styles.brownGrey};
  border-radius: 10px;
`;
const BookScroll = styled.ScrollView`
  padding: 5px;
`;
const CircleBookBox = styled.View`
  margin: 5px;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 56.5px;
  padding: 3px;
`;
const BookBox = styled.View`
  margin: 8px;
  align-items: center;
  justify-content: center;
`;
const CircleImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
const Image = styled.Image`
  width: 110px;
  height: 150px;
  border-radius: 10px;
`;
const Info = styled.View`
  align-items: center;
`;
const Name = styled.Text`
  font-size: 8px;
  margin-bottom: 5px;
  color: ${styles.blackColor};
  background-color: white;
  padding: 1px 5px;
  text-align: center;
  border-radius: 10px;
`;

const HomeScreen = ({ navigation }) => {
  const { data, loading, fetchMore } = useQuery(POST_DB, {
    variables: {
      first: 10,
      offset: 0
    },
    fetchPolicy: "cache-and-network"
  });
  const onLoadMore = () => {
    fetchMore({
      variables: {
        first: 10,
        offset: data?.seePostDB.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          seePostDB: [...prev?.seePostDB, ...fetchMoreResult?.seePostDB]
        });
      }
    });
  };
  const { data: data_10, loading: loading_10 } = useQuery(SEARCH, {
    variables: { term: "10대", start: 1, offset: 0 },
    fetchPolicy: "cache-and-network"
  });
  const { data: data_20, loading: loading_20 } = useQuery(SEARCH, {
    variables: { term: "20대", start: 1, offset: 0 },
    fetchPolicy: "cache-and-network"
  });
  const { data: data_30, loading: loading_30 } = useQuery(SEARCH, {
    variables: { term: "30대", start: 1, offset: 0 },
    fetchPolicy: "cache-and-network"
  });
  const { data: data_40, loading: loading_40 } = useQuery(SEARCH, {
    variables: { term: "40대", start: 1, offset: 0 },
    fetchPolicy: "cache-and-network"
  });
  return (
    <>
      <ContainerDB key={0}>
        {data && data?.seePostDB && (
          <FlatList
            style={{ padding: 5 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data?.seePostDB}
            onEndReached={onLoadMore}
            dataLength={data?.seePostDB.length}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() =>
                    navigation.navigate("PostDetail", {
                      id: item.id,
                      title: item.title
                    })
                  }
                >
                  <Info>
                    <CircleBookBox>
                      <CircleImage source={{ uri: item.book.image }} />
                    </CircleBookBox>
                    <Name>{item.user.name}</Name>
                  </Info>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </ContainerDB>
      <Container key={1}>
        <TopicBox>
          <Topic>10대 추천도서</Topic>
        </TopicBox>
        <BookScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          {data_10?.books.map(book => (
            <TouchableOpacity
              key={book.isbn}
              onPress={() =>
                navigation.navigate("BookDetail", { isbn: book.isbn })
              }
            >
              <BookBox>
                <Image source={{ uri: book.image }} />
              </BookBox>
            </TouchableOpacity>
          ))}
        </BookScroll>
      </Container>
      <Container key={2}>
        <TopicBox>
          <Topic>20대 추천도서</Topic>
        </TopicBox>
        <BookScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          {data_20?.books.map(book => (
            <TouchableOpacity
              key={book.isbn}
              onPress={() =>
                navigation.navigate("BookDetail", { isbn: book.isbn })
              }
            >
              <BookBox>
                <Image source={{ uri: book.image }} />
              </BookBox>
            </TouchableOpacity>
          ))}
        </BookScroll>
      </Container>
      <Container key={3}>
        <TopicBox>
          <Topic>30대 추천도서</Topic>
        </TopicBox>
        <BookScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          {data_30?.books.map(book => (
            <TouchableOpacity
              key={book.isbn}
              onPress={() =>
                navigation.navigate("BookDetail", { isbn: book.isbn })
              }
            >
              <BookBox>
                <Image source={{ uri: book.image }} />
              </BookBox>
            </TouchableOpacity>
          ))}
        </BookScroll>
      </Container>
      <Container key={4}>
        <TopicBox>
          <Topic>40대 추천도서</Topic>
        </TopicBox>
        <BookScroll horizontal={true} showsHorizontalScrollIndicator={false}>
          {data_40?.books.map(book => (
            <TouchableOpacity
              key={book.isbn}
              onPress={() =>
                navigation.navigate("BookDetail", { isbn: book.isbn })
              }
            >
              <BookBox>
                <Image source={{ uri: book.image }} />
              </BookBox>
            </TouchableOpacity>
          ))}
        </BookScroll>
      </Container>
    </>
  );
};

export default withNavigation(HomeScreen);
