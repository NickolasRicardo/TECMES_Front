import { IProducao } from "../../../@interfaces/IProducao";
import { IPagedModel } from "../../../@interfaces/IPagedModel";
import api from "../../../http/api";
import { IRequestByIDModel } from "../../../@interfaces/IRequestByIDModel";

export interface IInterfaceResponseTable {
  error: boolean;
  response?: IPagedModel[];
}

export interface IInterfaceResponseList {
  error: boolean;
  response?: IProducao[] | IProducaoTable[];
}

export interface IInterfaceResponseFind {
  error: boolean;
  response?: IPagedModel[];
}

export interface IProducaoTable {
  id?: number;
  numeroOrdemProducao?: string;
  quantidade?: number;
  maquinaSerie?: string;
}

class Services {
  public async List(): Promise<IInterfaceResponseList> {
    return await api
      .get(`Producao`)
      .then((response) => {
        let producao = response.data;

        let itemProducao: IProducaoTable[] = [];

        producao.map((item: IProducao) => {
          console.log(item);
          return itemProducao.push({
            id: item.id,
            numeroOrdemProducao: item.ordemProducao?.numeroOrdemProducao,
            quantidade: item.quantidade,
            maquinaSerie: item.maquina?.codigoSerie,
          });
        });

        return {
          error: false,
          response: itemProducao,
        };
      })
      .catch((error) => {
        return { error: true, response: [] };
      });
  }

  public async ListPaged(): Promise<IInterfaceResponseTable> {
    return await api
      .get(`Producao/paginated`)
      .then((response) => {
        return {
          error: false,
          response: response.data,
        };
      })
      .catch((error) => {
        return { error: true, response: [] };
      });
  }

  public async Find({
    id,
  }: IRequestByIDModel): Promise<IInterfaceResponseFind> {
    return await api
      .get(`Producao/${id}`)
      .then((response) => {
        return {
          error: false,
          response: response.data,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Create(data: IProducao) {
    return await api
      .post(`Producao`, data)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Update(data: IProducao) {
    return await api
      .put(`Producao/${data.id}`, data)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Delete({ id }: IRequestByIDModel) {
    return await api
      .delete(`Producao/${id}`)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }
}

export default Services;
