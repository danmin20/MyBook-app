import React from "react";
import styled from "styled-components";
import { useLogOut } from "../AuthContext";
import { Image } from "react-native";

const Header = styled.View``;
const Books = styled.View``;
const View = styled.View``;
const Profile = styled.View``;
const Name = styled.Text``;
const Bio = styled.Text``;
const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const StatName = styled.Text`
  margin-top: 5px;
  font-size: 13px;
`;

const Date = styled.Text`
  background-color: white;
  width: auto;
  padding: 10px;
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  margin: auto;
  color: black;
  font-size: 13px;
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
          <Bio>{bio}</Bio>
        </Profile>
        <ProfileStats>
          <Stat>
            <Bold>{postsCount}</Bold>
            <StatName>게시물</StatName>
          </Stat>
          <Stat>
            <Bold>{followersCount}</Bold>
            <StatName>팔로워</StatName>
          </Stat>
          <Stat>
            <Bold>{followingCount}</Bold>
            <StatName>팔로잉</StatName>
          </Stat>
        </ProfileStats>
      </Header>
      <Books>
        {posts &&
          posts.map(post => (
            <>
              <Image
                style={{ height: 150, width: 100 }}
                source={{ uri: post.book.image }}
              />
              <Date>{post.createdAt.substring(0, 10)}</Date>
            </>
          ))}
      </Books>
    </View>
  );
};

export default UserBooks;
