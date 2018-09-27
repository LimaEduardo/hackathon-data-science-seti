import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from './routes';

class App extends Component {
  render() {
    const history = createBrowserHistory();

    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}

export default App;