import React, { useEffect, useState } from "react";

import * as S from "./styles";
import {} from "antd";

import {
  Row,
  Col,
  Button,
  Input,
  Modal,
  notification,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { IOrdemProducao } from "../../../@interfaces/IOrdemProducao";
import { IPagedModel } from "../../../@interfaces/IPagedModel";
import GlobalServices from "../../../services";
import { Field, Formik, FormikProps } from "formik";
import { ICliente } from "../../../@interfaces/ICliente";
import { IProduto } from "../../../@interfaces/IProduto";
import { IRequestByIDModel } from "../../../@interfaces/IRequestByIDModel";
import { IVendaTable } from "../../../services/vendasService";
import { IVenda } from "../../../@interfaces/IVenda";

type NotificationType = "success" | "info" | "warning" | "error";

function VendasPage() {
  const [OrdensProducao, setOrdensProducao] = useState<any[]>([]);
  const [Clientes, setClientes] = useState<ICliente[]>([]);
  const [Produtos, setProdutos] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = React.useState(false);

  const showModal = () => {
    LoadClientes();
    LoadProdutos();
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const LoadOrdensServico = async () => {
    let services = new GlobalServices.OrdensProducaoService();
    setLoading(true);

    const { error, response } = await services.List();

    if (!error && response) {
      setOrdensProducao(response);
      setLoading(false);
    }
  };

  const LoadClientes = async () => {
    let services = new GlobalServices.ClienteService();
    setLoading(true);
    console.log("entrou aqui");
    const { error, response } = await services.List();

    if (!error && response) {
      setClientes(response);
      setLoading(false);
    }
  };

  const LoadProdutos = async () => {
    let services = new GlobalServices.ProdutosService();
    setLoading(true);
    console.log("entrou aqui");
    const { error, response } = await services.List();

    if (!error && response) {
      setProdutos(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadOrdensServico();
  }, []);

  const handleCreateVenda = async (values: any) => {
    let services = new GlobalServices.VendasService();
    console.log(values);
    setLoading(true);
    var req: IVenda = {
      quantidade: values.quantidade,
      status: 0,
      clienteId: Number(values.cliente),
      produtoId: Number(values.produto),
      ordemProducaoId: Number(values.OrdemProducao),
    };
    try {
      console.log(req);
      await services.Create(req);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      LoadOrdensServico();
      setLoading(false);
      hideModal();
    }
  };

  const handleDelete = async (value: any) => {
    let services = new GlobalServices.VendasService();
    setLoading(true);
    console.log("entrou aqui");
    var req: IRequestByIDModel = {
      id: value,
    };
    const { error } = await services.Delete(req);

    if (!error) {
      setLoading(false);
      LoadOrdensServico();
    }
  };

  const confirm = (data: IVendaTable) => {
    Modal.confirm({
      title: "Excluir",
      icon: <ExclamationCircleOutlined />,
      content: "Você realmente deseja excluir a ordem de produção: " + data.id,
      okText: "Excluir",
      cancelText: "Cancelar",
      onOk: () => handleDelete(data?.id),
    });
  };

  const columns: ColumnsType<IVendaTable> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Numero Ordem de Produção",
      dataIndex: "numeroOrdemProducao",
      key: "numeroOrdemProducao",
    },
    {
      title: "Quantidade de produtos",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Produto",
      dataIndex: "produto",
      key: "produto",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, venda) => (
        <Space size="middle">
          <a onClick={() => confirm(venda)}>Excluir</a>
        </Space>
      ),
    },
  ];

  return (
    <S.Container>
      <Row style={{ width: "100%" }}>
        <Col span={2}></Col>

        <Col span={10}>
          <h1>Ordens de produção</h1>
        </Col>
        <Col span={6} style={{ width: "100%" }}></Col>
        <Col span={4}>
          <S.ButtonCss onClick={() => showModal()} style={{ width: "100%" }}>
            Criar nova ordem de produção
          </S.ButtonCss>
        </Col>
        <Col span={2}></Col>

        <Col span={2}></Col>
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={OrdensProducao}
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              hideOnSinglePage: true,
            }}
          />
        </Col>
        <Col span={2}></Col>
      </Row>
      <div style={{ flex: 1 }}></div>

      <Modal
        title="Nova Ordem de Produção"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            handleCreateVenda(values);
          }}
        >
          {(props: FormikProps<any>) => (
            <S.StyledForm className="Auth-form">
              <S.FormContent>
                Número da Ordem de Produção:
                <S.StyledField
                  name="numeroOrdemProducao"
                  placeholder="Número da Ordem de Produção"
                />
                <br />
                Quantidade:
                <S.StyledField
                  name="quantidade"
                  placeholder="Quantidade"
                  type="number"
                />
                <br />
                Cliente:
                <Field as={"select"} name="cliente" placeholder="Clientes">
                  <option value="" label="">
                    Selecione uma opção
                  </option>
                  {Clientes.map((cliente) => {
                    return (
                      <option
                        key={cliente.id}
                        value={cliente.id}
                        label={cliente.nome}
                      >
                        {cliente.nome}
                      </option>
                    );
                  })}
                </Field>
                <br />
                Produto:
                <Field as={"select"} name="produto" placeholder="Produtos">
                  <option value="" label="">
                    Selecione uma opção
                  </option>
                  {Produtos.map((produto) => {
                    return (
                      <option
                        key={produto.id}
                        value={produto.id}
                        label={produto.nome}
                      >
                        {produto.nome}
                      </option>
                    );
                  })}
                </Field>
                <br />
                <S.ButtonCss type="submit">
                  {loading ? "carregando..." : "Salvar"}
                </S.ButtonCss>
                <br />
              </S.FormContent>
            </S.StyledForm>
          )}
        </Formik>
      </Modal>
    </S.Container>
  );
}

export { VendasPage };
