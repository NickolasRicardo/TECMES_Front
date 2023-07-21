import { IVenda } from "../@interfaces/IVenda";
import { IPagedModel } from "../@interfaces/IPagedModel";
import api from "../http/api";
import { IRequestByIDModel } from "../@interfaces/IRequestByIDModel";

export interface IInterfaceResponseTable {
  error: boolean;
  response?: IPagedModel;
}

export interface IInterfaceResponseList {
  error: boolean;
  response?: IVenda[] | IVendaTable[];
}

export interface IInterfaceResponseFind {
  error: boolean;
  response?: IPagedModel[];
}

export interface IVendaTable {
  id?: number;
  quantidade?: number;
  status?: string;
  ordemProducao?: string;
  cliente?: string;
  produto?: string;
}

class Services {
  public async List(): Promise<IInterfaceResponseList> {
    return await api
      .get(`Venda`)
      .then((response) => {
        let ordens = response.data;

        let itemOrdens: IVendaTable[] = [];

        ordens.map((item: IVenda) => {
          return itemOrdens.push({
            id: item.id,

            quantidade: item.quantidade,
            status: item.status === 0 ? "Em aberto" : "Finalizado",
            cliente: item.cliente?.nome,
            produto: item.produto?.nome,
            ordemProducao: item.ordemProducao?.numeroOrdemProducao,
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
      .get(`Venda/Paginated`)
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
      .get(`Venda/${id}`)
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

  public async Create(data: IVenda) {
    return await api
      .post(`Venda`, data)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Update(data: IVenda) {
    return await api
      .put(`Venda/${data.id}`, data)
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
      .delete(`Venda/${id}`)
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
