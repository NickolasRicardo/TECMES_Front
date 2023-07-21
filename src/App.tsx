import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppProviders from "./hook";
import Router from "./router";

import Global from "./@styles/global";
import { ConfigProvider } from "antd";
import ptBRAnt from "antd/lib/locale/pt_BR";

import { Layout } from "./layout";

const App = () => (
  <ConfigProvider locale={ptBRAnt}>
    <BrowserRouter>
      <AppProviders>
        <Global />
        <Router />
      </AppProviders>
    </BrowserRouter>
  </ConfigProvider>
);

export default App;

