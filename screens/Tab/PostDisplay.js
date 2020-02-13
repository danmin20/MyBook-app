import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { POSTS_BOOK } from "../../gql/queries";
import { Image } from "react-native";
import styles from "../../styles";

const Title = styled.Text`
  background-color: white;
  width: 84px;
  padding: 5px;
  position: absolute;
  bottom: 15px;
  margin: auto;
  border: 1px solid ${styles.blackColor};
  color: black;
  font-size: 12px;
  text-align: center;
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
  background-color: ${styles.blackColor};
`;

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(POSTS_BOOK, {
    variables: { isbn: navigation.getParam("isbn") }
  });
  const posts = data.postsOfBook;
  return (
    <Books>
      {!loading &&
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
                width: 82
              }}
              source={{ uri: post.book?.image }}
            />
            <Title>{post.title}</Title>
          </Book>
        ))}
    </Books>
  );
};
