import React, { Component } from "react";
import QuestionForm from "./QuestionForm.js";
import AppHeader from "./AppHeader";
import QuestionsList from "./QuestionsList";
import { Redirect } from "react-router-dom";
import SearchForm from "./SearchForm";
import SearchList from "./SearchList";

let questions = [];
let loggedUser = {};

let styles = {
  wrapperStyle: {
    padding: "10px",
    border: "1px solid rgb(23, 162, 184)"
  },
  questionFormStyle: {
    width: "70%",
    display: "inline-block",
    marginLeft: "40px",
    inputStyle: {
      width: "90%",
      marginBottom: "20px"
    },
    addQuestionBtnStyle: {
      marginTop: "-3px"
    }
  },
  questionItemStyle: {
    self: {
      marginBottom: "20px"
    },
    headerWrapperStyle: {
      backgroundColor: "lightgrey",
      width: "93%",
      padding: "5px",
      paddingTop: "10px",
      marginBottom: "10px",
      marginTop: "20px",
      minHeight: "50px"
    },
    headerButtonStyle: {
      float: "right",
      marginTop: "-33px"
    },
    headerStyle: {
      display: "inline-block"
    }
  },
  searchFormStyle: {
    width: "20%",
    display: "inline-block"
  },
  commentFormStyle: {
    commentFormInputStyle: {
      width: "66%",
      marginTop: "20px"
    },
    commentFormAddButtonStyle: {
      marginTop: "-3px"
    }
  },
  ulStyle: {
    listStyleType: "none"
  },
  appHeaderStyle: {
    wrapper: {
      textAlign: "center",
      marginBottom: "20px"
    },
    header: {
      display: "inline-block"
    },
    imageChat: {
      width: "8%",
      marginLeft: "15px"
    }
  }
};

class Forum extends Component {
  constructor(props) {
    super(props);
    this.addQuestion = this.addQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);
    this.addComment = this.addComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.search = this.search.bind(this);
    this.checkIfThereAreRightsForOperation = this.checkIfThereAreRightsForOperation.bind(
      this
    );
    loggedUser = this.props.location.state
      ? this.props.location.state.loggedUser
      : {};
    questions = this.props.location.state
      ? [...this.props.location.state.questionsList]
      : this.props.questionsList;
    this.state = {
      questions: questions,
      redirectToLogin: false,
      filteredQuestions: [],
      show: true
    };
  }

  checkIfThereAreRightsForOperation(operation, questionCommentObject) {
    if (operation === "D") {
      if (!loggedUser.username || loggedUser.role !== "admin") {
        alert(
          "Only users with admin rights can remove " +
            questionCommentObject +
            "."
        );
        return false;
      }
    } else if (operation === "A") {
      if (!loggedUser.username) {
        alert(
          "In order to add questions or comments, you need to be logged into your account."
        );
        return false;
      }
    }
    return true;
  }

  addQuestion(question) {
    if (!this.checkIfThereAreRightsForOperation("A")) {
      let redirectToLogin = true;
      this.setState({ redirectToLogin });
      return;
    }

    questions.unshift({
      index: questions.length + 1,
      value: question.newItemValue,
      comments: []
    });
    console.log(questions);
    this.setState({ questions: questions });
  }

  removeQuestion(questionIndex) {
    if (!this.checkIfThereAreRightsForOperation("D", "questions")) {
      return;
    }
    questions.splice(questionIndex, 1);
    this.setState({ questions: questions });
  }

  addComment(questionIndex, comment) {
    if (!this.checkIfThereAreRightsForOperation("A")) {
      let redirectToLogin = true;
      this.setState({ redirectToLogin });
      return;
    }
    let question = this.state.questions[questions.length - questionIndex];
    let comments = question.comments;
    comments.unshift({
      index: comments.length + 1,
      value: comment.newItemValue
    });
    question.comments = comments;
    this.setState({ questions: questions });
  }

  removeComment(questionIndex, commentIndex) {
    if (!this.checkIfThereAreRightsForOperation("D", "comments")) {
      return;
    }
    let question = this.state.questions[questions.length - questionIndex];
    let comments = question.comments;
    comments.splice(commentIndex, 1);
    questions.splice(questions.length - questionIndex, 1, question);
    this.setState({ questions: questions });
  }

  search(event) {
    console.log(event.target.value);
    if (event.target.value !== "") {
      let updatedQuestions = this.state.questions;
      updatedQuestions = updatedQuestions.filter(function(question) {
        return (
          question.value
            .toLowerCase()
            .search(event.target.value.toLowerCase()) !== -1
        );
      });
      console.log(updatedQuestions);
      this.setState({ show: false });
      this.setState({ filteredQuestions: updatedQuestions });
    } else {
      this.setState({ show: true });
      this.setState({ filteredQuestions: [] });
    }
  }

  renderRedirectLogin() {
    if (this.state.redirectToLogin === true) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div style={styles.wrapperStyle}>
          <AppHeader style={styles.appHeaderStyle} />
          <QuestionForm
            addQuestion={this.addQuestion}
            style={styles.questionFormStyle}
          />
          <SearchForm
            style={styles.searchFormStyle}
            search={this.search.bind(this)}
          />
          {this.state.filteredQuestions.length > 0 ? (
            <SearchList
              style={styles}
              filteredQuestions={this.state.filteredQuestions}
            />
          ) : this.state.show ? (
            <QuestionsList
              questions={this.state.questions}
              removeQuestion={this.removeQuestion}
              removeComment={this.removeComment}
              addComment={this.addComment}
              search={this.search}
              style={styles}
            />
          ) : null}
        </div>
      );
    }
  }

  render() {
    return <div id="main">{this.renderRedirectLogin()}</div>;
  }
}

export default Forum;
