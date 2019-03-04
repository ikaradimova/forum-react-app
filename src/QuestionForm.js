import React, { Component } from "react";

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.refs.itemName.focus();
  }

  onSubmit(event) {
    event.preventDefault();
    let newItemValue = this.refs.itemName.value;

    if (newItemValue) {
      this.props.addQuestion({ newItemValue });
      this.refs.form.reset();
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      let newItemValue = this.refs.itemName.value;

      if (newItemValue) {
        this.props.addQuestion({ newItemValue });
        this.refs.form.reset();
      }
    }
  }

  render() {
    return (
      <div style={this.props.style}>
        <form ref="form" onSubmit={this.onSubmit}>
          <input
            style={this.props.style.inputStyle}
            type="text"
            ref="itemName"
            placeholder="Ask a question..."
          />
          <button
            type="submit"
            className="btn btn-info btn-sm"
            onKeyPress={this.handleKeyPress}
            style={this.props.style.addQuestionBtnStyle}
          >
            Ask
          </button>
        </form>
      </div>
    );
  }
}

export default QuestionForm;
