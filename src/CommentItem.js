import React, { Component } from 'react';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
    }

    onClickClose() {
        let index = parseInt(this.props.index);
        this.props.removeComment(this.props.questionIndex, index);
    }

    render () {
        return(
            <li>
                <div>
                    {this.props.comment.value}
                    <button type="button" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        );
    }
}

export default CommentItem;