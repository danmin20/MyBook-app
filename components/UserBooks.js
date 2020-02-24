import React, { useState } from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import { Image, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_FOLLOW } from "../gql/queries";
import PropTypes from "prop-types";

const View = styled.View`
  background-color: white;
  height: ${constants.height}px;
`;
const Top = styled.View`
  background-color: ${styles.brownColor};
  padding-bottom: 25px;
  align-items: center;
`;
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;
const Books = styled.View`
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Book = styled.TouchableOpacity`
  margin-top: 30px;
  margin-left: 15px;
  margin-right: 15px;
  border: 0px solid ${styles.blackColor};
  padding: 1px;
  border-bottom-width: 15px;
  border-right-width: 15px;
  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${styles.brownColor};
`;
const Profile = styled.View`
  justify-content: center;
  align-items: center;
  width: 30%;
`;
const Stats = styled.View`
  align-items: center;
  padding-right: 10px;
  width: 70%;
`;
const Name = styled.Text`
  font-size: 20px;
  color: white;
`;
const BioBox = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  max-width: 80%;
`;
const Bio = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 15px;
`;
const ProfileStats = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
`;
const Stat = styled.View`
  align-items: center;
  background-color: ${styles.lightBrownColor};
  margin-left: 10px;
  justify-content: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;
const FollowStat = styled.TouchableOpacity`
  align-items: center;
  background-color: ${styles.lightBrownColor};
  margin-left: 10px;
  justify-content: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;
const Num = styled.Text`
  font-size: 20px;
  color: ${styles.blackColor};
`;
const StatName = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: ${styles.brownColor};
`;
const Title = styled.Text`
  background-color: ${styles.brownColor};
  width: 84px;
  padding: 5px;
  position: absolute;
  bottom: 15px;
  margin: auto;
  font-size: 12px;
  color: white;
  text-align: center;
`;
const Func = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${styles.lightBrownColor};
  border-radius: 5px;
  padding: 3px 15px;
`;
const FuncText = styled.Text`
  color: ${styles.blackColor};
  font-size: 11px;
`;
const Buttoncontainer = styled.View`
  padding: 2px 0;
  flex-direction: row;
  background-color: ${styles.lightBrownColor};
`;
const Button = styled.TouchableOpacity`
  width: ${constants.width / 2}px;
  align-items: center;
`;
const Funcs = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const UserBooks = ({
  id,
  name,
  bio,
  postsCount,
  followersCount,
  followingCount,
  followers,
  following,
  posts,
  likes,
  isSelf,
  isFollowing: isFollowingProp,
  navigation
}) => {
  const logOut = useLogOut();
  const [isFollowing, setIsFollowing] = useState(isFollowingProp);
  const [toggleFollowMtation] = useMutation(TOGGLE_FOLLOW, {
    variables: { id }
  });
  const [isMine, setIsMine] = useState(true);
  const [isLikes, setIsLikes] = useState(false);
  const setMine = () => {
    setIsMine(true);
    setIsLikes(false);
  };
  const setLikes = () => {
    setIsLikes(true);
    setIsMine(false);
  };
  const handleFollow = async () => {
    setIsFollowing(p => !p);
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
    try {
      await toggleFollowMtation();
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogOut = () => {
    Alert.alert(
      "",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "예",
          onPress: async () => {
            logOut();
          }
        },
        { text: "아니오", style: "cancel" }
      ],
      { cancelable: false }
    );
  };
  return (
    <View>
      <Top>
        <Header>
          <Profile>
            <Name>{name}</Name>
            {isSelf ? (
              <Funcs>
                <TouchableOpacity onPress={handleLogOut}>
                  <Func>
                    <FuncText>로그아웃</FuncText>
                  </Func>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 5 }}
                  onPress={() => navigation.navigate("EditUser", { name, bio })}
                >
                  <Ionicons
                    name="ios-settings"
                    size={20}
                    color={styles.lightBrownColor}
                  />
                </TouchableOpacity>
              </Funcs>
            ) : (
              <Funcs>
                <TouchableOpacity onPress={handleFollow}>
                  {isFollowing ? (
                    <Func>
                      <FuncText>언팔로우</FuncText>
                    </Func>
                  ) : (
                    <Func>
                      <FuncText>팔로우</FuncText>
                    </Func>
                  )}
                </TouchableOpacity>
              </Funcs>
            )}
          </Profile>
          <Stats>
            <ProfileStats>
              <Stat>
                <StatName>게시물</StatName>
                <Num>{postsCount}</Num>
              </Stat>
              <FollowStat
                onPress={() =>
                  navigation.navigate("FollowDisplay", {
                    follow: followers,
                    type: "팔로워"
                  })
                }
              >
                <StatName>팔로워</StatName>
                <Num>{followersCount}</Num>
              </FollowStat>
              <FollowStat
                onPress={() =>
                  navigation.navigate("FollowDisplay", {
                    follow: following,
                    type: "팔로잉"
                  })
                }
              >
                <StatName>팔로잉</StatName>
                <Num>{followingCount}</Num>
              </FollowStat>
            </ProfileStats>
          </Stats>
        </Header>
        {bio && (
          <BioBox>
            <MaterialCommunityIcons
              name="format-quote-open"
              color={styles.moderateBrownColor}
              size={30}
            />
            <Bio> {bio} </Bio>
            <MaterialCommunityIcons
              name="format-quote-close"
              color={styles.moderateBrownColor}
              size={30}
            />
          </BioBox>
        )}
      </Top>
      <Buttoncontainer>
        <Button onPress={setMine}>
          <MaterialCommunityIcons
            name={"pencil-circle"}
            size={40}
            color={isMine ? styles.blackColor : styles.brownColor}
          />
        </Button>
        <Button onPress={setLikes}>
          <MaterialCommunityIcons
            name={"heart-circle"}
            size={40}
            color={isLikes ? styles.blackColor : styles.brownColor}
          />
        </Button>
      </Buttoncontainer>
      <ScrollView>
        <Books>
          {isMine &&
            posts &&
            posts.map(post => (
              <Book
                key={post.id}
                onPress={() =>
                  navigation.navigate("PostDetail", {
                    title: post.title,
                    id: post.id
                  })
                }
              >
                <Image
                  style={{
                    height: 116,
                    width: 82,
                    position: "absolute"
                  }}
                  source={require("../assets/noImage.png")}
                />
                <Image
                  style={{
                    height: 116,
                    width: 82
                  }}
                  source={{ uri: post.book?.image }}
                />
                <Title>{post.title}</Title>
              </Book>
            ))}
          {isLikes &&
            likes &&
            likes.map(like => (
              <Book
                key={like.post.id}
                onPress={() =>
                  navigation.navigate("PostDetail", {
                    title: like.post.title,
                    id: like.post.id
                  })
                }
              >
                <Image
                  style={{
                    height: 116,
                    width: 82
                  }}
                  source={{ uri: like.post.book.image }}
                />
                <Title>{like.post.title}</Title>
              </Book>
            ))}
        </Books>
      </ScrollView>
    </View>
  );
};

UserBooks.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string,
  postsCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      book: PropTypes.shape({
        image: PropTypes.string
      })
    })
  ),
  isSelf: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired
};

export default withNavigation(UserBooks);
