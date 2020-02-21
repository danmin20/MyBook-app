import React, { useState } from "react";
import styled from "styled-components";
import {
  ScrollView,
  RefreshControl,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { POST_DETAIL, ADD_COMMENT } from "../../gql/queries";
import Post from "../../components/Post";
import CommentWindow from "../../components/CommentWindow";
import useInput from "../../hook/useInput";
import styles from "../../styles";

const CommentInput = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${styles.moderateBrownColor};
  padding: 15px 10px;
  margin-top: auto;
`;
const Button = styled.TouchableOpacity`
  background-color: ${styles.brownColor};
  padding: 10px 0;
  margin-left: 10px;
  border-radius: 10px;
  align-items: center;
  width: 13%;
`;

export default ({ navigation }) => {
  const commentInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") },
    fetchPolicy: "cache-and-network"
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  const handleAddComment = async () => {
    try {
      setLoading(true);
      const {
        data: { addComment }
      } = await addCommentMutation({
        variables: {
          postId: navigation.getParam("id"),
          text: commentInput.value
        }
      });
      if (addComment.id) {
        commentInput.setValue("");
        refresh();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {data && data?.seeFullPost && (
        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
          >
            <Post {...data?.seeFullPost} />
          </ScrollView>
          <CommentInput>
            <CommentWindow
              {...commentInput}
              placeholder="댓글 입력..."
              onSubmitEditing={handleAddComment}
            />
            <Button onPress={handleAddComment}>
              {loading ? (
                <ActivityIndicator color={"white"} />
              ) : (
                <Text style={{ color: "white" }}>등록</Text>
              )}
            </Button>
          </CommentInput>
        </View>
      )}
    </>
  );
};
