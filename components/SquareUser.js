import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import styled from "styled-components";
import { TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import PropTypes from "prop-types";

const Container = styled.View`
  padding: 25px 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0px solid ${styles.brownGrey};
  border-bottom-width: 1px;
`;
const Name = styled.View`
  align-items: center;
  margin-right: 20px;
`;
const Info = styled.View`
  flex-direction: row;
  margin-left: 30px;
  align-items: center;
  flex: 2;
`;
const Sub = styled.View`
  justify-content: center;
  align-items: center;
`;
const Posts = styled.View`
  align-items: center;
  flex: 1;
`;
const Self = styled.View`
  background-color: ${styles.brownColor};
  width: 25px;
  height: 25px;
  border-radius: 17.5px;
  align-items: center;
  justify-content: center;
`;

const SquareUser = ({
  id,
  name,
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
        <Info>
          <Name>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{name}</Text>
          </Name>
          <Sub>
            {isSelf && (
              <Self>
                <Text style={{ color: "white", fontWeight: "bold" }}>나</Text>
              </Self>
            )}
            {isFollowing && (
              <Text style={{ color: styles.brownColor }}>• 팔로잉</Text>
            )}
          </Sub>
        </Info>
        <Posts>
          <Text>총 {postsCount}권의 책</Text>
        </Posts>
      </Container>
    </TouchableOpacity>
  );
};

SquareUser.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  postsCount: PropTypes.number.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default withNavigation(SquareUser);
