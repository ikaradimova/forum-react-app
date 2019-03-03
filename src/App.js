import React, {Component} from 'react';
import QuestionForm from './QuestionForm.js';
import AppHeader from "./AppHeader";
import QuestionsList from "./QuestionsList";

let questions = [];
// questions.push({
//     index: 1,
//     value: 'Do aliens really exist?',
//     comments: [
//         {
//             index: 1,
//             value: 'Yes'
//         },
//         {
//             index: 2,
//             value: 'No'
//         }
//     ]
// });
// questions.push({
//     index: 2,
//     value: '4 + 2 = ?',
//     comments: [
//         {
//             index: 1,
//             value: 6
//         }
//     ]
// });

class App extends Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.addComment = this.addComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.state = {questions: questions};
    }

    addQuestion(question) {
        questions.unshift({
            index: questions.length + 1,
            value: question.newItemValue,
            comments: []
        });
        console.log(questions);
        this.setState({questions: questions});
    }

    removeQuestion(questionIndex) {
        questions.splice(questionIndex, 1);
        this.setState({questions: questions});
    }

    addComment(questionIndex, comment) {
        let question = this.state.questions[questions.length - questionIndex];
        let comments = question.comments;
        comments.unshift({
            index: comments.length + 1,
            value: comment.newItemValue,
        });
        question.comments = comments;
        this.setState({questions: questions});
    }

    removeComment(questionIndex, commentIndex) {
        let question = this.state.questions[questions.length - questionIndex];
        let comments = question.comments;
        comments.splice(commentIndex, 1);
        questions.splice(questions.length - questionIndex, 1, question);
        this.setState({questions: questions});
    }

    render() {
        return (
            <div id="main">
                <AppHeader/>
                <QuestionForm addQuestion={this.addQuestion}/>
                <QuestionsList
                    questions={this.state.questions}
                    removeQuestion={this.removeQuestion}
                    removeComment={this.removeComment}
                    addComment={this.addComment}
                />
            </div>
        );
    }
}

export default App;
