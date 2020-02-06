import React from "react";
import styled from "styled-components";
import { SEARCH } from "../gql/queries";
import { TouchableOpacity } from "react-native";
import styles from "../styles";
import { useQuery } from "react-apollo-hooks";
import Swiper from "react-native-swiper";
import Loader from "./Loader";
import constants from "../constants";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  border: 0.5px solid ${styles.moderateGreyColor};
  align-items: center;
`;
const TopicBox = styled.View`
  background-color: ${styles.lightGreyColor};
  width: ${constants.width}px;
`;
const Topic = styled.Text`
  font-size: 18px;
  margin: 10px;
`;
const BookBox = styled.View`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 15px;
`;
const Author = styled.Text`
  font-size: 13px;
  opacity: 0.5;
  margin-top: 10px;
`;
const Image = styled.Image`
  width: 70px;
  height: 100px;
  margin: 10px;
`;
const Info = styled.View`
  flex: 1;
  justify-content: center;
  margin: 10px;
`;

const HomeScreen = ({ navigation }) => {
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
  const { data: data_50, loading: loading_50 } = useQuery(SEARCH, {
    variables: { term: "50대" }
  });
  return (
    <>
      {loading_10 && loading_20 && loading_30 && loading_40 && loading_50 && (
        <Loader />
      )}
      <Container key={1}>
        <TopicBox>
          <Topic>10대 추천도서</Topic>
        </TopicBox>
        <Swiper style={{ height: 170 }} activeDotColor={"black"}>
          {data_10?.books.map(book => (
            <TouchableOpacity
              key={book.isbn}
              onPress={() =>
                navigation.navigate("BookDetail", { isbn: book.isbn })
              }
            >
              <BookBox>
                <Image source={{ uri: book.image }} />
                <Info>
                  <Title>
                    {book.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Title>
                  <Author>
                    {book.author.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Author>
                </Info>
              </BookBox>
            </TouchableOpacity>
          ))}
        </Swiper>
      </Container>
      <Container
        key={2}
        onPress={() => navigation.navigate("BookDetail", { isbn: book.isbn })}
      >
        <TopicBox>
          <Topic>20대 추천도서</Topic>
        </TopicBox>
        <Swiper style={{ height: 170 }} activeDotColor={"black"}>
          {data_20?.books.map(book => (
            <TouchableOpacity key={book.isbn}>
              <BookBox>
                <Image source={{ uri: book.image }} />
                <Info>
                  <Title>
                    {book.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Title>
                  <Author>
                    {book.author.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Author>
                </Info>
              </BookBox>
            </TouchableOpacity>
          ))}
        </Swiper>
      </Container>
      <Container
        key={3}
        onPress={() => navigation.navigate("BookDetail", { isbn: book.isbn })}
      >
        <TopicBox>
          <Topic>30대 추천도서</Topic>
        </TopicBox>
        <Swiper style={{ height: 170 }} activeDotColor={"black"}>
          {data_30?.books.map(book => (
            <TouchableOpacity key={book.isbn}>
              <BookBox>
                <Image source={{ uri: book.image }} />
                <Info>
                  <Title>
                    {book.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Title>
                  <Author>
                    {book.author.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Author>
                </Info>
              </BookBox>
            </TouchableOpacity>
          ))}
        </Swiper>
      </Container>
      <Container
        key={4}
        onPress={() => navigation.navigate("BookDetail", { isbn: book.isbn })}
      >
        <TopicBox>
          <Topic>40대 추천도서</Topic>
        </TopicBox>
        <Swiper style={{ height: 170 }} activeDotColor={"black"}>
          {data_40?.books.map(book => (
            <TouchableOpacity key={book.isbn}>
              <BookBox>
                <Image source={{ uri: book.image }} />
                <Info>
                  <Title>
                    {book.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Title>
                  <Author>
                    {book.author.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Author>
                </Info>
              </BookBox>
            </TouchableOpacity>
          ))}
        </Swiper>
      </Container>
      <Container
        key={5}
        onPress={() => navigation.navigate("BookDetail", { isbn: book.isbn })}
      >
        <TopicBox>
          <Topic>50대 추천도서</Topic>
        </TopicBox>
        <Swiper style={{ height: 170 }} activeDotColor={"black"}>
          {data_50?.books.map(book => (
            <TouchableOpacity key={book.isbn}>
              <BookBox>
                <Image source={{ uri: book.image }} />
                <Info>
                  <Title>
                    {book.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Title>
                  <Author>
                    {book.author.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
                  </Author>
                </Info>
              </BookBox>
            </TouchableOpacity>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default withNavigation(HomeScreen);
