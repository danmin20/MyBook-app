import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import PropTypes from "prop-types";
import { TouchableOpacity, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { useMutation } from "react-apollo-hooks";

const Container = styled.View``;
const Header = styled.View``;
const Name = styled.Text``;
const Content = styled.View``;

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Post = ({
  id,
  user,
  book,
  likeCount: likeCountProp,
  comments = [],
  isLiked: isLikedProp,
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
          onPress={() => navigation.navigate("UserDetail", { name: user.name })}
        >
          <Name>{user.name}</Name>
        </TouchableOpacity>
      </Header>
      <Content>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BookDetail", {
              isbn: book.isbn.replace(/<b>/gi, "").replace(/<\/b>/gi, "")
            })
          }
        >
          <Image
            style={{ height: 50, width: 50 }}
            source={{ uri: book.image }}
          />
        </TouchableOpacity>
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
    image: PropTypes.string.isRequired
  }).isRequired,
  likeCount: PropTypes.number.isRequired,
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
