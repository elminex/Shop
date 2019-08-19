import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.scss';
import MainLayout from './components/Pages/MainLayout/MainLayout';
import MainPage from './components/Pages/MainPage/MainPage';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';
import Faq from './components/Faq/Faq';
import Contact from './components/Contact/Contact';
import Terms from './components/Terms/Terms';

const App = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/terms" component={Terms} />
      </Switch>
    </MainLayout>
  </BrowserRouter>
);

export default hot(module)(App);
