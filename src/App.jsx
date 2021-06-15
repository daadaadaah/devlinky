import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Header from './Header';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </>
  );
}
