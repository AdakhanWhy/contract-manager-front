import { useQuery } from "@tanstack/react-query";
import type { ContractEntity } from "../types/entities/contract.entity";
import { baseAxios } from "../utils/baseAxios";

export const fetchContractById = async (id: string) => {
  const { data } = await baseAxios.get<ContractEntity>(`/contract/${id}`);
  return data;
};

export const useFetchContractById = (id: string) => {
  const query = useQuery({
    queryFn: () => fetchContractById(id),
    queryKey: ["contracts", id],
  });

  return [query.data, query] as const;
};