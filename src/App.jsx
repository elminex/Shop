import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import './App.scss';
import MainLayout from './Pages/MainLayout/MainLayout';
import MainPage from './Pages/MainPage/ConnectedMainPage';
import Product from './Pages/Product/ConnectedProduct';
import Cart from './Pages/Cart/ConnectedCart';
import Faq from './Pages/Faq/Faq';
import Contact from './Pages/Contact/Contact';
import Terms from './Pages/Terms/Terms';
import AddToCart from './components/AddToCart/ConnectedAddToCart';
import Checkout from './Pages/Checkout/ConnectedCheckout';
import Shop from './Pages/Shop/ConnectedShop';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import SearchPage from './Pages/SearchPage/ConnectedSearchPage';

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
      <Route exact path="/cart/checkout" component={Checkout} />
      <Route exact path="/search" component={SearchPage} />
      <Route component={PageNotFound} />
    </Switch>
  </MainLayout>
);

export default hot(module)(App);
