import { Card, Center, Tabs, Text } from "@mantine/core";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

const Login = () => {
  return (
    <Center w={480} mx="auto">
      <Card w={480} mt="xl">
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          fz="xl"
          fw={700}
          mb="lg"
        >
          Blog Admin
        </Text>
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
