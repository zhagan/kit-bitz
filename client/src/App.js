import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';

import { withUser, update } from './services/withUser';

import Login from "./pages/Login";
import PartSearch from "./pages/PartSearch";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import CreateKit from "./pages/CreateKit";


class App extends Component {
  componentDidMount() {
    // this is going to double check that the user is still actually logged in
    // if the app is reloaded. it's possible that we still have a user in sessionStorage
    // but the user's session cookie expired.
    axios.get('/api/auth')
      .then(res => {
        // if we get here, the user's session is still good. we'll update the user
        // to make sure we're using the most recent values just in case
        update(res.data);
      })
      .catch(err => {
        // if we get a 401 response, that means the user is no longer logged in
        if (err.response.status === 401) {
          update(null);
        }
      });
  }


  render() {
    const { user } = this.props;
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" render={() => (
                this.props.user ? (
                  <Redirect to="/parts"/>
                ) : (
                  <Redirect to="/login" />

                )
            )}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/parts" component={PartSearch} />
            <Route exact path="/parts/:id" component={Detail} />
            <Route exact path="/createkit" component={CreateKit} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default withUser(App);
