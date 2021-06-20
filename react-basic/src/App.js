// import logo from './logo.svg';
import './App.css';
import Clothes from "./components/Props";
import State from "./components/State";
import counter from "./components/Redux";
import Profile from "./components/State/state1";

import { createStore } from 'redux'
// Step 1: Define a reducer
// A pure js function
// that transform the old state to the new one
// based on the action.type


function App() {
  return (
    <>
      <div className="App">
        {/* examples props
        <Clothes name="Quần jean" type="Skinny" color ="Đen" size = "L">Clothes 1</Clothes>
        <Clothes name="Váy" type="váy công chúa" color ="Trắng" size = "M">Clothes 2</Clothes> */}

        {/* examples State */}
        <State name="abc"></State>
        <Profile name="abc"></Profile>
        <counter name="abc"></counter>

      </div>
    </>
  );
}


export default App;
