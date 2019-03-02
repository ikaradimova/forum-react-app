import React, {Component} from 'react';
import QuestionForm from './QuestionForm.js';
import AppHeader from "./AppHeader";
import QuestionsList from "./QuestionsList";

let questions = [];
questions.push({index: 1, value: 'Do aliens really exist?'});
questions.push({index: 2, value: '4 + 2 = ?'});

class App extends Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.state = {questions: questions};
    }

    addQuestion(question) {
        questions.unshift({
            index: questions.length + 1,
            value: question.newItemValue,
            done: false
        });
        this.setState({questions: questions});
    }

    removeQuestion(questionIndex) {
        questions.splice(questionIndex, 1);
        this.setState({questions: questions});
    }


    render() {
        return (
            <div id="main">
                <AppHeader/>
                <QuestionForm addQuestion={this.addQuestion}/>
                <QuestionsList items={this.state.questions} removeQuestion={this.removeQuestion}/>
            </div>
        );
    }
}

export default App;
