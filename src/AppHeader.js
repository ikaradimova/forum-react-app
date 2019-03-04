import React, { Component } from "react";

class AppHeader extends Component {
  render() {
    return (
      <div style={this.props.style.wrapper}>
        <h1 style={this.props.style.header}>Forum app</h1>
        <img
          src={require("./images/chat.png")}
          alt="chat"
          style={this.props.style.imageChat}
        />
      </div>
    );
  }
}

export default AppHeader;
