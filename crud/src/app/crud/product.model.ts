import { ProductStatus } from "./enuns/status.enum";

export interface ProductModel {
  id?: string,
  nome: string,
  status: ProductStatus,
  quantidade: number,
  fornecedor: string,
  validade: Date,
  categoria: string,
}
