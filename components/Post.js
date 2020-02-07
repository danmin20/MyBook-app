import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text, Linking } from "react-native";
import { withNavigation } from "react-navigation";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.View``;
const Header = styled.View``;
const Name = styled.Text`
  color: white;
`;
const Content = styled.View`
  margin: 0 20px;
`;
const Sentiment = styled.View`
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ${styles.lightGreyColor};
`;
const Date = styled.Text`
  margin-left: auto;
  font-size: 10px;
  opacity: 0.7;
`;
const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
const Link = styled.View`
  flex-direction: row;
  background-color: #00c73c;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
`;
const BookInfo = styled.View`
  flex-direction: row;
  margin: 20px 80px;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.View``;
const Buttom = styled.View`
  margin: 10px 0;
  padding-top: 10px;
  border: 0px solid ${styles.moderateGreyColor};
  border-top-width: 1px;
`;
const NameBox = styled.View`
  margin-top: 15px;
  background-color: #403e3b;
  padding: 3px 25px;
  margin-right: auto;
  border-radius: 10px;
`;

const Post = ({
  id,
  user,
  book,
  likeCount: likeCountProp,
  comments = [],
  isLiked: isLikedProp,
  createdAt,
  sentiment,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const handleLike = async () => {
    setIsLiked(p => !p);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    try {
      await toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserDetail", { userId: user.id })}
        ></TouchableOpacity>
      </Header>
      <Content>
        <BookInfo>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BookDetail", {
                isbn: book.isbn.replace(/<b>/gi, "").replace(/<\/b>/gi, "")
              })
            }
          >
            <Image
              style={{ height: 116, width: 82, borderRadius: 5 }}
              source={{ uri: book.image }}
            />
          </TouchableOpacity>
          <Info>
            <Text>{book.author}</Text>
            <Text>{book.publisher}</Text>
            <Link>
              <MaterialCommunityIcons
                name={"alpha-n-box"}
                color={"white"}
                size={20}
              />
              <Text
                style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                onPress={() => Linking.openURL(book.link)}
              >
                네이버 책
              </Text>
            </Link>
          </Info>
        </BookInfo>
        <Buttom>
          <NameBox>
            <Name>{user.name}</Name>
          </NameBox>
          <Sentiment>
            <Text>{sentiment}</Text>
          </Sentiment>
          <Date>
            {createdAt
              .substring(0, 10)
              .replace("-", "년 ")
              .replace("-", "월 ")}
            일에 작성된 글
          </Date>
        </Buttom>
      </Content>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired,
  likeCount: PropTypes.number.isRequired,
  sentiment: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Post);
