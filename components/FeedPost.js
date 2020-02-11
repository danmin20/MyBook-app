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
const Name = styled.Text`
  color: ${styles.blackColor};
`;
const Sentiment = styled.View`
  flex: 1;
  height: 116px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${styles.brownGrey};
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
const TitleBox = styled.View`
  background-color: ${styles.moderateBrownColor};
  flex-direction: row;
  flex: 1;
`;
const Square = styled.View`
  background-color: white;
  flex:1;
  border-bottom-right-radius: 20px;
`;
const Title = styled.View`
  flex: 13;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  background-color: ${styles.moderateBrownColor};
  border-radius: 10px;
  border-bottom-left-radius: 0;
`;
const NameBox = styled.View`
  margin-top: auto;
  padding-bottom: 0;
  flex: 4;
  background-color: ${styles.brownColor};
`;
const Header = styled.View`
  width: 90%;
  flex-direction: row;
  margin: 10px;
  flex: 1;
`;

const Post = ({ id, title, user, book, createdAt, sentiment, navigation }) => {
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
          <TitleBox>
            <Square/>
          </TitleBox>
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
            <Text style={{ color: styles.brownColor }}>{sentiment}</Text>
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
