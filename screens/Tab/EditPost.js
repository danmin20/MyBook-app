import React, { useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "react-apollo-hooks";
import { FEED, ME, SEARCH, EDIT_POST } from "../../gql/queries";
import useInput from "../../hook/useInput";
import { ActivityIndicator } from "react-native";
import styles from "../../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../../constants";

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
  background-color: ${styles.lightGreyColor};
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
  const [loading, setIsLoading] = useState(false);
  const titleInput = useInput();
  const sentimentInput = useInput();
  const [editMutation] = useMutation(EDIT_POST);
  const { refetch: refetchFeed } = useQuery(FEED);
  const { refetch: refetchMe } = useQuery(ME);
  const uri = navigation.getParam("uri");
  const handleEdit = async () => {
    try {
      setIsLoading(true);
      const {
        data: { editPost }
      } = await editMutation({
        variables: {
          id: navigation.getParam("postId"),
          title: titleInput.value,
          sentiment: sentimentInput.value,
          action: "EDIT"
        }
      });
      await refetchFeed();
      await refetchMe();
      if (editPost.id) {
        navigation.navigate("PostDetail", { title: titleInput.value });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Button onPress={handleEdit}>
        {loading ? (
          <ActivityIndicator
            style={{ marginLeft: 15, marginTop: 3, marginBottom: 3 }}
            color="black"
          />
        ) : (
          <Text>수정하기 </Text>
        )}
        <MaterialCommunityIcons name="arrow-right" size={20} />
      </Button>
      <Container>
        <Header>
          <MaterialCommunityIcons name="format-quote-open" size={30} />
          <Title
            defaultValue={navigation.getParam("title")}
            onChangeText={titleInput.onChange}
            value={titleInput.value}
            multiline={true}
            placeholder="제목 입력..."
            placeholderTextColor={styles.darkGreyColor}
          />
          <MaterialCommunityIcons name="format-quote-close" size={30} />
        </Header>
        <Content>
          <Image
            style={{ position: "absolute" }}
            source={require("../../assets/noImage.png")}
          />
          {uri !== "" && <Image source={{ uri }} />}
          {uri === "" && <Image source={require("../../assets/noImage.png")} />}
          <Sentiment
            defaultValue={navigation.getParam("sentiment")}
            onChangeText={sentimentInput.onChange}
            value={sentimentInput.value}
            multiline={true}
            placeholder="내용 입력..."
            placeholderTextColor={styles.darkGreyColor}
          />
        </Content>
      </Container>
    </View>
  );
};
