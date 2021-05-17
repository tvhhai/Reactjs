import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ColorBox from "./components/ColorBox";
import Countdown from "./components/Countdown";
import Toggle from "./components/Toggle";
import LoginControl from "./components/LoginControl";

function Box(props) {
  return (
    <div
      style={{
        backgroundColor: props.color,
      }}
    >
      aaaaaaaaaa
    </div>
  );
}

function activateLasers() {
  console.log("ádsdadsdasdsd");
}

function App() {
  return (
    <>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <div>
          <ColorBox color="deeppink" />
          <ColorBox color="green" />
        </div>

        <Countdown seconds={30} />
        {/* <Toggle/> */}

        <Button variant="contained" color="primary" onClick={() => { }}>
          Hello World
        </Button>

        <LoginControl></LoginControl>


      </div>

      <button>add</button>

      <button onClick={activateLasers}>Activate Lasers</button>

      <div>
        <p>abc</p>
      </div>
    </>
  );
}
export default App;
