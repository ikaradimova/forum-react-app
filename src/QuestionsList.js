import React, { Component } from 'react';
import QuestionItem from './QuestionItem.js';

class QuestionsList extends Component {

    render () {
        let items = this.props.items.map((item, index) => {
            return (
                <QuestionItem key={index} item={item} index={index} removeQuestion={this.props.removeQuestion} />
            );
        });
        return (
            <ul> {items} </ul>
        );
    }
}

export default QuestionsList;