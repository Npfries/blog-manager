import { Card, Center, Tabs } from "@mantine/core";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

const Login = () => {
  return (
    <Center w={480} mx="auto">
      <Card w={480} mt="xl">
        <Tabs defaultValue="login">
          <Tabs.List>
            <Tabs.Tab value="login">Log In</Tabs.Tab>
            <Tabs.Tab value="signup">Sign Up</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="login" pt="xs">
            <LoginForm></LoginForm>
          </Tabs.Panel>

          <Tabs.Panel value="signup" pt="xs">
            <SignupForm></SignupForm>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Center>
  );
};

export default Login;
