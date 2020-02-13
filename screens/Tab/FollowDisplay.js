import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, View, RefreshControl, Image } from "react-native";
import SquareUser from "../../components/SquareUser";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../gql/queries";
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
  const [refreshing, setRefreshing] = useState(false);
  const follow = navigation.getParam("follow");
  const { refetch } = useQuery(ME);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      {follow[0] === undefined && (
        <View>
          <Err>
            <Text>{navigation.getParam("type")} 계정이 없습니다.</Text>
          </Err>
          <Img>
            <Image
              resizeMode={"contain"}
              source={require("../../assets/logo.png")}
              style={{ width: constants.width / 3 }}
            />
          </Img>
        </View>
      )}
      {follow && (
        <View>
          {follow.map(user => (
            <SquareUser key={user.id} {...user} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};
