import React from "react";
import { OrdensPage } from "../pages/private/ordens";
import { VendasPage } from "../pages/private/vendas";
import { ProducaoPage } from "../pages/private/producao";
import { ProdutosPage } from "../pages/private/produtos";

export interface IPath {
  name: string;
  path: string;
  component: React.ReactNode | null;
}

export const paths = [
  {
    name: "Ordens de Produção",
    path: "/",
    component: <OrdensPage />,
  },
  {
    name: "Painel de Produção",
    path: "/producao",
    component: <ProducaoPage />,
  },
  {
    name: "Pedidos",
    path: "/vendas",
    component: <VendasPage />,
  },

  {
    name: "Produtos",
    path: "/produtos",
    component: <ProdutosPage />,
  },
];
