import React from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";

const View = styled.View`
  background-color: #e3e1de;
  height: ${constants.height}px;
`;
const Header = styled.View`
  flex-direction: row;
  background-color: black;
  padding-bottom: 25px;
`;
const Books = styled.View``;
const Book = styled.View`
  margin: 3px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
  border: 0px solid white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-width: 10px;
`;
const Profile = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
const Name = styled.Text`
  font-size: 20px;
  color: white;
`;
const BioBox = styled.View`
  margin-top: 15px;
  background-color: white;
  padding: 0 10px;
  border-radius: 25px;
`;
const Bio = styled.Text``;
const ProfileStats = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Stat = styled.View`
  align-items: center;
  margin-left: 50px;
`;
const Num = styled.Text`
  font-size: 20px;
  color: white;
`;
const StatName = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: white;
`;
const Date = styled.Text`
  background-color: white;
  width: 82px;
  padding: 10px;
  position: absolute;
  bottom: 25px;
  left: 10px;
  margin: auto;
  color: black;
  font-size: 10px;
  text-align: center;
`;

const UserBooks = ({
  name,
  bio,
  postsCount,
  followersCount,
  followingCount,
  posts,
  isSelf,
  navigation
}) => {
  const logOut = useLogOut();
  return (
    <View>
      <Header>
        <Profile>
          <Name>{name}</Name>
          {bio && (
            <BioBox>
              <Bio>{bio}</Bio>
            </BioBox>
          )}
        </Profile>
        <ProfileStats>
          <Stat>
            <StatName>게시물</StatName>
            <Num>{postsCount}</Num>
          </Stat>
          <Stat>
            <StatName>팔로워</StatName>
            <Num>{followersCount}</Num>
          </Stat>
          <Stat>
            <StatName>팔로잉</StatName>
            <Num>{followingCount}</Num>
          </Stat>
        </ProfileStats>
      </Header>
      <ScrollView>
        <Books>
          {posts &&
            posts.map(post => (
              <Book key={post.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PostDetail", {
                      title: post.book.title,
                      id: post.id
                    })
                  }
                >
                  <Image
                    style={{
                      height: 116,
                      width: 82,
                      borderRadius: 5
                    }}
                    source={{ uri: post.book.image }}
                  />
                </TouchableOpacity>
                <Date>{post.createdAt.substring(0, 10)}</Date>
              </Book>
            ))}
        </Books>
      </ScrollView>
    </View>
  );
};

export default withNavigation(UserBooks);
