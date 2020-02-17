import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity, Image, Text, Linking, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { useMutation, useQuery } from "react-apollo-hooks";
import styles from "../styles";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons
} from "@expo/vector-icons";
import { TOGGLE_LIKE, ME, EDIT_POST, FEED } from "../gql/queries";
import Loader from "./Loader";
import Comment from "./Comment";
import constants from "../constants";

const Container = styled.View`
  max-height: ${constants.height}px;
`;
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
  background-color: ${styles.brownGrey};
`;
const Bottom = styled.View`
  flex-direction: row;
`;
const Date = styled.Text`
  margin-left: auto;
  font-size: 10px;
  color: ${styles.brownColor};
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
  justify-content: center;
  align-items: center;
`;
const Info = styled.View`
  margin-left: 20px;
`;
const Buttom = styled.View`
  margin: 10px 0;
  padding-top: 10px;
  padding-bottom: 20px;
  border: 0px solid ${styles.brownGrey};
  border-top-width: 1px;
  border-bottom-width: 1px;
`;
const NameBox = styled.TouchableOpacity`
  background-color: ${styles.moderateBrownColor};
  padding: 3px 25px;
  margin-right: auto;
  border-radius: 10px;
`;
const Funcs = styled.View`
  flex-direction: row;
  align-items: center;
`;
const HandleComments = styled.TouchableOpacity`
  margin-right: auto;
  margin-left: 15px;
  padding: 5px 10px;
  opacity: 0.5;
`;
const Like = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;
const HeartIconContainer = styled.TouchableOpacity`
  opacity: 0.8;
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
  const [isOpened, setIsOpened] = useState(true);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const { refetch: refetchFeed } = useQuery(FEED, {
    variables: {
      first: 10,
      offset: 0
    }
  });
  const { refetch: refetchMe } = useQuery(ME);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [deleteMutation] = useMutation(EDIT_POST);
  const handleOpen = () => {
    setIsOpened(p => !p);
  };
  const handleLike = async () => {
    setIsLiked(p => !p);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    try {
      await toggleLikeMutation();
      await refetchMe();
    } catch (e) {
      console.log(e);
    }
  };
  const handleDelete = () => {
    Alert.alert(
      "",
      "글을 삭제하시겠습니까?",
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
                  <MaterialIcons
                    name="mode-edit"
                    size={15}
                    color={styles.brownColor}
                  />
                </TouchableOpacity>
                <Text>{"  "}</Text>
                <TouchableOpacity onPress={handleDelete}>
                  <MaterialIcons
                    name="delete"
                    size={15}
                    color={styles.brownColor}
                  />
                </TouchableOpacity>
              </Funcs>
            )}
          </Header>
          <Sentiment>
            <Text>{sentiment}</Text>
          </Sentiment>
          <Bottom>
            <Like>
              <HeartIconContainer onPress={handleLike}>
                <Ionicons
                  color={isLiked ? styles.redColor : styles.blackColor}
                  size={25}
                  name={isLiked ? "ios-heart" : "ios-heart-empty"}
                />
              </HeartIconContainer>
              <Text style={{ marginLeft: 5 }}>좋아요 {likeCount}개</Text>
            </Like>
            <Date>
              {createdAt
                .substring(0, 10)
                .replace("-", "년 ")
                .replace("-", "월 ")}
              일에 작성된 글
            </Date>
          </Bottom>
        </Buttom>
      </Content>
      <HandleComments onPress={handleOpen}>
        {isOpened ? <Text>댓글 숨기기</Text> : <Text>댓글 펼치기</Text>}
      </HandleComments>
      {comments[0] !== undefined && isOpened && (
        <>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              postId={id}
              postIsSelf={user.isSelf}
              {...comment}
            />
          ))}
        </>
      )}
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
  }),
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
      })
    })
  ),
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Post);
