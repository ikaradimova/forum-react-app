import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect } from "react-router-dom";

let usersList = [];
let validations = {
  isUserExistent: false,
  isPasswordTheSame: true
};

const styleValidation = {
  marginTop: "-20px",
  float: "right"
};

const imgStyle = {
  marginTop: "50px",
  marginLeft: "20px"
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.handleConfirmPasswordBlur = this.handleConfirmPasswordBlur.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.setRenderTemplate = this.setRenderTemplate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRegisterLogic = this.handleRegisterLogic.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.checkIfRegisterLogicCanContinue = this.checkIfRegisterLogicCanContinue.bind(
      this
    );
  }

  state = {
    redirectToLogin: false,
    validations: {
      isUserExistent: validations.isUserExistent,
      isPasswordTheSame: validations.isPasswordTheSame
    }
  };

  validateUsername() {
    if (validations.isUserExistent) {
      return (
        <p style={styleValidation} className="text-danger">
          This username is already taken.
        </p>
      );
    }
  }

  validatePassword() {
    if (!validations.isPasswordTheSame) {
      return (
        <p style={styleValidation} className="text-danger">
          Password and Confirmed password are not the same.
        </p>
      );
    }
  }

  handleUsernameBlur() {
    usersList = [...this.props.location.state.usersList];
    if (this.refs.username.value) {
      let username = this.refs.username.value;
      let existentUser = usersList.find(user => user.username === username);
      if (existentUser) {
        validations.isUserExistent = true;
      } else {
        validations.isUserExistent = false;
      }
      this.setState({ validations });
    }
  }

  handleConfirmPasswordBlur() {
    if (this.refs.password.value && this.refs.confirmPassword.value) {
      if (this.refs.confirmPassword.value !== this.refs.password.value) {
        validations.isPasswordTheSame = false;
      } else {
        validations.isPasswordTheSame = true;
      }
      this.setState({ validations });
    }
  }

  checkIfRegisterLogicCanContinue() {
    if (validations.isUserExistent) {
      alert("Please choose another user name and try registering again");
      return false;
    } else if (!validations.isPasswordTheSame) {
      alert(
        "Please fill the same password in both fields in order to finish successfully your registration."
      );
      return false;
    } else {
      return true;
    }
  }

  handleRegisterLogic() {
    if (!this.checkIfRegisterLogicCanContinue()) {
      return;
    }
    let newUser = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      role: this.refs.username.value.indexOf("admin") > -1 ? "admin" : "regular"
    };
    usersList.push(newUser);
    alert("You were successfully registered with " + newUser.role + " role.");
    let redirectToLogin = true;
    this.setState({ redirectToLogin });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleRegisterLogic();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.handleRegisterLogic();
  }

  setRenderTemplate() {
    if (!this.state.redirectToLogin) {
      return (
        <div className="row">
          {/* <!-- Default form login --> */}
          <div className="col-md-6">
            <form
              className="text-center border border-light p-5"
              onSubmit={this.onSubmit}
            >
              <p className="h4 mb-4">Register</p>

              {/* <!-- Username --> */}
              <input
                type="text"
                id="username"
                className="form-control mb-4"
                placeholder="Your username"
                onBlur={this.handleUsernameBlur}
                ref="username"
              />
              {this.validateUsername()}
              {/* <!-- Password --> */}
              <input
                type="password"
                id="defaultLoginFormPassword"
                className="form-control mb-4"
                placeholder="Password"
                ref="password"
              />

              {/* confirm password */}
              <input
                type="password"
                id="confirmFormPassword"
                className="form-control mb-4"
                placeholder="Confirm password"
                onBlur={this.handleConfirmPasswordBlur}
                ref="confirmPassword"
              />
              {this.validatePassword()}

              {/* <!-- Sign in button --> */}
              <button
                className="btn btn-info btn-block my-4"
                type="submit"
                onKeyPress={this.handleKeyPress}
              >
                Register
              </button>
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
            pathname: "/login",
            state: {
              registeredUser: usersList[usersList.length - 1],
              questionsList: this.props.questionsList,
              usersList: usersList
            }
          }}
        />
      );
    }
  }

  render() {
    return <div>{this.setRenderTemplate()}</div>;
  }
}

export default Register;
