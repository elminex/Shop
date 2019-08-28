import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.scss';
import MainLayout from './components/Pages/MainLayout/MainLayout';
import MainPage from './components/Pages/MainPage/ConnectedMainPage';
import Product from './components/Pages/Product/ConnectedProduct';
import Cart from './components/Pages/Cart/ConnectedCart';
import Faq from './components/Pages/Faq/Faq';
import Contact from './components/Pages/Contact/Contact';
import Terms from './components/Pages/Terms/Terms';
import AddToCart from './components/AddToCart/ConnectedAddToCart';
import CartConfirm from './components/Pages/CartConfirm/ConnectedCartConfirm';
import Shop from './components/Pages/Shop/Shop';

const App = () => (
  <MainLayout>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/product/:id" component={Product} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/cart/add/:id" component={AddToCart} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/faq" component={Faq} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/terms" component={Terms} />
      <Route exact path="/cart/confirm" component={CartConfirm} />
    </Switch>
  </MainLayout>
);

export default hot(module)(App);
