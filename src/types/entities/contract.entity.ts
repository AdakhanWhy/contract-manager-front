import type { ContractStatus } from "../enums";

export type ContractEntity = {
  id: string;
  title: string;
  templateId: string;
  status: ContractStatus;
  startDate: Date;
  endDate: Date;
  isSigned: boolean;
};