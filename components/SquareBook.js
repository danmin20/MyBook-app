import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import styled from "styled-components";
import { TouchableOpacity, View } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  padding: 30px 15px;
  flex-direction: row;
  border: 0px solid ${styles.brownGrey};
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
const Title = styled.Text`
  padding-bottom: 10px;
  color: ${styles.blackColor};
  border: 0px solid ${styles.brownGrey};
  border-bottom-width: 1px;
  margin-bottom: 5px;
`;
const SubInfo = styled.View`
  flex-direction: row;
  max-width: ${constants.width / 1.6}px;
`;
const Kind = styled.Text`
  color: ${styles.brownColor};
  width: 50px;
`;
const Text = styled.Text`
  color: ${styles.blackColor};
  opacity: 0.8;
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
            {title
              .replace(/<b>/gi, "")
              .replace(/<\/b>/gi, "")
              .replace(/&#x0D;/gi, "\n")
              .replace(/&quot;/gi, '"')
              .replace(/&nbsp;/gi, " ")
              .replace(/&lt;/gi, "<")
              .replace(/&gt;/gi, ">")
              .replace(/&amp;/gi, "&")
              .replace(/&#035;/gi, "#")
              .replace(/#039;/gi, "'")}
          </Title>
          <SubInfo>
            <Kind>저자</Kind>
            <Text>{author}</Text>
          </SubInfo>
          <SubInfo>
            <Kind>정가</Kind>
            <Text>{price}</Text>
          </SubInfo>
          <SubInfo>
            <Kind>출판사</Kind>
            <Text>{publisher}</Text>
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
