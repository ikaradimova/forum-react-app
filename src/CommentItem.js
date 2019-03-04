import React, { Component } from "react";

class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
  }

  onClickClose() {
    let index = parseInt(this.props.index);
    this.props.removeComment(this.props.questionIndex, index);
  }

  render() {
    return (
      <li style={this.props.style}>
        <div>
          {this.props.comment.value}
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.onClickClose}
            style={this.props.style.btnDel}
          >
            &times;
          </button>
        </div>
      </li>
    );
  }
}

export default CommentItem;
