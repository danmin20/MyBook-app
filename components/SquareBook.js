import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import styled from "styled-components";
import { TouchableOpacity, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import PropTypes from "prop-types";

const Container = styled.View`
  padding: 30px 15px;
  flex-direction: row;
  border: 0px solid ${styles.moderateGreyColor};
  border-bottom-width: 1px;
`;
const Image = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 5px;
`;
const Info = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 20px;
`;
const Title = styled.View`
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 1px;
  margin-bottom: 5px;
`;
const SubInfo = styled.View`
  flex-direction: row;
`;
const TextColumn = styled.View`
  margin-right: 10px;
`;
const Kind = styled.Text`
  opacity: 0.7;
`;

const SquareBook = ({
  navigation,
  isbn,
  title,
  image,
  author,
  price,
  publisher
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("BookDetail", { isbn })}
    >
      <Container>
        <View>
          <Image
            style={{ position: "absolute" }}
            source={require("../assets/noImage.png")}
          />
          {image !== "" && <Image source={{ uri: image }} />}
          {image === "" && <Image source={require("../assets/noImage.png")} />}
        </View>
        <Info>
          <Title>
            <MarkdownView>
              {title
                .replace(/<b>/gi, "")
                .replace(/<\/b>/gi, "")
                .replace(/&quot;/gi, '"')}
            </MarkdownView>
          </Title>
          <SubInfo>
            <TextColumn>
              <Kind>저자</Kind>
              <Kind>정가</Kind>
              <Kind>출판사</Kind>
            </TextColumn>
            <TextColumn>
              <Text>{author}</Text>
              <Text>{price}</Text>
              <Text>{publisher}</Text>
            </TextColumn>
          </SubInfo>
        </Info>
      </Container>
    </TouchableOpacity>
  );
};

SquareBook.propTypes = {
  isbn: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  author: PropTypes.string.isRequired,
  price: PropTypes.string,
  publisher: PropTypes.string.isRequired
};

export default withNavigation(SquareBook);
