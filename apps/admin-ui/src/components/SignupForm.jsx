import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async () => {
    const result = await api.signup(name, email, handle, password);
    if (result.status === 200) navigate(0);
  };

  return (
    <>
      <TextInput label="Name" placeholder="John Doe" onChange={(event) => setName(event.currentTarget.value)}></TextInput>
      <TextInput label="Email" placeholder="user@example.com" onChange={(event) => setEmail(event.currentTarget.value)}></TextInput>
      <TextInput label="Handle" placeholder="mycoolhandle" onChange={(event) => setHandle(event.currentTarget.value)}></TextInput>
      <PasswordInput label="Password" onChange={(event) => setPassword(event.currentTarget.value)}></PasswordInput>
      <Button mt="lg" fullWidth onClick={signup}>
        Sign Up
      </Button>
    </>
  );
};

export default SignupForm;
