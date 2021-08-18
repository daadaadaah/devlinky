import React, { Suspense } from 'react';

import { Switch, Route } from 'react-router-dom';

import GlobalStyle from './styles/GlobalStyle';

import Header from './Header';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Switch>
        {/* TODO : fallback 디자이너와 상의해서 디자인 수정 필요 */}
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/" component={MainPage} />
        </Suspense>
      </Switch>
    </>
  );
}
