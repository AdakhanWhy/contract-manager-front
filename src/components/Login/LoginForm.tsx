import { Button, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { PhoneInput } from "../PhoneInput";

const loginSchema = z.object({
  phone: z.string(),
  password: z.string(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type Props = {
  onSubmit: (values: LoginFormValues) => void;
}

export const LoginForm = ({ onSubmit }: Props) => {
  const form = useForm<LoginFormValues>({
    initialValues: {
      phone: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = (values: LoginFormValues) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="flex flex-col mt-3 gap-3">
        <PhoneInput
          size="md"
          label="Номер телефона"
          placeholder="Введите номер телефона"
          {...form.getInputProps("phone")}
          radius={12}
        />
        <TextInput
          size="md"
          label="Пароль"
          placeholder="Введите пароль"
          {...form.getInputProps("password")}
          radius={12}
        />

        <Button
          color="#722CCC"
          size="md"
          mt={9}
          radius={10}
          fullWidth
          type="submit"
        >
          Войти
        </Button>
      </div>
    </form>
  );
};