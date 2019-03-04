import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <form ref="form">
        <input
          type="text"
          ref="search"
          onChange={this.props.search}
          placeholder="Search..."
        />
      </form>
    );
  }
}

export default Search;
