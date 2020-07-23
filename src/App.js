import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/burgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Checkout/Orders/Orders'
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/order" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />

      </Layout>
    </div>
  );
}

export default App;
