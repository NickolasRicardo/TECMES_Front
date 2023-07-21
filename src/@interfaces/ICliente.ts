import { IOrdemProducao } from "./IOrdemProducao";
import { IVenda } from "./IVenda";

export interface ICliente {
  id?: number;
  criado_Em?: Date;
  nome: string;
  ordemProducaos?: [IOrdemProducao] | [];
  venda?: [IVenda] | [];
}
