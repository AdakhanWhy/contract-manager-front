import { z } from "zod";
import { CONTRACT_STATUS } from "../types/enums";
import { baseAxios } from "../utils/baseAxios";
import type { ContractEntity } from "../types/entities/contract.entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const updateContractSchema = z.object({
  title: z.string().optional(),
  templateId: z.string().optional(),
  status: z.nativeEnum(CONTRACT_STATUS).optional(),
});

export type UpdateContractForm = z.infer<typeof updateContractSchema>;

type UpdateContractDto = {
  id: string;
  updateContractDto: UpdateContractForm;
};

export const updateContract = async ({ id, updateContractDto }: UpdateContractDto) => {
  const { data } = await baseAxios.patch<ContractEntity>(`/contract/${id}`, updateContractDto);
  return data;
};

export const useUpdateContract = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateContract,
    onSettled() {
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "contracts",
      });
    },
  });

  return [mutation.mutateAsync, mutation] as const;
};