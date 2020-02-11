import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../../hook/useInput";
import HomeScreen from "../../components/HomeScreen";
import { ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";
import { EvilIcons } from "@expo/vector-icons";
import styles from "../../styles";

const Box = styled.View`
  flex-direction: row;
  background-color: ${styles.blackColor};
  align-items: center;
`;
const Search = styled.TouchableOpacity`
  justify-content: center;
  background-color: ${styles.blackColor};
  padding: 5px;
  padding-bottom: 10px;
  margin-bottom: auto;
`;

export default ({ navigation }) => {
  const [search, setSearch] = useState(false);
  const searchInput = useInput("");
  const toggleSearch = () => {
    setSearch(p => !p);
  };
  const handleSearch = async () => {
    const { value } = searchInput;
    if (value !== "") {
      navigation.navigate("BookDisplay", { term: value });
    }
  };
  return (
    <>
      <Box>
        <Search onPress={toggleSearch}>
          <EvilIcons name="search" size={20} color="white" />
        </Search>
        {search ? (
          <SearchBar
            {...searchInput}
            placeholder="도서 검색"
            onSubmitEditing={handleSearch}
          />
        ) : null}
      </Box>
      <ScrollView>
        <HomeScreen />
      </ScrollView>
    </>
  );
};
