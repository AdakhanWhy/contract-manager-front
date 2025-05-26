import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "../utils/baseAxios";
import type { ContractTemplateEntity } from "../types/entities/contract-template.entity";

export const fetchContractTemplates = async () => {
  const { data } = await baseAxios.get<ContractTemplateEntity[]>('/contract-template');
  return data;
};

export const useFetchContractTemplates = () => {
  const query = useQuery({
    queryFn: () => fetchContractTemplates(),
    queryKey: ["contract-templates"],
  });

  return [query.data ?? [], query] as const;
};