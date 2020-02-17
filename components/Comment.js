import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import styles from "../styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "react-apollo-hooks";
import { DEL_COMMENT } from "../gql/queries";
import Loader from "./Loader";

const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  margin: 5px 10px;
  border: 0px solid ${styles.brownGrey};
  border-bottom-width: 1px;
`;
const Name = styled.TouchableOpacity`
  margin-right: 10px;
`;
const CommentText = styled.View``;
const Date = styled.View`
  margin-top: auto;
  margin-left: auto;
`;
const Delete = styled.View`
  margin-top: auto;
  margin-left: auto;
  padding: 0 10px;
`;

const Comment = ({ navigation, id, text, userOfPost, user, createdAt }) => {
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteCommentMutation] = useMutation(DEL_COMMENT);
  const handleDelete = () => {
    Alert.alert(
      "",
      "댓글을 삭제하시겠습니까?",
      [
        {
          text: "예",
          onPress: async () => {
            try {
              setLoading(true);
              const {
                data: { deleteComment }
              } = await deleteCommentMutation({ variables: { id } });
              if (deleteComment.id) {
                setIsDeleted(true);
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
    <>
      {isDeleted && null}
      {loading && <Loader />}
      {!isDeleted && (
        <Container>
          <Name
            onPress={() =>
              navigation.navigate("UserDetail", { userId: user.id })
            }
          >
            <Text style={{ color: styles.brownColor }}>{user.name}</Text>
          </Name>
          <CommentText>
            <Text>{text}</Text>
          </CommentText>
          <View style={{ flex: 1 }}>
            {(userOfPost === user.id || user.isSelf) && (
              <Delete>
                <TouchableOpacity onPress={handleDelete}>
                  <MaterialIcons
                    name="delete"
                    size={15}
                    color={styles.brownColor}
                  />
                </TouchableOpacity>
              </Delete>
            )}
          </View>
          <Date>
            <Text style={{ fontSize: 10, color: styles.moderateBrownColor }}>
              {createdAt.substring(0, 10).replace(/-/gi, ".")}
            </Text>
          </Date>
        </Container>
      )}
    </>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  createdAt: PropTypes.string.isRequired
};

export default withNavigation(Comment);
