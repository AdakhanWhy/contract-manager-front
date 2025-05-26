import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "../utils/baseAxios";
import type { ContractTemplateEntity } from "../types/entities/contract-template.entity";
import type { CreateContractTemplateForm } from "../components/modals/CreateContractTemplateModal";

export const createContractTemplate = async (dto: CreateContractTemplateForm) => {
  const { data } = await baseAxios.post<ContractTemplateEntity>("/contract-template", dto);

  return data;
};

export const useCreateContractTemplate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createContractTemplate,
    onSuccess() {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "contract-templates" || query.queryKey[0] === "contracts",
      });
    },
  });

  return [mutation.mutateAsync, mutation] as const;
};
