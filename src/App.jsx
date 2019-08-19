import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.scss';
import MainLayout from './components/MainLayout/MainLayout';
import MainPage from './components/MainPage/MainPage';
import Product from './components/Product/Product';

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default hot(module)(App);
