import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect, Link } from "react-router-dom";

let validations = {
  wrongCredentials: false
};

const styleValidation = {
  marginTop: "-20px",
  float: "right"
};

const imgStyle = {
  marginTop: "50px",
  marginLeft: "20px"
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    validations: {
      wrongCredentials: validations.wrongCredentials
    },
    loggedUser: {},
    redirectToForum: false
  };

  handleUsernameChange() {
    //if (this.refs.username.value) {
    //this.refs.username.value = this.refs.username.value;
    // }
  }

  handleLoginLogic() {
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let user = {};

    if (username && password) {
      user = this.props.usersList.find(
        currentUser =>
          currentUser.username === username && currentUser.password === password
      );
      if (!user) {
        if (this.props.location.state) {
          user = this.props.location.state.usersList.find(
            currentUser =>
              currentUser.username === username &&
              currentUser.password === password
          );
        }
      }

      if (user) {
        let redirectToForum = true;
        this.setState({ redirectToForum });

        let loggedUser = user;
        this.setState({ loggedUser });
      } else {
        validations.wrongCredentials = true;
        this.setState({ validations });
      }
    }
  }

  checkCredentials() {
    if (this.state.validations.wrongCredentials) {
      return (
        <p style={styleValidation} className="text-danger">
          Invalid username or password
        </p>
      );
    }
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleLoginLogic();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.handleLoginLogic();
  }

  setRenderTemplate() {
    if (!this.state.redirectToForum) {
      if (this.props.location.state) {
      }
      let setUsername = this.props.location.state
        ? this.props.location.state.registeredUser.username
        : "";
      return (
        <div className="row">
          {/* <!-- Default form login --> */}
          <div className="col-md-6">
            <form
              className="text-center border border-light p-5"
              onSubmit={this.onSubmit}
            >
              <p className="h4 mb-4">Sign in</p>

              {/* Username */}
              <input
                type="text"
                id="username"
                className="form-control mb-4"
                placeholder="username"
                ref="username"
                defaultValue={setUsername}
                onChange={this.handleUsernameChange}
              />

              {/* Password */}
              <input
                type="password"
                id="defaultLoginFormPassword"
                className="form-control mb-4"
                placeholder="Password"
                ref="password"
              />
              {this.checkCredentials()}
              {/* Sign in button */}
              <button
                className="btn btn-info btn-block my-4"
                type="submit"
                onKeyPress={this.handleKeyPress}
              >
                Sign in
              </button>

              {/*  Register  */}
              <p>
                Not a member?
                <Link
                  to={{
                    pathname: "/register",
                    state: {
                      usersList: this.props.usersList,
                      questionsList: this.props.questionsList
                    }
                  }}
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
          <div className="col-md-3" style={imgStyle}>
            <img src={require("./images/forum.jpg")} alt="forum" />
          </div>
        </div>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/forum",
            state: {
              loggedUser: this.state.loggedUser,
              questionsList: this.props.questionsList
            }
          }}
        />
      );
    }
  }

  render() {
    console.log(this.props.questionsList);
    console.log(this.props.usersList);
    if (this.props.location.state) {
      console.log(this.props.location.state.usersList);
    }

    return <div>{this.setRenderTemplate()}</div>;
  }
}
export default Login;
