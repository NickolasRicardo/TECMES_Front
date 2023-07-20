import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppProviders from "./hook";
import Router from "./router";

import Global from "./@styles/global";
import { Layout } from "./layout";

const App = () => (
  <BrowserRouter>
    <AppProviders>
      <Global />
      <Router />
    </AppProviders>
  </BrowserRouter>
);

export default App;

