import React, { Component } from "react";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

class QuestionItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeQuestion(index);
  }

  render() {
    return (
      <li /*style={this.props.style.self}*/>
        <div>
          <div style={this.props.style.questionItemStyle.headerWrapperStyle}>
            <h5 style={this.props.style.headerStyle}>
              {this.props.question.value}
            </h5>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              style={this.props.style.questionItemStyle.headerButtonStyle}
              onClick={this.onClickClose}
            >
              &times;
            </button>
          </div>

          <CommentsList
            comments={this.props.question.comments}
            questionIndex={this.props.question.index}
            removeQuestion={this.removeQuestion}
            removeComment={this.props.removeComment}
            style={this.props.style}
          />
          <CommentForm
            style={this.props.style.commentFormStyle}
            addComment={this.props.addComment}
            questionIndex={this.props.question.index}
          />
        </div>
      </li>
    );
  }
}

export default QuestionItem;
