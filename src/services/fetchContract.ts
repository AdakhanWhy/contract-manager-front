import { useQuery } from "@tanstack/react-query";
import type { ContractEntity } from "../types/entities/contract.entity";
import { baseAxios } from "../utils/baseAxios";

type FetchContractsDto = {
  name?: string;
  userId?: string;
};

export const fetchContracts = async (filters?: FetchContractsDto) => {
  const params = new URLSearchParams();
  if (filters?.name) params.append('name', filters.name);
  if (filters?.userId) params.append('userId', filters.userId);

  const { data } = await baseAxios.get<ContractEntity[]>(`/contract?${params.toString()}`);
  return data;
};

export const useFetchContracts = (filter?: FetchContractsDto) => {
  const query = useQuery({
    queryFn: () => fetchContracts(filter),
    queryKey: ["contracts", filter],
  });

  return [query.data ?? [], query] as const;
};