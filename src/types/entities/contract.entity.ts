import type { ContractStatus } from "../enums";

export type ContractEntity = {
  id: string;
  title: string;
  templateId: string;
  status: ContractStatus;
  isSigned: boolean;
};