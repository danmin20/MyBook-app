import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hook/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Button = styled.View`
  margin-top: 10px;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: emailInput.value }
  });
  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value === "") {
      return Alert.alert("이메일을 입력하세요");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("이메일 형식이 올바르지 않습니다");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("메일함을 확인해주세요");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("존재하지 않는 계정입니다", "회원가입을 해주세요");
        navigation.navigate("Signup", { email: value });
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
          {...emailInput}
          placeholder="이메일"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <Button>
          <AuthButton loading={loading} onPress={handleLogin} text="로그인" />
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
