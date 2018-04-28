import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import { withUser, update } from './services/withUser';

import Login from './pages/Login';
import PartSearch from './pages/PartSearch';
import Inventory from './pages/Inventory';
import Detail from './pages/Detail';
import KitDetail from './pages/KitDetail';
import UserInfo from './pages/UserInfo';
import Kits from './pages/Kits';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import CreateKit from './pages/CreateKit';
import Home from './pages/Home';
import './App.css';

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
        <div id="sketch-holder">
          <Nav user={user}/>

          <div className="container-fluid" >
            <Switch>
              <Route exact path="/" render={() => (
                this.props.user ? (
                  <Redirect to="/parts"/>
                ) : (
                  <Redirect to="/login" />

                )
              )}/>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/parts" render={(props) => <PartSearch user={user} {...props}/>} />
              <Route exact path="/parts/:id" component={Detail} />
              <Route exact path="/createkit" component={CreateKit} />
              <Route exact path="/createkit/:id" render={(props) => <KitDetail user={user} {...props}/>} />
              <Route exact path="/inventory" component={Inventory} />
              <Route exact path="/kits" render={(props) => <Kits user={user} {...props}/>} />
              <Route exact path="/userinfo" component={UserInfo} />
              <Route component={NoMatch} />
            </Switch>
          </div>

        </div>
      </Router>
    );
  }
}
export default withUser(App);
