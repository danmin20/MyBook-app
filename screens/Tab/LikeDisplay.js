import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, View, RefreshControl, Image } from "react-native";
import SquareUser from "../../components/SquareUser";
import { useQuery } from "react-apollo-hooks";
import { ME, POST_DETAIL } from "../../gql/queries";
import constants from "../../constants";

const Err = styled.View`
  margin-top: 40px;
  align-items: center;
`;
const Img = styled.View`
  margin-top: 150px;
  align-items: center;
  opacity: 0.5;
`;
const Text = styled.Text`
  font-size: 15px;
`;

export default ({ navigation }) => {
  const likes = navigation.getParam("likes");
  return (
    <ScrollView>
      {likes && (
        <View>
          {likes.map(like => (
            <SquareUser key={like.user.id} {...like.user} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
