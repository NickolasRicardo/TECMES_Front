import { IMaquina } from "./IMaquina";
import { IOrdemProducao } from "./IOrdemProducao";

export interface IProducao {
  id?: number;
  criado_Em?: Date;
  quantidade: number;
  maquinaId: number;
  ordemProducaoId: number;
  maquina?: IMaquina;
  ordemProducao?: IOrdemProducao;
}
