import React from "react";
import { MarkdownView } from "react-native-markdown-view";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import styles from "../styles";

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
  opacity: 0.5;
  margin-top: -40px;
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
        <Image source={{ uri: image }} />
        <Info>
          <Title>
            <MarkdownView>
              {title.replace(/<b>/gi, "").replace(/<\/b>/gi, "")}
            </MarkdownView>
          </Title>
          <SubInfo>
            <MarkdownView>
              {"\n"}**정가** {price}
              {"\n"}**저자** {author}
              {"\n"}**출판사** {publisher}
            </MarkdownView>
          </SubInfo>
        </Info>
      </Container>
    </TouchableOpacity>
  );
};

export default withNavigation(SquareBook);
