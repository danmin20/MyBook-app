import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { Text, TouchableOpacity } from "react-native";
import styles from "../styles";

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 5px 10px;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
`;
const Name = styled.TouchableOpacity`
  margin-right: 10px;
  opacity: 0.5;
`;
const Comment = styled.View``;
const Date = styled.View`
  margin-top: auto;
  margin-left: auto;
  opacity: 0.3;
`;
const Funcs = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  opacity: 0.5;
`;

const Comments = ({ navigation, text, userOfPost, user, createdAt }) => {
  return (
    <Container>
      <Name
        onPress={() => navigation.navigate("UserDetail", { userId: user.id })}
      >
        <Text>{user.name}</Text>
      </Name>
      <Comment>
        <Text>{text}</Text>
      </Comment>
      {userOfPost === user.id && (
        <Funcs>
          <TouchableOpacity>
            <Text style={{ opacity: 0.7 }}>삭제 </Text>
          </TouchableOpacity>
          <Text> | </Text>
          <TouchableOpacity>
            <Text style={{ opacity: 0.7 }}> 수정</Text>
          </TouchableOpacity>
        </Funcs>
      )}
      <Date>
        <Text style={{ fontSize: 10 }}>
          {createdAt.substring(0, 10).replace(/-/gi, ".")}
        </Text>
      </Date>
    </Container>
  );
};

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Comments);
