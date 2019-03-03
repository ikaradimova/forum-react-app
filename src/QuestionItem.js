import React, { Component } from 'react';
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

    render () {
        return(
            <li>
                <div>
                    {this.props.question.value}
                    <button type="button" onClick={this.onClickClose}>&times;</button>
                    <CommentForm
                        addComment={this.props.addComment}
                        questionIndex={this.props.question.index}
                    />
                    <CommentsList
                        comments={this.props.question.comments}
                        questionIndex={this.props.question.index}
                        removeQuestion={this.removeQuestion}
                        removeComment={this.props.removeComment}
                    />
                </div>
            </li>
        );
    }
}

export default QuestionItem;