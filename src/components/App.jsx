import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Join from './Join';
import Signon from './Signon';
import Chat from './Chat';
import MainNav from './MainNav';
import About from './About';

class App extends Component {
  render() {
    return (
      <div>
        <MainNav />
        <div className="router">
          <Switch>
            <Route exact path="/" component={Signon} />
            <Route exact path="/join/:name" component={Join} />
            <Route exact path="/chat/:name/:room" component={Chat} />
            <Route exact path="/team" component={About} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
