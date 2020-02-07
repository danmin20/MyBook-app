import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";

const Container = styled.View`
  padding: 30px 15px;
  flex-direction: row;
  border: 0px solid ${styles.moderateGreyColor};
  border-bottom-width: 1px;
`;
const Name = styled.Text``;

const SquareUser = ({
  id,
  name,
  bio,
  postsCount,
  isFollowing,
  isSelf,
  navigation
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserDetail", { userId: id })}
    >
      <Container>
        <Name>{name}</Name>
      </Container>
    </TouchableOpacity>
  );
};

export default withNavigation(SquareUser);
