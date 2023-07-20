import React from "react";
import { Switch, Redirect } from "react-router-dom";

import PublicRoute from "./PublicRouter.routes";
import PrivateRoute from "./PrivateRouter.routes";

// Paginas publicas
import { LoginPage } from "../pages/public/login";

// Paginas privadas
import { OrdensPage } from "../pages/private/ordens";
import { Layout } from "../layout";

import { IPath, paths } from "./path.routes";
import { VendasPage } from "../pages/private/vendas";
import { ProducaoPage } from "../pages/private/producao";
import { ProdutosPage } from "../pages/private/produtos";

const CreateRoute = (route: IPath, key: number) => {
  return (
    <PrivateRoute
      key={key}
      path={route.path}
      component={route.component}
      isPrivate
    />
  );
};

function Router() {
  return (
    <Switch>
      <PublicRoute path="/login" exact component={LoginPage} />

      <Layout>
        <PrivateRoute
          path="/"
          exact
          component={() => <Redirect to="/" />}
          isPrivate
        />

        <PrivateRoute exact path="/" component={OrdensPage} isPrivate />
        <PrivateRoute exact path="/ordens" component={OrdensPage} isPrivate />
        <PrivateRoute exact path="/vendas" component={VendasPage} isPrivate />
        <PrivateRoute
          exact
          path="/producao"
          component={ProducaoPage}
          isPrivate
        />
        <PrivateRoute
          exact
          path="/produtos"
          component={ProdutosPage}
          isPrivate
        />
      </Layout>
    </Switch>
  );
}

export default Router;
