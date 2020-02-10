import React from "react";
import PostPresenter from "./PostPresenter";
import Animated from "react-native-reanimated";
import { Keyboard } from "react-native";

class PostContainer extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      id: navigation.getParam("id")
    };
    this.keyboardHeight = new Animated.Value(0);
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  keyboardWillShow = e => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: e.duration,
        toValue: e.endCoordinates.height
      })
    ]).start();
  };
  keyboardWillHide = e => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: e.duration,
        toValue: 0
      })
    ]).start();
  };
  render() {
    const { id } = this.state;
    return (
      <Animated.View style={{ paddingBottom: this.keyboardHeight }}>
        <PostPresenter id={id} />
      </Animated.View>
    );
  }
}

export default PostContainer;
