import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-apollo-hooks";
import { UPLOAD, FEED, ME, SEARCH } from "../../gql/queries";
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
  padding: 15px 15px;
`;
const Header = styled.View`
  flex-direction: row;
  justify-content: center;
`;
const Content = styled.View`
  margin: 15px;
  flex-direction: row;
`;
const Title = styled.TextInput`
  padding: 5px 10px;
  font-size: 18px;
  max-width: ${constants.width - 50}px;
  text-align: center;
`;
const Sentiment = styled.TextInput`
  border-radius: 10px;
  margin-left: 15px;
  background-color: ${styles.brownGrey};
  padding: 10px;
  min-height: 116px;
  flex: 1;
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
      start: 1
    }
  });
  const titleInput = useInput("");
  const sentimentInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD);
  const { refetch: refetchFeed } = useQuery(FEED, {
    variables: {
      first: 10,
      offset: 0
    }
  });
  const { refetch: refetchMe } = useQuery(ME);
  const handleUpload = async () => {
    if (titleInput.value === "" || sentimentInput.value === "") {
      Alert.alert("내용을 모두 입력해주세요");
    } else {
      try {
        setLoading(true);
        const {
          data: { upload }
        } = await uploadMutation({
          variables: {
            title: titleInput.value,
            sentiment: sentimentInput.value,
            bookId: navigation.getParam("bookId")
          }
        });
        await refetchFeed();
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
          <Text>업로드하기 </Text>
          <MaterialCommunityIcons name="arrow-right" size={20} />
        </Button>
        <Container>
          <Header>
            <MaterialCommunityIcons
              name="format-quote-open"
              size={30}
              color={styles.brownColor}
            />
            <Title
              onChangeText={titleInput.onChange}
              value={titleInput.value}
              placeholder="제목 입력..."
              multiline={true}
              placeholderTextColor={styles.darkGreyColor}
            />
            <MaterialCommunityIcons
              name="format-quote-close"
              size={30}
              color={styles.brownColor}
            />
          </Header>
          <Content>
            <Image
              style={{ position: "absolute" }}
              source={require("../../assets/noImage.png")}
            />
            {book?.image !== "" && <Image source={{ uri: book?.image }} />}
            <Sentiment
              onChangeText={sentimentInput.onChange}
              value={sentimentInput.value}
              placeholder="내용 입력..."
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
