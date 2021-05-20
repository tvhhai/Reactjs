import React, { Component } from "react";

class ExampleClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name:"test",
            age:12
        };
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1, name:'cbv' })
    }

    render() {
        return (
            <div>
                <pre>Class Components</pre>
                <p>You click {this.state.count} times</p>
                <button onClick={this.handleClick}>Click me</button>
                <p>{JSON.stringify(this.state)}</p>
            </div>
        )
    }
}


export default ExampleClass;
