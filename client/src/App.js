import React from "react";
import { Layout } from "antd";
import ProductDetails from "./ProductDetails";
import { BrowserRouter, Switch, Route } from "react-router-dom";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={`/products/:identifier`}>
        <ProductDetails />
      </Route>
    </Switch>
  </BrowserRouter>
);
export default App;
