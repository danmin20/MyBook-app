import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-apollo-hooks";
import { UPLOAD, ME, SEARCH } from "../../gql/queries";
import useInput from "../../hook/useInput";
import { ActivityIndicator, Alert } from "react-native";
import styles from "../../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../../constants";
import Loader from "../../components/Loader";

const View = styled.View`
  flex: 1;
`;
const Image = styled.Image`
  height: 116px;
  width: 82px;
  border-radius: 5px;
`;
const Container = styled.View`
  padding: 15px;
`;
const Header = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
  border: 0px solid ${styles.brownGrey};
  border-bottom-width: 1.5px;
`;
const Content = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;
const Title = styled.TextInput`
  padding: 5px 10px;
  font-size: 18px;
  max-width: ${constants.width - 50}px;
  text-align: center;
`;
const Sentiment = styled.TextInput`
  flex: 1;
  padding: 5px 10px;
`;
const Button = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: auto;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  font-size: 15px;
  margin-left: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { data, loading: loadingData } = useQuery(SEARCH, {
    variables: {
      term: navigation.getParam("bookId"),
      start: 1,
    },
  });
  const titleInput = useInput("");
  const sentimentInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD);
  const { refetch: refetchMe } = useQuery(ME);
  const handleUpload = async () => {
    if (titleInput.value === "" || sentimentInput.value === "") {
      Alert.alert("내용을 모두 입력해주세요");
    } else {
      try {
        setLoading(true);
        const {
          data: { upload },
        } = await uploadMutation({
          variables: {
            title: titleInput.value,
            sentiment: sentimentInput.value,
            bookId: navigation.getParam("bookId"),
          },
        });
        await refetchMe();
        if (upload.id) {
          navigation.navigate("MyBooks");
        } else {
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };
  if (!loadingData && data && data?.books) {
    const book = data?.books[0];
    return (
      <View>
        <Button onPress={handleUpload}>
          {loading && (
            <ActivityIndicator
              style={{ marginLeft: 15, marginTop: 3, marginBottom: 3 }}
              color={styles.brownColor}
            />
          )}
          <Text>등록 </Text>
          <MaterialCommunityIcons name="arrow-right" size={20} />
        </Button>
        <Container>
          <Header>
            <Title
              onChangeText={titleInput.onChange}
              value={titleInput.value}
              placeholder="제목"
              multiline={true}
              placeholderTextColor={styles.darkGreyColor}
            />
          </Header>
          <Content>
            <Sentiment
              onChangeText={sentimentInput.onChange}
              value={sentimentInput.value}
              placeholder="내용을 입력하세요."
              multiline={true}
              placeholderTextColor={styles.darkGreyColor}
            />
          </Content>
        </Container>
      </View>
    );
  } else {
    return <Loader />;
  }
};
