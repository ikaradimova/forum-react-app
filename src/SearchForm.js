import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <form ref="form">
                <input
                    autoFocus={true}
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