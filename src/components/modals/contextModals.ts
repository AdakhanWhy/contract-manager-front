import { CreateContractModal } from "./CreateContractModal";
import { CreateContractTemplateModal } from "./CreateContractTemplateModal";
import UpdateContractModal from "./UpdateContractModal";

export const modals = {
  createContract: CreateContractModal,
  createContractTemplate: CreateContractTemplateModal,
  updateContract: UpdateContractModal,
} as const;


declare module '@mantine/modals' {
  interface MantineModalsOverride {
    modals: typeof modals;
  }
}