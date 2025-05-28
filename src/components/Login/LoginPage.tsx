import { useLogin } from "../../services/login";
import { LoginForm, type LoginFormValues } from "./LoginForm";
import { Box, Button, Grid, Group, Stack, Text } from "@mantine/core";
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
    <Stack w="100%" h="100vh" align="center" justify="center" p="md" style={{
      backgroundImage: 'url("public/bg-login.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Box w="100%" maw={900} p="lg" bg="white" style={{
        borderRadius: 10,
      }}>
        <Group justify='center' align="center" mb="lg">
          <Text size="xl" fw={600}>Авторизация</Text>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={6}>
            <Text size="sm" color="dimmed">
              Добро пожаловать! Введите ваш номер телефона и пароль, чтобы войти в систему.
            </Text>
          </Grid.Col>

          <Grid.Col span={6}>
            {isSignUp ? (
              <SignUpForm onSubmit={handleSignUpSubmit} />
            ) : (
              <>
                <LoginForm onSubmit={handleLoginSubmit} />
                <Button
                  variant="light"
                  color="violet"
                  fullWidth
                  mt="sm"
                  radius="md"
                  onClick={() => setIsSignUp(true)}
                >
                  Зарегистрироваться
                </Button>
              </>
            )}
          </Grid.Col>
        </Grid>
      </Box>
    </Stack>
  );
};