import { useQuery } from "@tanstack/react-query";
import type { UserEntity } from "../types/entities/user.entity";
import { baseAxios } from "../utils/baseAxios";

export const getMe = async () => {
  const { data } = await baseAxios.get<UserEntity>("/contract/user-me");
  return data;
};

export const useGetMe = () => {
  const query = useQuery({
    queryFn: () => getMe(),
    queryKey: ["me"],
  });

  return [query.data, query] as const;
};