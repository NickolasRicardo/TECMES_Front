import { ICliente } from "./ICliente";
import { IProduto } from "./IProduto";

export interface IOrdemProducao {
  id?: number;
  criado_Em?: Date;
  numeroOrdemProducao: string;
  quantidade: number;
  status: number;

  clienteId?: number;
  produtoId?: number;
  cliente?: ICliente;
  produto?: IProduto;
}
