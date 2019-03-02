import React, { Component } from 'react';

class QuestionForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.itemName.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        let newItemValue = this.refs.itemName.value;

        if(newItemValue) {
            this.props.addQuestion({newItemValue});
            this.refs.form.reset();
        }
        console.log(newItemValue);
    }
    render () {
        return (
            <form ref="form" onSubmit={this.onSubmit}>
                <input type="text" ref="itemName" placeholder="Ask a question..."/>
                <button type="submit">Ask</button>
            </form>
        );
    }
}

export default QuestionForm;
