import "./App.css";
import Index from "./components/Home";
import Manager from "./components/Admin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Home/header";
import Detail from "./components/Detail";
import Footer from "./components/Home/footer";

function App() {
  return (
    <BrowserRouter>

      <Header />
      
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/admin" exact component={Manager} />
        <Route path="/detail/:id" exact component={Detail} />
      </Switch>

      <Footer />
      
    </BrowserRouter>
  );
}

export default App;
