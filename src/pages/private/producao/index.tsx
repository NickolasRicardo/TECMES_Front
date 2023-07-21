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
import Services, { IProducaoTable } from "./services";
import GlobalServices from "../../../services";
import { Field, Formik, FormikProps } from "formik";
import { ICliente } from "../../../@interfaces/ICliente";
import { IProduto } from "../../../@interfaces/IProduto";
import { IRequestByIDModel } from "../../../@interfaces/IRequestByIDModel";
import { IProducao } from "../../../@interfaces/IProducao";
import { IMaquina } from "../../../@interfaces/IMaquina";
import { IOrdemProducaoTable } from "../ordens/services";

type NotificationType = "success" | "info" | "warning" | "error";

function ProducaoPage() {
  const [Producoes, setProducoes] = useState<any[]>([]);
  const [Maquinas, setMaquinas] = useState<IMaquina[]>([]);
  const [Ordens, setOrdens] = useState<
    IOrdemProducao[] | IOrdemProducaoTable[]
  >([]);
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

  const LoadProducoes = async () => {
    let services = new Services();
    setLoading(true);

    const { error, response } = await services.List();

    if (!error && response) {
      console.log(response);
      setProducoes(response);
      setLoading(false);
    }
  };

  const LoadClientes = async () => {
    let services = new GlobalServices.MaquinasService();
    setLoading(true);
    console.log("entrou aqui");
    const { error, response } = await services.List();

    if (!error && response) {
      setMaquinas(response);
      setLoading(false);
    }
  };

  const LoadProdutos = async () => {
    let services = new GlobalServices.OrdensProducaoService();
    setLoading(true);
    console.log("entrou aqui");
    const { error, response } = await services.List();

    if (!error && response) {
      setOrdens(response);
      setLoading(false);
    }
  };

  useEffect(() => {
    LoadProducoes();
  }, []);

  const handleCreateOrdem = async (values: any) => {
    let services = new Services();
    console.log(values);
    setLoading(true);
    var req: IProducao = {
      ordemProducaoId: values.ordens,
      quantidade: values.quantidade,
      maquinaId: values.maquina,
    };
    try {
      console.log(req);
      await services.Create(req);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      LoadProducoes();
      setLoading(false);
      hideModal();
    }
  };

  const handleDelete = async (value: any) => {
    let services = new Services();
    setLoading(true);
    console.log("entrou aqui");
    var req: IRequestByIDModel = {
      id: value,
    };
    const { error } = await services.Delete(req);

    if (!error) {
      setLoading(false);
      LoadProducoes();
    }
  };

  const confirm = (data: IProducaoTable) => {
    Modal.confirm({
      title: "Excluir",
      icon: <ExclamationCircleOutlined />,
      content:
        "Você realmente deseja excluir a ordem de produção: " +
        data.numeroOrdemProducao,
      okText: "Excluir",
      cancelText: "Cancelar",
      onOk: () => handleDelete(data?.id),
    });
  };

  const columns: ColumnsType<IProducaoTable> = [
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
      title: "Quantidade de produtos produzidos",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Máquina",
      dataIndex: "maquinaSerie",
      key: "maquinaSerie",
    },

    {
      title: "Ações",
      key: "action",
      render: (_, ordemProducao) => (
        <Space size="middle">
          <a onClick={() => confirm(ordemProducao)}>Excluir</a>
        </Space>
      ),
    },
  ];

  return (
    <S.Container>
      <Row style={{ width: "100%" }}>
        <Col span={2}></Col>

        <Col span={10}>
          <h1>Painel de produção</h1>
        </Col>
        <Col span={6} style={{ width: "100%" }}></Col>
        <Col span={4}>
          <S.ButtonCss onClick={() => showModal()} style={{ width: "100%" }}>
            Registrar nova produção
          </S.ButtonCss>
        </Col>
        <Col span={2}></Col>

        <Col span={2}></Col>
        <Col span={20}>
          <Table
            columns={columns}
            dataSource={Producoes}
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
        title="Registrar nova produção"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Formik
          initialValues={{}}
          onSubmit={(values) => {
            handleCreateOrdem(values);
          }}
        >
          {(props: FormikProps<any>) => (
            <S.StyledForm className="Auth-form">
              <S.FormContent>
                Quantidade:
                <S.StyledField
                  name="quantidade"
                  placeholder="Quantidade"
                  type="number"
                />
                <br />
                Máquina:
                <Field as={"select"} name="maquina" placeholder="Máquinas">
                  <option value="" label="">
                    Selecione uma opção
                  </option>
                  {Maquinas.map((maquina) => {
                    return (
                      <option
                        key={maquina.id}
                        value={maquina.id}
                        label={maquina.codigoSerie}
                      >
                        {maquina.codigoSerie}
                      </option>
                    );
                  })}
                </Field>
                <br />
                Ordem de serviço:
                <Field
                  as={"select"}
                  name="ordens"
                  placeholder="Ordens de serviço"
                >
                  <option value="" label="">
                    Selecione uma opção
                  </option>
                  {Ordens.map((ordem) => {
                    return (
                      <option
                        key={ordem.id}
                        value={ordem.id}
                        label={ordem.numeroOrdemProducao}
                      >
                        {ordem.numeroOrdemProducao}
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

export { ProducaoPage };
