import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Container = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const Name = styled.Text``;
const Sentiment = styled.View`
  flex: 1;
  height: 116px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${styles.brownGrey};
`;
const Date = styled.Text`
  margin-right: 10px;
  margin-left: auto;
  margin-bottom: 10px;
  font-size: 10px;
  color: ${styles.darkGreyColor};
`;
const Box = styled.View`
  margin: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const BookInfo = styled.View`
  align-items: center;
  margin-right: 10px;
`;
const Title = styled.View`
  flex: 13;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`;
const NameBox = styled.View`
  padding: 5px 10px;
  margin: auto;
  flex: 3;
  background-color: ${styles.brownGrey};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
const Header = styled.View`
  width: 95%;
  flex-direction: row;
  margin: 10px;
  flex: 1;
`;

const Post = ({ id, title, user, book, createdAt, sentiment, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("PostDetail", { title, id })}
    >
      <Container>
        <Header>
          <NameBox>
            <Name>{user.name}</Name>
          </NameBox>
          <Title>
            <MaterialCommunityIcons
              name="format-quote-open"
              size={20}
              color={styles.redColor}
            />
            <Text
              style={{
                fontSize: 15,
                fontStyle: "italic",
                color: styles.blackColor,
                fontWeight: "bold",
              }}
            >
              {" "}
              {title}{" "}
            </Text>
            <MaterialCommunityIcons
              name="format-quote-close"
              size={20}
              color={styles.redColor}
            />
          </Title>
        </Header>
        <Box>
          <BookInfo>
            <Image
              style={{
                height: 116,
                width: 82,
                borderRadius: 5,
                position: "absolute",
              }}
              source={require("../assets/noImage.png")}
            />
            <Image
              style={{
                height: 116,
                width: 82,
                borderRadius: 5,
              }}
              source={{ uri: book.image }}
            />
          </BookInfo>
          <Sentiment>
            {sentiment.length > 135 ? (
              <Text>{sentiment.substring(0, 135)}...</Text>
            ) : (
              <Text>{sentiment}</Text>
            )}
          </Sentiment>
        </Box>
        <Date>
          {createdAt.substring(0, 10).replace("-", "년 ").replace("-", "월 ")}일
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
    name: PropTypes.string.isRequired,
  }).isRequired,
  book: PropTypes.shape({
    isbn: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    link: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
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
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default withNavigation(Post);
