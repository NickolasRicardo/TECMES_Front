import { IVenda } from "../../../@interfaces/IVenda";
import { IPagedModel } from "../../../@interfaces/IPagedModel";
import api from "../../../http/api";
import { IRequestByIDModel } from "../../../@interfaces/IRequestByIDModel";

export interface IInterfaceResponseTable {
  error: boolean;
  response?: IPagedModel[];
}

export interface IInterfaceResponseList {
  error: boolean;
  response?: IVenda[];
}

export interface IInterfaceResponseFind {
  error: boolean;
  response?: IPagedModel[];
}

class Services {
  public async List(): Promise<IInterfaceResponseList> {
    return await api
      .get(`Venda`)
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
      .get(`Venda/paginated`)
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
