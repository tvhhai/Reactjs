import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show_technologies: false };
    this.see_our_technologies = this.see_our_technologies.bind(this);
  }
  see_our_technologies() {
    this.setState({ show_technologies: true });
  }
  render() {
    console.log(this.state);
    const style = {
      padding: "10px",
      border: "1px solid green",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%",
      color: "#4db1e8",
      textAlign: "center",
      fontFamily: "sans-serif",
    };
    const tech = {
      background: "#4db1e8",
      color: "#fff",
      padding: "5px",
      marginRight: "5px",
    };
    return (
      <div style={style}>
        <img src={this.props.img_url} height="250px" />
        <h1>{this.props.title}</h1>
        {this.state.show_technologies ? (
          <p>
            <span style={tech}>Python</span>
            <span style={tech}>Django</span>
            <span style={tech}>Django REST</span>
            <span style={tech}>ReactJS</span>
            <span style={tech}>Angular</span>
            <span style={tech}> and More</span>
          </p>
        ) : (
          <button onClick={this.see_our_technologies}>
            Click to see Our Technologies
          </button>
        )}
      </div>
    );
  }
}

export default Profile;
