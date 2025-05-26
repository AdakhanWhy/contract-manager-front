import { useQuery } from "@tanstack/react-query";
import type { ContractEntity } from "../types/entities/contract.entity";
import { baseAxios } from "../utils/baseAxios";

type FetchContractsDto = {
  name?: string;
};

export const fetchContracts = async (filters?: FetchContractsDto) => {
  console.log(filters);
  const { data } = await baseAxios.get<ContractEntity[]>(`/contract?name=${filters?.name}`);
  return data;
};

export const useFetchContracts = (filter?: FetchContractsDto) => {
  const query = useQuery({
    queryFn: () => fetchContracts(filter),
    queryKey: ["contracts", filter],
  });

  return [query.data ?? [], query] as const;
};