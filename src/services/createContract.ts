import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateContractForm } from "../components/modals/CreateContractModal";
import type { ContractEntity } from "../types/entities/contract.entity";
import { baseAxios } from "../utils/baseAxios";

export const createContract = async (dto: CreateContractForm) => {
  const { data } = await baseAxios.post<ContractEntity>("/contract", dto);

  return data;
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createContract,
    onSuccess() {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "contracts",
      });
    },
  });

  return [mutation.mutateAsync, mutation] as const;
};
