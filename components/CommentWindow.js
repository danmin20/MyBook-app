import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const TextInput = styled.TextInput`
  width: ${constants.width / 1.3}px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 10px;
`;

const CommentWindow = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  multiline = true,
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true
}) => (
  <TextInput
    onChangeText={onChange}
    keyboardType={keyboardType}
    placeholder={placeholder}
    autoCapitalize={autoCapitalize}
    value={value}
    returnKeyType={returnKeyType}
    onSubmitEditing={onSubmitEditing}
    autoCorrect={autoCorrect}
    multiline={multiline}
  />
);

CommentWindow.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad"
  ]),
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
  onChange: PropTypes.func.isRequired,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
  onSubmitEditing: PropTypes.func,
  autoCorrect: PropTypes.bool,
  multiline: PropTypes.bool
};

export default CommentWindow;
