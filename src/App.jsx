import React from 'react';

import { Switch, Route } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';

import Header from './Header';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  );
}
