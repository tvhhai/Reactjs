// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Index from "./components/home";


function App() {
  return (
    <>
      {/* <div className="App">
        <header className="App-header">
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
        </header>
      </div> */}

      <BrowserRouter>
        {/* <Header /> */}
        <Switch>
          {/* <Route path="/" exact component={Index} /> */}
          {/* <Route path="/admin" exact component={Manager} />
          <Route path="/detail/:id" exact component={Detail} /> */}
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
