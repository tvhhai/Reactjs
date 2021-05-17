// import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import ColorBox from "./components/ColorBox";
import Countdown from "./components/Countdown";
import Toggle from "./components/Toggle";
import LoginControl from "./components/LoginControl";
import NameForm from "./components/NameForm";
import Parent from "./components/ChildAndParent";

function ListItem(props) {
  // Đúng! Ở đây không cần cụ thể key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
const numbers = [1, 2, 3, 4, 5];

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
        {/* <div>
          <ColorBox color="deeppink" />
          <ColorBox color="green" />
        </div>

        <Countdown seconds={30} />
        <Toggle/>
        <p></p>
        <Button variant="contained" color="primary" onClick={() => { }}>
          Hello World
        </Button>

        <LoginControl></LoginControl>


        <NumberList numbers={numbers} /> */}
          <NameForm />,
          <Parent></Parent>

      </div>
    </>
  );
}
export default App;
