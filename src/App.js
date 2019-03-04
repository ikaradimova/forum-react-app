import React, {Component} from 'react';
import QuestionForm from './QuestionForm.js';
import AppHeader from "./AppHeader";
import QuestionsList from "./QuestionsList";
import SearchForm from "./SearchForm.js";
import SearchList from "./SearchList.js";

let questions = [];
questions.push({
    index: 2,
    value: 'Do aliens really exist?',
    comments: [
        {
            index: 1,
            value: 'Yes'
        },
        {
            index: 2,
            value: 'No'
        }
    ]
});
questions.push({
    index: 1,
    value: '4 + 2 = ?',
    comments: [
        {
            index: 1,
            value: 6
        }
    ]
});

class App extends Component {
    constructor(props) {
        super(props);
        this.addQuestion = this.addQuestion.bind(this);
        this.removeQuestion = this.removeQuestion.bind(this);
        this.addComment = this.addComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            questions: questions,
            filteredQuestions: [],
            show: true
        };
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

    search(event){
        console.log(event.target.value);
        if(event.target.value !== ''){
            let updatedQuestions = this.state.questions;
            updatedQuestions = updatedQuestions.filter(function(question){
                return question.value.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            console.log(updatedQuestions);
            this.setState({show: false});
            this.setState({filteredQuestions: updatedQuestions});
        } else {
            this.setState({show: true});
            this.setState({filteredQuestions: []});
        }
    }

    render() {
        return (
            <div id="main">
                <AppHeader/>
                <QuestionForm addQuestion={this.addQuestion}/>
                <SearchForm
                    search={this.search.bind(this)}
                />
                {(this.state.filteredQuestions.length > 0) ?
                    <SearchList filteredQuestions={this.state.filteredQuestions} /> :
                    (this.state.show) ?
                    <QuestionsList
                        questions={this.state.questions}
                        removeQuestion={this.removeQuestion}
                        removeComment={this.removeComment}
                        addComment={this.addComment}
                        search={this.search}
                    /> : null
                }
            </div>
        );
    }
}

export default App;
