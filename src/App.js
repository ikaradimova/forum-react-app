import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Forum from "./forum";
import Login from "./Login";
import Register from "./Register";

class App extends Component {
  //hardcoded data
  state = {
    users: [
      { username: "admin", password: "password", role: "admin" },
      {
        username: "testUser",
        password: "password",
        role: "regular"
      }
    ],
    questions: [
      {
        index: 1,
        value: "Can my dog eat ice-cream?",
        comments: [
          { value: "No way, man! It can kill it!" },
          { value: "Try and let me know :D" }
        ]
      }
    ]
  };
  render() {
    let styleBrowserComponent = {
      width: "70%",
      margin: "auto"
    };
    return (
      <BrowserRouter>
        <div style={styleBrowserComponent}>
          <Route
            exact
            path="/"
            render={routeProps => (
              <Forum {...routeProps} questionsList={this.state.questions} />
            )}
          />
          <Route
            exact
            path="/login"
            render={routeProps => (
              <Login
                {...routeProps}
                usersList={this.state.users}
                questionsList={this.state.questions}
              />
            )}
          />
          <Route
            exact
            path="/forum"
            render={routeProps => (
              <Forum {...routeProps} loggedUser={this.state.loggedUser} />
            )}
          />
          <Route exact path="/register" component={Register} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
