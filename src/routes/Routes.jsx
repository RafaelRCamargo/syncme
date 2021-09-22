import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SyncMobile from "../pages/SyncMobile";

import { Footer } from "../components/Footer";

import '../styles/Routes.css'
import { ThemeSelector } from "../components/ThemeSelector";

const Routes = () => {
  return (
    <div className="world-wrapper">
      <ThemeSelector />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sync/:rootId/:mobileId" component={SyncMobile} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default Routes;
