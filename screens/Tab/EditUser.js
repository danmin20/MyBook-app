import React, { useState } from "react";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import useInput from "../../hook/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { EDIT_USER, ME } from "../../gql/queries";
import styles from "../../styles";
import constants from "../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
`;
const Container = styled.View`
  padding: 15px 15px;
  align-items: center;
`;
const Input = styled.TextInput`
  padding: 5px 10px;
  font-size: 15px;
  width: 90%;
  background-color: ${styles.brownGrey};
  margin-bottom: 30px;
  border-radius: 10px;
`;
const Button = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: auto;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;
const Type = styled.Text`
  color: ${styles.brownColor};
  width: 90%;
  margin-bottom: 5px;
  padding-left: 5px;
`;
const Text = styled.Text`
  font-size: 15px;
  margin-left: 15px;
  margin-top: 3px;
  margin-bottom: 3px;
`;
const Img = styled.View`
  margin-top: 100px;
  align-items: center;
  opacity: 0.5;
`;
const Image = styled.Image`
  width: ${constants.width / 2.5}px;
  margin-bottom: -15px;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const nameInput = useInput(navigation.getParam("name"));
  const bioInput = useInput(navigation.getParam("bio"));
  const [editMutation] = useMutation(EDIT_USER);
  const { refetch: refetchMe } = useQuery(ME);
  const handleEdit = async () => {
    try {
      setLoading(true);
      const {
        data: { editUser }
      } = await editMutation({
        variables: {
          name: nameInput.value,
          bio: bioInput.value
        }
      });
      await refetchMe();
      if (editUser.id) {
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(true);
    }
  };
  return (
    <View>
      <Button onPress={handleEdit}>
        {loading && (
          <ActivityIndicator
            style={{ marginLeft: 15, marginTop: 3, marginBottom: 3 }}
            color={styles.brownColor}
          />
        )}
        <Text>수정하기 </Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          color={styles.brownColor}
        />
      </Button>
      <Container>
        <Type>이름</Type>
        <Input
          onChangeText={nameInput.onChange}
          value={nameInput.value}
          placeholder="이름 입력..."
          placeholderTextColor={styles.darkGreyColor}
        />
        <Type>소개</Type>
        <Input
          onChangeText={bioInput.onChange}
          value={bioInput.value}
          multiline={true}
          placeholder="소개 입력..."
          placeholderTextColor={styles.darkGreyColor}
        />
      </Container>
      <Img>
        <Image
          resizeMode={"contain"}
          source={require("../../assets/logo.png")}
          style={{ width: constants.width / 3 }}
        />
      </Img>
    </View>
  );
};
