import React, { Component } from 'react';

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
                    {this.props.item.value}
                    <button type="button" onClick={this.onClickClose}>&times;</button>
                </div>
            </li>
        );
    }
}

export default QuestionItem;