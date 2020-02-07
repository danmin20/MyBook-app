import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";

const Container = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: center;
  border: 0px solid ${styles.moderateGreyColor};
  border-bottom-width: 1px;
`;
const Name = styled.Text`
  color: ${styles.blackColor};
`;
const Sentiment = styled.View`
  flex: 1;
  height: 116px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${styles.lightGreyColor};
`;
const Date = styled.Text`
  margin-right: 10px;
  margin-left: auto;
  font-size: 10px;
  opacity: 0.7;
`;
const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
const Box = styled.View`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const BookInfo = styled.View`
  align-items: center;
  margin-right: 5px;
`;
const NameBox = styled.View`
  margin: 10px;
  padding: 5px 15px;
  margin-right: auto;
  border: 0px solid ${styles.darkGreyColor};
  border-bottom-width: 1px;
`;

const Post = ({
  id,
  title,
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
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PostDetail", { title: title, id: id })
      }
    >
      <Container>
        <NameBox>
          <Name>{user.name}</Name>
        </NameBox>
        <Box>
          <BookInfo>
            <Image
              style={{
                height: 116,
                width: 82,
                borderRadius: 5,
                marginRight: 5
              }}
              source={{ uri: book.image }}
            />
          </BookInfo>
          <Sentiment>
            <Text>{sentiment}</Text>
          </Sentiment>
        </Box>
        <Date>
          {createdAt
            .substring(0, 10)
            .replace("-", "년 ")
            .replace("-", "월 ")}
          일
        </Date>
      </Container>
    </TouchableOpacity>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
