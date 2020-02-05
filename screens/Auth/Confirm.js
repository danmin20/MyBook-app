import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { useLogIn } from "../../AuthContext";
import { useMutation } from "react-apollo-hooks";
import { CONFIRM_SECRET } from "./AuthQueries";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Button = styled.View`
  margin-top: 10px;
`;

export default ({ navigation }) => {
  const confirmInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam("email")
    }
  });
  const handleConfirm = async () => {
    const { value } = confirmInput;
    if (value === "" || !value.includes(" ")) {
      Alert.alert("잘못된 시크릿 키");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret }
      } = await confirmSecretMutation();
      if (confirmSecret !== "" || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert("잘못된 시크릿 키");
      }
    } catch (e) {
      Alert.alert("오류 발생", "재시도 하십시오");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...confirmInput}
          placeholder="시크릿 키"
          returnKeyType="send"
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
        />
        <Button>
          <AuthButton loading={loading} onPress={handleConfirm} text="확인" />
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
