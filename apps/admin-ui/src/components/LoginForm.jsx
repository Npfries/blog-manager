import { PasswordInput, TextInput, Button } from "@mantine/core";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log("login!", email, password);
  };

  return (
    <>
      <TextInput label="Email" placeholder="user@example.com" onChange={(event) => setEmail(event.currentTarget.value)}></TextInput>
      <PasswordInput label="Password" onChange={(event) => setPassword(event.currentTarget.value)}></PasswordInput>
      <Button mt="lg" fullWidth onClick={login}>
        Log In
      </Button>
    </>
  );
};

export default LoginForm;
