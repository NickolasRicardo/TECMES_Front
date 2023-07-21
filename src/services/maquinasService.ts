import { IMaquina } from "../@interfaces/IMaquina";
import { IPagedModel } from "../@interfaces/IPagedModel";
import api from "../http/api";
import { IRequestByIDModel } from "../@interfaces/IRequestByIDModel";

export interface IInterfaceResponseTable {
  error: boolean;
  response?: IPagedModel;
}

export interface IInterfaceResponseList {
  error: boolean;
  response?: IMaquina[];
}

export interface IInterfaceResponseFind {
  error: boolean;
  response?: IPagedModel[];
}

class Services {
  public async List(): Promise<IInterfaceResponseList> {
    return await api
      .get(`Maquina`)
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

  public async ListPaged(): Promise<IInterfaceResponseTable> {
    return await api
      .get(`Maquina/Paginated`)
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
      .get(`Maquina/${id}`)
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

  public async Create(data: IMaquina) {
    return await api
      .post(`Maquina`, data)
      .then((response) => {
        return {
          error: false,
        };
      })
      .catch((error) => {
        return { error: true };
      });
  }

  public async Update(data: IMaquina) {
    return await api
      .put(`Maquina/${data.id}`, data)
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
      .delete(`Maquina/${id}`)
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
