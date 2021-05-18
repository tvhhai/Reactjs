import React from "react";

function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }

    tick() {
        this.setState({
          date: new Date()
        });
    }

    componentWillMount() {
        console.log("componentWillMount da chay")
      }

    componentDidMount() {
        console.log("componentDidMount da chay")
        this.timerID = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
        console.log("componentWillUnmount da duoc chay");
        clearInterval(this.timerID);
    }

    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <h2>It is {this.props.name}.</h2>

          <FormattedDate date={this.state.date} />
        </div>
      );
    }
  }

export default Clock;
