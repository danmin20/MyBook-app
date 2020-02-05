import React from "react";
import styled from "styled-components";
import { TouchableOpacity, Image } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";

const Container = styled.View`
  width: ${constants.width}px;
  height: 80px;
  flex-direction: row;
  padding: 15px 20px;
`;
const Info = styled.View`
  justify-content: center;
  margin-left: 20px;
`;
const Text = styled.Text`
  font-weight: bold;
  opacity: 0.5;
`;

const SquareBook = ({
  navigation,
  isbn,
  title,
  link,
  image,
  author,
  price,
  discount,
  publisher,
  description
}) => (
  <TouchableOpacity>
    <Container>
      <Image source={{ uri: image }} style={{ width: 55, height: 55 }} />
    </Container>
    <Info>
      <Text>
        {title}
        {price}
        {author}
        {publisher}
      </Text>
    </Info>
  </TouchableOpacity>
);

export default withNavigation(SquareBook);
