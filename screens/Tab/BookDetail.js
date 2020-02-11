import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "../../gql/queries";
import { Text, ScrollView, Linking } from "react-native";
import Loader from "../../components/Loader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../styles";
import constants from "../../constants";

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Img = styled.View`
  align-items: center;
`;
const Image = styled.Image`
  width: 130px;
  height: 180px;
  border-radius: 15px;
`;
const Link = styled.View`
  flex-direction: row;
  background-color: #00c73c;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;
`;
const Info = styled.View`
  margin: 20px;
`;
const Descript = styled.View`
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${styles.lightGreyColor};
`;
const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 17px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const TextRow = styled.View`
  flex-direction: row;
  max-width: ${constants.width / 1.3}px;
`;
const Kind = styled.Text`
  width: 50px;
  opacity: 0.7;
`;
const Upload = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: auto;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(SEARCH, {
    variables: { term: navigation.getParam("isbn") }
  });
  const detail = data?.books[0];
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        detail && (
          <Container>
            <Upload
              onPress={() =>
                navigation.navigate("Upload", {
                  bookId: detail.isbn
                    .replace(/<b>/gi, "")
                    .replace(/<\/b>/gi, "")
                })
              }
            >
              <Text>글쓰러 가기 </Text>
              <MaterialCommunityIcons name="arrow-right" size={20} />
            </Upload>
            <Info>
              <Img>
                <Image
                  style={{ position: "absolute" }}
                  source={require("../../assets/noImage.png")}
                />
                {detail.image !== "" && (
                  <Image source={{ uri: detail.image }} />
                )}
                {detail.image === "" && (
                  <Image source={require("../../assets/noImage.png")} />
                )}
              </Img>
              <Title>{detail.title.replace(/&quot;/gi, '"')}</Title>
              <TextRow>
                <Kind>출판사</Kind>
                <Text>{detail.publisher}</Text>
              </TextRow>
              <TextRow>
                <Kind>저자</Kind>
                <Text>{detail.author}</Text>
              </TextRow>
              <TextRow>
                <Kind>정가</Kind>
                <Text>{detail.price}</Text>
              </TextRow>
              <TextRow>
                <Kind>할인가</Kind>
                <Text>{detail.discount}</Text>
              </TextRow>
              <Descript>
                <Text>
                  {detail.description
                    .replace(/&quot;/gi, '"')
                    .replace(/&#x0D;/gi, "\n")}
                </Text>
              </Descript>
              <Link>
                <MaterialCommunityIcons
                  name={"alpha-n-box"}
                  color={"white"}
                  size={30}
                />
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
                  onPress={() => Linking.openURL(detail.link)}
                >
                  네이버 책으로 이동
                </Text>
              </Link>
            </Info>
          </Container>
        )
      )}
    </ScrollView>
  );
};
