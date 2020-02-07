import React from "react";
import useInput from "../../hook/useInput";
import HomeScreen from "../../components/HomeScreen";
import { ScrollView } from "react-native";
import SearchBar from "../../components/SearchBar";

export default ({ navigation }) => {
  const searchInput = useInput("");
  const handleSearch = async () => {
    const { value } = searchInput;
    if (value !== "") {
      navigation.navigate("BookDisplay", { term: value });
    }
  };
  return (
    <>
      <SearchBar
        {...searchInput}
        placeholder="도서 검색"
        onSubmitEditing={handleSearch}
      />
      <ScrollView>
        <HomeScreen />
      </ScrollView>
    </>
  );
};
