import { CreateContractModal } from "./CreateContractModal";
import { CreateContractTemplateModal } from "./CreateContractTemplateModal";

export const modals = {
  createContract: CreateContractModal,
  createContractTemplate: CreateContractTemplateModal
} as const;


declare module '@mantine/modals' {
  interface MantineModalsOverride {
    modals: typeof modals;
  }
}