export const CONTRACT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
} as const;

export type ContractStatus =
  (typeof CONTRACT_STATUS)[keyof typeof CONTRACT_STATUS];

export const ContractStatusRu: Record<ContractStatus, string> = {
  [CONTRACT_STATUS.DRAFT]: 'Черновик',
  [CONTRACT_STATUS.ACTIVE]: 'Активный',
  [CONTRACT_STATUS.EXPIRED]: 'Истек',
  [CONTRACT_STATUS.TERMINATED]: 'Прекращен',
}