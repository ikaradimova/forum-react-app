import React, { Component } from "react";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addComment(this.props.questionIndex, { newItemValue });
      // this.state.addQuestion({newItemValue});
      this.refs.form.reset();
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      let newItemValue = this.refs.itemName.value;
      if (newItemValue) {
        this.props.addComment(this.props.questionIndex, { newItemValue });
        this.refs.form.reset();
      }
    }
  }
  render() {
    return (
      <form ref="form" onSubmit={this.onSubmit}>
        <input
          style={this.props.style.commentFormInputStyle}
          type="text"
          ref="itemName"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          className="btn btn-info btn-sm"
          onKeyPress={this.handleKeyPress}
          style={this.props.style.commentFormAddButtonStyle}
        >
          Add
        </button>
      </form>
    );
  }
}

export default CommentForm;
