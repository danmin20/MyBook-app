import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../constants";
import { TOGGLE_LIKE } from "../gql/queries";

const Container = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 10px;
  font-size: 10px;
  opacity: 0.7;
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
const Title = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  margin-right: 10px;
  flex: 3;
`;
const NameBox = styled.View`
  align-items: center;
  justify-content: center;
  border: 0px solid ${styles.darkGreyColor};
  border-bottom-width: 1px;
  padding: 10px;
  flex: 1;
`;
const Header = styled.View`
  width: ${constants.width}px;
  flex-direction: row;
  margin: 10px;
  flex: 1;
`;

const Post = ({
  id,
  title,
  user,
  book,
  likeCount: likeCountProp,
  isLiked: isLikedProp,
  createdAt,
  sentiment,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PostDetail", { title: title, id: id })
      }
    >
      <Container>
        <Header>
          <NameBox>
            <Name>{user.name}</Name>
          </NameBox>
          <Title>
            <MaterialCommunityIcons name="format-quote-open" size={20} />
            <Text style={{ fontSize: 15, fontStyle: "italic" }}> {title} </Text>
            <MaterialCommunityIcons name="format-quote-close" size={20} />
          </Title>
        </Header>
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
    image: PropTypes.string,
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
        name: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Post);
