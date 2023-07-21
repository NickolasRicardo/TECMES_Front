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
import { IPagedModel } from "../../../@interfaces/IPagedModel";
import GlobalServices from "../../../services";
import { Field, Formik, FormikProps } from "formik";
import { ICliente } from "../../../@interfaces/ICliente";
import { IRequestByIDModel } from "../../../@interfaces/IRequestByIDModel";
import { IProduto } from "../../../@interfaces/IProduto";

type NotificationType = "success" | "info" | "warning" | "error";

function ProdutosPage() {
  const [Produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const LoadProduto = async () => {
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
    LoadProduto();
  }, []);

  const handleCreateProduto = async (values: any) => {
    let services = new GlobalServices.ProdutosService();
    console.log(values);
    setLoading(true);
    var req: IProduto = {
      nome: values.nome,
    };
    try {
      console.log(req);
      await services.Create(req);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      LoadProduto();
      setLoading(false);
      hideModal();
    }
  };

  const handleDelete = async (value: any) => {
    let services = new GlobalServices.ProdutosService();
    setLoading(true);
    console.log("entrou aqui");
    var req: IRequestByIDModel = {
      id: value,
    };
    const { error } = await services.Delete(req);

    if (!error) {
      setLoading(false);
      LoadProduto();
    }
  };

  const confirm = (data: IProduto) => {
    Modal.confirm({
      title: "Excluir",
      icon: <ExclamationCircleOutlined />,
      content: "Você realmente deseja excluir o produto: " + data.nome,
      okText: "Excluir",
      cancelText: "Cancelar",
      onOk: () => handleDelete(data?.id),
    });
  };

  const columns: ColumnsType<IProduto> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },

    {
      title: "Ações",
      key: "action",
      render: (_, produto) => (
        <Space size="middle">
          <a onClick={() => confirm(produto)}>Excluir</a>
        </Space>
      ),
    },
  ];

  return (
    <S.Container>
      <Row style={{ width: "100%" }}>
        <Col span={2}></Col>

        <Col span={10}>
          <h1>Produtos</h1>
        </Col>
        <Col span={6} style={{ width: "100%" }}></Col>
        <Col span={4}>
          <S.ButtonCss onClick={() => showModal()} style={{ width: "100%" }}>
            Criar novo produto
          </S.ButtonCss>
        </Col>
        <Col span={2}></Col>

        <Col span={2}></Col>
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={Produtos}
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
        title="Novo Produto"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            handleCreateProduto(values);
          }}
        >
          {(props: FormikProps<any>) => (
            <S.StyledForm className="Auth-form">
              <S.FormContent>
                Nome:
                <S.StyledField name="nome" placeholder="Nome" type="text" />
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

export { ProdutosPage };
