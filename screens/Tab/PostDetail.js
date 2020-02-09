import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, Text } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { POST_DETAIL, ADD_COMMENT } from "../../gql/queries";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import CommentWindow from "../../components/CommentWindow";
import useInput from "../../hook/useInput";
import styles from "../../styles";

const CommentInput = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${styles.lightGreyColor};
  padding: 10px;
`;
const Button = styled.TouchableOpacity``;

export default ({ navigation }) => {
  const commentInput = useInput("");
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") },
    //fetchPolicy: "cache-and-network"
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
      const {
        data: { addComment }
      } = await addCommentMutation({
        variables: {
          postId: navigation.getParam("id"),
          text: commentInput.value
        }
      });
      if (addComment.id) {
        refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFullPost && (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
              }
            >
              <Post {...data.seeFullPost} />
            </ScrollView>
            <CommentInput>
              <CommentWindow
                {...commentInput}
                placeholder="댓글 입력..."
                onSubmitEditing={handleAddComment}
              />
              <Button>
                <Text>등록</Text>
              </Button>
            </CommentInput>
          </>
        )
      )}
    </>
  );
};
