import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styled, { withTheme } from "styled-components";
import { TextInput } from "react-native-gesture-handler";
import constants from "../constants";
import styles from "../styles";
import { Text } from "react-native";

const Search = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const Input = styled.View`
`;

const SearchBar = ({ onChange, value, onSubmit }) => (
  <Search>
    <MaterialCommunityIcons
      name={"book-open-variant"}
      color={"white"}
      size={30}
    />
    <Input>
      <TextInput
        style={{
          width: constants.width - 40,
          padding: 1,
          paddingLeft: 15,
          fontSize: 15,
          backgroundColor: "white",
          borderRadius: 5
        }}
        returnKeyType="search"
        onChangeText={onChange}
        onEndEditing={onSubmit}
        value={value}
        placeholder={"검색"}
        placeholderTextColor={styles.darkGreyColor}
      />
    </Input>
  </Search>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
