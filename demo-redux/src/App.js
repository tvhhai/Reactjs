import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';

 
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}


let store = createStore(counterReducer)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/decremented' })

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

      

    </>
  );
}

export default App;
