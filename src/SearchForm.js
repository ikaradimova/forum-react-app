import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div style={this.props.style}>
        <form ref="form">
          <input
            type="text"
            ref="search"
            onChange={this.props.search}
            placeholder="Search..."
          />
        </form>
      </div>
    );
  }
}

export default Search;
