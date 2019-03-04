import React, { Component } from "react";
import QuestionItem from "./QuestionItem.js";

class QuestionsList extends Component {
  render() {
    let items = this.props.questions.map((item, index) => {
      return (
        <QuestionItem
          key={index}
          question={item}
          index={index}
          removeQuestion={this.props.removeQuestion}
          removeComment={this.props.removeComment}
          addComment={this.props.addComment}
          style={this.props.style}
        />
      );
    });
    return <ul> {items} </ul>;
  }
}

export default QuestionsList;
