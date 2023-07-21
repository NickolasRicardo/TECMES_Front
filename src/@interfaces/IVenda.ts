import { ICliente } from "./ICliente";
import { IOrdemProducao } from "./IOrdemProducao";
import { IProduto } from "./IProduto";

export interface IVenda {
  id?: number;
  criado_Em?: Date;
  quantidade: number;
  status: number;
  ordemProducaoId: number;
  produtoId: number;
  clienteId: number;
  cliente?: ICliente;
  ordemProducao?: IOrdemProducao;
  produto?: IProduto;
}
