export enum ProductStatus {
  PENDENTE,
  EM_ANDAMENTO,
  CONCLUIDO
}

export const CrudStatusLabel = new Map<number, string>([
  [ProductStatus.PENDENTE, 'Pendente'],
  [ProductStatus.EM_ANDAMENTO, 'Em andamento'],
  [ProductStatus.CONCLUIDO, 'Concluido'],
]);
