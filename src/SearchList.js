import React, {Component} from 'react';
import QuestionItem from "./QuestionItem";

class SearchList extends Component {

    render() {
        if (this.props.filteredQuestions !== undefined) {
            let filteredQuestions = this.props.filteredQuestions.map((question, index) => {
                return (
                    <QuestionItem
                        key={index}
                        question={question}
                        index={index}
                        questionIndex={this.props.filteredQuestions}
                        removeComment={this.props.removeComment}
                    />
                );
            });
            return (
                <ul> {filteredQuestions} </ul>
            );
        } else {
            return null;
        }
    }
}

export default SearchList;