import { IProduto } from "../../../@interfaces/IProduto";
import { IPagedModel } from "../../../@interfaces/IPagedModel";
import api from "../../../http/api";
import { IRequestByIDModel } from "../../../@interfaces/IRequestByIDModel";

export interface IInterfaceResponseTable {
  error: boolean;
  response?: IPagedModel[];
}

export interface IInterfaceResponseList {
  error: boolean;
  response?: IProduto[];
}

export interface IInterfaceResponseFind {
  error: boolean;
  response?: IPagedModel[];
}

class Services {
  public async List(): Promise<IInterfaceResponseList> {
    return await api
      .get(`Produto`)
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

  public async ListPaged(): Promise<IInterfaceResponseTable> {
    return await api
      .get(`Produto/paginated`)
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
      .get(`Produto/${id}`)
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

  public async Create(data: IProduto) {
    return await api
      .post(`Produto`, data)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Update(data: IProduto) {
    return await api
      .put(`Produto/${data.id}`, data)
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
      .delete(`Produto/${id}`)
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
