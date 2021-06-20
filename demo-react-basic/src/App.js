import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, NavLink, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import Login from "./components/Login/Login";
import ExampleClass from "./components/Hook/ExampleClass";
import ExampleComponents from "./components/Hook/ExampleComponents";

function App() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
    <>
      <div className="wrapper">
        <h1>Application</h1>
        <BrowserRouter>

          <NavLink exact to="/dashboard" className="nav-link" activeClassName="abc">
            dashboard
          </NavLink>

          <NavLink exact to="/preferences" className="nav-link" activeClassName="abc">
            preferences
          </NavLink>

          <Switch>

            <Route path="/dashboard">
              <Dashboard names="abcd" />
            </Route>


            <Route path="/preferences">
              <Preferences />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>

      {/* <ExampleClass></ExampleClass> */}
      <ExampleComponents></ExampleComponents>
    </>
  );
}

export default App;
