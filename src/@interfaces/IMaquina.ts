import { IProducao } from "./IProducao";

export interface IMaquina {
  id?: number;
  criado_Em?: Date;
  codigoSerie: string;
  producoes?: [IProducao] | [];
}
