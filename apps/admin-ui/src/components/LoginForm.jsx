import { PasswordInput, TextInput, Button } from "@mantine/core";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const result = await api.login(email, password);
    if (!result) return;
    localStorage.setItem("jwt", result);
    navigate("/");
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
