import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SyncMobile from "../pages/SyncMobile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sync/:rootId/:mobileId" component={SyncMobile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
