import React, { Component } from "react";
import CommentItem from "./CommentItem.js";

class CommentsList extends Component {
  render() {
    if (this.props.comments !== undefined) {
      let comments = this.props.comments.map((comment, index) => {
        let commentBgStyle = {
          backgroundColor: index % 2 === 0 ? "white" : "lightgrey",
          width: "97.6%",
          marginLeft: "-40px",
          paddingLeft: "10px",
          paddingTop: "3px",
          paddingBottom: "3px",
          minHeight: "37px",
          border: "1px solid darkgrey",
          btnDel: {
            float: "right",
            marginRight: "5px"
          }
        };
        return (
          <CommentItem
            key={index}
            comment={comment}
            index={index}
            questionIndex={this.props.questionIndex}
            removeComment={this.props.removeComment}
            style={commentBgStyle}
          />
        );
      });
      return <ul style={this.props.style.ulStyle}> {comments} </ul>;
    } else {
      return null;
    }
  }
}

export default CommentsList;
