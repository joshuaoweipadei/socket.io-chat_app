import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
import AlertState from './components/ContextAlert/AlertState';

import Login from './pages/Login';
import Chat from './pages/Chat'

import './App.css';

function App() {
  return (
    <AlertState>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Chat} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </AlertState>
  );
}

export default App;
