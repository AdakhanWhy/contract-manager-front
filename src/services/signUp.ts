import { z } from "zod"
import { baseAxios } from "../utils/baseAxios"
import type { Tokens } from "../types/entities/user.entity"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const signUpSchema = z.object({
  phone: z.string(),
  newPassword: z.string(),
  passwordConfirm: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
})

export type SignUp = z.infer<typeof signUpSchema>

export const signUp = async (dto: SignUp) => {
  const { data } = await baseAxios.post<Tokens>('/auth/signup', dto)
  return data
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess(data) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/contracts");
    },
  });

  return [mutation.mutateAsync, mutation] as const;
}