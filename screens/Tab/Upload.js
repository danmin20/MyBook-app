import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-apollo-hooks";
import {
  UPLOAD,
  FEED,
  SEARCH_USER,
  ME,
  USER_DETAIL,
  SEARCH
} from "../../gql/queries";
import useInput from "../../hook/useInput";
import { ActivityIndicator, Image } from "react-native";
import styles from "../../styles";
import constants from "../../constants";

const View = styled.View`
  justify-content: flex-start;
  flex: 1;
`;
const Container = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0px solid ${styles.lightGreyColor};
  border-top-width: 2px;
  border-bottom-width: 1px;
`;
const Form = styled.View`
  padding: 15px 0;
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
`;
const Sentiment = styled.TextInput`
  margin-left: 15px;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  padding: 15px;
  align-items: flex-end;
`;
const Text = styled.Text`
  font-size: 15px;
  margin-left: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const Upload = styled.Text`
  color: ${styles.blueColor};
  font-weight: bold;
  font-size: 15px;
`;
const Share = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 15px;
  margin-top: -15px;
  margin-bottom: -15px;
`;
const Setting = styled.Text`
  font-size: 12px;
  margin-left: 15px;
  margin-top: 10px;
  font-weight: bold;
  color: ${styles.darkGreyColor};
`;

export default ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const { data } = useQuery(SEARCH, {
    variables: {
      term: navigation
        .getParam("bookId")
        .replace(/<b>/gi, "")
        .replace(/<\/b>/gi, "")
    }
  });
  const sentimentInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: [FEED, SEARCH_USER, ME, USER_DETAIL] }]
  });
  const book = data.books[0];
  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          sentiment: sentimentInput.value,
          bookId: navigation.getParam("bookId")
        }
      });
      if (upload.id) {
        navigation.navigate("MyBooks");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Button onPress={handleUpload}>
        {loading ? <ActivityIndicator color="white" /> : <Text>업로드</Text>}
      </Button>
      <Container>
        <Image
          source={{ uri: book.image }}
          style={{ height: 116, width: 82, borderRadius: 5 }}
        />
        <Sentiment
          onChangeText={sentimentInput.onChange}
          value={sentimentInput.value}
          placeholder="내용 입력..."
          multiline={true}
          placeholderTextColor={styles.darkGreyColor}
        />
      </Container>
    </View>
  );
};
