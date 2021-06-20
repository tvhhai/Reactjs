import "./App.css";
import Index from "./components/home";
import Manager from "./components/admin";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/home/header";
import Detail from "./components/detail";
import Footer from "./components/home/footer";

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
