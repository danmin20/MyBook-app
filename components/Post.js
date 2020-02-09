import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text, Linking, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { useMutation, useQuery } from "react-apollo-hooks";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TOGGLE_LIKE, ME, EDIT_POST, FEED } from "../gql/queries";
import Loader from "./Loader";

const Container = styled.View``;
const Name = styled.Text`
  color: white;
`;
const Header = styled.View`
  flex-direction: row;
  margin-top: 15px;
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
const NameBox = styled.TouchableOpacity`
  background-color: ${styles.blackColor};
  padding: 3px 25px;
  margin-right: auto;
  border-radius: 10px;
`;
const Funcs = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Post = ({
  id,
  user,
  book,
  title,
  likeCount: likeCountProp,
  comments = [],
  isLiked: isLikedProp,
  createdAt,
  sentiment,
  navigation
}) => {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const { refetch: refetchFeed } = useQuery(FEED);
  const { refetch: refetchMe } = useQuery(ME);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [deleteMutation] = useMutation(EDIT_POST);
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
  const handleDelete = () => {
    Alert.alert(
      "",
      "정말로 삭제하시겠습니까?",
      [
        {
          text: "예",
          onPress: async () => {
            try {
              setLoading(true);
              const {
                data: { editPost }
              } = await deleteMutation({
                variables: {
                  id,
                  action: "DELETE"
                }
              });
              await refetchFeed();
              await refetchMe();
              if (editPost.id) {
                navigation.goBack();
              }
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          }
        },
        { text: "아니오", style: "cancel" }
      ],
      { cancelable: false }
    );
  };
  return (
    <Container>
      {loading && <Loader />}
      <Content>
        <BookInfo>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BookDetail", {
                isbn: book.isbn
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
            <Text style={{ opacity: 0.5, fontSize: 12, marginTop: 5 }}>
              {book.publisher}
            </Text>
            <Link>
              <MaterialCommunityIcons
                name={"alpha-n-box"}
                color={"white"}
                size={20}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontWeight: "bold",
                  marginLeft: 5
                }}
                onPress={() => Linking.openURL(book.link)}
              >
                네이버 책
              </Text>
            </Link>
          </Info>
        </BookInfo>
        <Buttom>
          <Header>
            <NameBox
              onPress={() =>
                navigation.navigate("UserDetail", { userId: user.id })
              }
            >
              <Name>{user.name}</Name>
            </NameBox>
            {user.isSelf && (
              <Funcs>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditPost", {
                      postId: id,
                      uri: book.image,
                      title,
                      sentiment
                    })
                  }
                >
                  <Text style={{ opacity: 0.7 }}>수정 </Text>
                </TouchableOpacity>
                <Text> | </Text>
                <TouchableOpacity onPress={handleDelete}>
                  <Text style={{ opacity: 0.7 }}> 삭제</Text>
                </TouchableOpacity>
              </Funcs>
            )}
          </Header>
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
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Post);
