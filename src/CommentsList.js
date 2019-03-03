import React, {Component} from 'react';
import CommentItem from './CommentItem.js';

class CommentsList extends Component {

    render() {
        if (this.props.comments !== undefined) {
            let comments = this.props.comments.map((comment, index) => {
                return (
                    <CommentItem
                        key={index}
                        comment={comment}
                        index={index}
                        questionIndex={this.props.questionIndex}
                        removeComment={this.props.removeComment}
                    />
                );
            });
            return (
                <ul> {comments} </ul>
            );
        } else {
            return null;
        }
    }
}

export default CommentsList;