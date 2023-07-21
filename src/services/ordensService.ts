import { IOrdemProducao } from "../@interfaces/IOrdemProducao";
import { IPagedModel } from "../@interfaces/IPagedModel";
import api from "../http/api";
import { IRequestByIDModel } from "../@interfaces/IRequestByIDModel";

export interface IInterfaceResponseTable {
  error: boolean;
  response?: IPagedModel;
}

export interface IInterfaceResponseList {
  error: boolean;
  response?: IOrdemProducao[] | IOrdemProducaoTable[];
}

export interface IInterfaceResponseFind {
  error: boolean;
  response?: IPagedModel[];
}

export interface IOrdemProducaoTable {
  id?: number;
  numeroOrdemProducao?: string;
  quantidade?: number;
  status?: string;
  cliente?: string;
  produto?: string;
}

class Services {
  public async List(): Promise<IInterfaceResponseList> {
    return await api
      .get(`OrdemProducao`)
      .then((response) => {
        let ordens = response.data;

        let itemOrdens: IOrdemProducaoTable[] = [];

        ordens.map((item: IOrdemProducao) => {
          return itemOrdens.push({
            id: item.id,
            numeroOrdemProducao: item.numeroOrdemProducao,
            quantidade: item.quantidade,
            status: item.status === 0 ? "Em aberto" : "Finalizado",
            cliente: item.cliente?.nome,
            produto: item.produto?.nome,
          });
        });

        return {
          error: false,
          response: itemOrdens,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async ListPaged(): Promise<IInterfaceResponseTable> {
    return await api
      .get(`OrdemProducao/Paginated`)
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

  public async Find({
    id,
  }: IRequestByIDModel): Promise<IInterfaceResponseFind> {
    return await api
      .get(`OrdemProducao/${id}`)
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

  public async Create(data: IOrdemProducao) {
    return await api
      .post(`OrdemProducao`, data)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Update(data: IOrdemProducao) {
    return await api
      .put(`OrdemProducao/${data.id}`, data)
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
      .delete(`OrdemProducao/${id}`)
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
