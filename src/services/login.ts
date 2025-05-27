import { useMutation } from "@tanstack/react-query"
import type { Tokens } from "../types/entities/user.entity"
import { baseAxios } from "../utils/baseAxios"
import { useNavigate } from "react-router-dom"

export const login = async ({ phone, password }: { phone: string, password: string }) => {
  const { data } = await baseAxios.post<Tokens>('/auth/login', { phone, password })
  return data
}

export const useLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess(data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/contracts");
    },
  });

  return [mutation.mutateAsync, mutation] as const;
}