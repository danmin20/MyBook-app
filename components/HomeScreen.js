import React from "react";
import styled from "styled-components";
import { SEARCH, POST_DB } from "../gql/queries";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import Loader from "./Loader";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  margin-top: 5px;
`;
const ContainerDB = styled.View`
  background-color: ${styles.lightBrownColor};
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
  font-size: 10px;
  margin-bottom: 5px;
  color: ${styles.blackColor};
  background-color: white;
  padding: 1px 5px;
  text-align: center;
  border-radius: 10px;
`;

const HomeScreen = ({ navigation }) => {
  const { data, loading } = useQuery(POST_DB);
  const { data: data_10, loading: loading_10 } = useQuery(SEARCH, {
    variables: { term: "10대" }
  });
  const { data: data_20, loading: loading_20 } = useQuery(SEARCH, {
    variables: { term: "20대" }
  });
  const { data: data_30, loading: loading_30 } = useQuery(SEARCH, {
    variables: { term: "30대" }
  });
  const { data: data_40, loading: loading_40 } = useQuery(SEARCH, {
    variables: { term: "40대" }
  });
  return (
    <>
      {loading &&
        loading_10 &&
        loading_20 &&
        loading_30 &&
        loading_40 &&
        loading_50 && <Loader />}
      <ContainerDB key={0}>
        <BookScroll horizontal={true}>
          {data?.seePostDB.map(post => (
            <TouchableOpacity
              key={post.id}
              onPress={() =>
                navigation.navigate("PostDetail", {
                  id: post.id,
                  title: post.title
                })
              }
            >
              <Info>
              <CircleBookBox>
                <CircleImage source={{ uri: post.book.image }} />
              </CircleBookBox>
              <Name>{post.user.name}</Name>
              </Info>
            </TouchableOpacity>
          ))}
        </BookScroll>
      </ContainerDB>
      <Container key={1}>
        <TopicBox>
          <Topic>10대 추천도서</Topic>
        </TopicBox>
        <BookScroll horizontal={true}>
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
        <BookScroll horizontal={true}>
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
        <BookScroll horizontal={true}>
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
        <BookScroll horizontal={true}>
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
