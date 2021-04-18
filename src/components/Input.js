import React from "react";

class Input extends React.Component {
    state = {
        text: ""
    }

    onChange(i) {
        this.setState({text: i.target.value});
    }

    onSubmit(i) {
        i.preventDefault();
        this.setState({text: ""});
        this.props.onSendMessage(this.state.text);
    }

    render() {
        return (
            <div className="Input">
                <form onSubmit={i => this.onSubmit(i)}>
                    <input onChange={i => this.onChange(i)} value={this.state.text} type="text" placeholder="Upiši poruku i stisni Enter" autofocus="true" />
                    <button>Pošalji</button>
                </form>
            </div>
        );
    }

}

export default Input;