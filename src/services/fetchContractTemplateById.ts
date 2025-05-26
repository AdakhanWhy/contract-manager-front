import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "../utils/baseAxios";
import type { ContractTemplateEntity } from "../types/entities/contract-template.entity";

export const fetchContractTemplateById = async (id: string) => {
  const { data } = await baseAxios.get<ContractTemplateEntity>(`/contract-template/${id}`);
  return data;
};

export const useFetchContractTemplateById = (id: string) => {
  const query = useQuery({
    queryFn: () => fetchContractTemplateById(id),
    queryKey: ["contract-templates", id],
  });

  return [query.data, query] as const;
};