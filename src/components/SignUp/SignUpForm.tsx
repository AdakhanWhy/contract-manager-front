import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod"
import { PhoneInput } from "../PhoneInput";
import { Button, PasswordInput, TextInput } from "@mantine/core";

const signUpFormSchema = z.object({
  phone: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: 'Пароли не совпадают',
  path: ['passwordConfirmation'],
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>

type Props = {
  onSubmit: (values: SignUpFormValues) => void;
}

const SignUpForm = ({ onSubmit }: Props) => {
  const form = useForm<SignUpFormValues>({
    initialValues: {
      phone: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
    },
    validate: zodResolver(signUpFormSchema),
  });

  const handleSubmit = (values: SignUpFormValues) => {
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
          label="Имя"
          placeholder="Введите имя"
          {...form.getInputProps("firstName")}
          radius={12}
        />
        <TextInput
          size="md"
          label="Фамилия"
          placeholder="Введите фамилию"
          {...form.getInputProps("lastName")}
          radius={12}
        />
        <PasswordInput
          size="md"
          label="Пароль"
          placeholder="Введите пароль"
          {...form.getInputProps("password")}
          radius={12}
        />
        <PasswordInput
          size="md"
          label="Повторите пароль"
          placeholder="Введите пароль"
          {...form.getInputProps('passwordConfirmation')}
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
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}

export default SignUpForm