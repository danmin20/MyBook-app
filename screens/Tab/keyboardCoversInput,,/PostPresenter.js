import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, RefreshControl, Text, View } from "react-native";
import { useQuery, useMutation } from "react-apollo-hooks";
import { POST_DETAIL, ADD_COMMENT } from "../../../gql/queries";
import Loader from "../../../components/Loader";
import Post from "../../../components/Post";
import CommentWindow from "../../../components/CommentWindow";
import useInput from "../../../hook/useInput";
import styles from "../../../styles";
import { KeyboardAwareView } from "react-native-keyboard-aware-view";
const CommentInput = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${styles.lightGreyColor};
  padding: 15px 10px;
  margin-top: auto;
`;
const Button = styled.TouchableOpacity`
  background-color: ${styles.blackColor};
  padding: 10px;
  margin-left: 10px;
  border-radius: 10px;
`;

const PostPresenter = ({ id }) => {
  const commentInput = useInput("");
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(POST_DETAIL, {
    variables: { id }
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
          postId: id,
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
          <KeyboardAwareView animated={true}>
            <View>
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
                  placeholder="댓글..."
                  onSubmitEditing={handleAddComment}
                />
                <Button>
                  <Text style={{ color: "white" }}>등록</Text>
                </Button>
              </CommentInput>
            </View>
          </KeyboardAwareView>
        )
      )}
    </>
  );
};

export default PostPresenter;
