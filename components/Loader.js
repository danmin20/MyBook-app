import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components";
import styles from "../styles";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default () => (
  <Container>
    <ActivityIndicator style={{ marginTop: 20 }} color={styles.brownColor} />
  </Container>
);
