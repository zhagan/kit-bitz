import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PartSearch from "./pages/PartSearch";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={PartSearch} />
        <Route exact path="/parts" component={PartSearch} />
        <Route exact path="/parts/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
