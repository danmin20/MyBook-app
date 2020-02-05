import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthInput from "../../components/AuthInput";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: white;
`;

const Button = styled.View`
  margin-top: 30px;
`;

export default ({ navigation }) => {
  const nameInput = useInput("");
  const emailInput = useInput(navigation.getParam("email", ""));
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      name: nameInput.value,
      email: emailInput.value
    }
  });
  const handleSignup = async () => {
    const { value: name } = nameInput;
    const { value: email } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("이메일 형식이 올바르지 않습니다");
    }
    if (name === "") {
      return Alert.alert("이름을 작성해 주세요");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();
      if (createAccount) {
        Alert.alert("회원가입 완료", "로그인하세요!");
        navigation.navigate("Login", { email });
      }
    } catch (e) {
      Alert.alert("이미 존재하는 계정입니다");
      navigation.navigate("Login", { email });
    } finally {
      setLoading(false);
    }
  };
  //네이버로 로그인

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...nameInput}
          placeholder="이름"
          onSubmitEditing={handleSignup}
          autoCapitalize="words"
        />
        <AuthInput
          {...emailInput}
          placeholder="이메일"
          onSubmitEditing={handleSignup}
          autoCorrect={false}
        />
        <Button>
        <AuthButton loading={loading} onPress={handleSignup} text="회원가입" />
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};
