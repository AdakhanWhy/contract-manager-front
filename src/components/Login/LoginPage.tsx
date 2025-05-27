import { useLogin } from "../../services/login";
import { LoginForm, type LoginFormValues } from "./LoginForm";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useSignUp } from "../../services/signUp";
import { useState } from "react";
import SignUpForm, { type SignUpFormValues } from "../SignUp/SignUpForm";

export const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [login] = useLogin();
  const [signUp] = useSignUp();

  const handleLoginSubmit = (values: LoginFormValues) => {
    login(values);
  };

  const handleSignUpSubmit = (values: SignUpFormValues) => {
    signUp({
      phone: values.phone,
      newPassword: values.password,
      passwordConfirm: values.passwordConfirmation,
      firstName: values.firstName,
      lastName: values.lastName,
    });
  };

  return (
    <Stack w="100%" h="100vh" align="center" justify="center" p='md'>
      <Group>
        <Text size="xl" >
          Авторизация
        </Text>
      </Group>
      <Group h='80vh'>
        <div className="grid grid-cols-12 gap-3 justify-center">
          <div className="col-span-6 flex flex-col justify-center items-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus impedit debitis deleniti autem tempore dicta iure! Quisquam sit, reiciendis adipisci repudiandae sunt beatae et, dolorem dolore voluptates quidem, facere autem.
          </div>

          <div></div>
          <div className="col-span-5">
            {
              isSignUp
                ? <SignUpForm onSubmit={handleSignUpSubmit} />
                : <LoginForm onSubmit={handleLoginSubmit} />
            }
            {!isSignUp && (
              <Button className="mt-3"
                color="#722CCC"
                size="md"
                mt={9}
                radius={10}
                fullWidth
                onClick={() => setIsSignUp(true)}
              >
                Зарегистрироваться
              </Button>
            )}
          </div>
        </div>
      </Group>
    </Stack>
  );
};