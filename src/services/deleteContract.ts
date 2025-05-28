import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContractEntity } from "../types/entities/contract.entity";
import { baseAxios } from "../utils/baseAxios";

export const deleteContract = async (id: string) => {
  const { data } = await baseAxios.delete<ContractEntity>(`/contract/${id}`);
  return data;
};

export const useDeleteContract = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteContract,
    onSuccess() {
      void queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'contracts' });
    },
  });

  return [mutation.mutateAsync, mutation] as const;
};