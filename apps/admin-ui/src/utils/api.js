import { getRequest, postRequest } from "./http";

const auth = () => {
  const jwt = localStorage.getItem("jwt");
  return { Authorization: `Bearer ${jwt}` };
};

const validateSession = async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await postRequest("http://auth-service.localhost.com/test", { jwt });
  if (response?.status === 200) return true;
  return false;
};

const login = async (email, password) => {
  const response = await postRequest("http://auth-service.localhost.com/login", { email, password });
  if (response?.body?.jwt) return response.body.jwt;
};

const signup = async (name, email, password) => {
  const response = await postRequest("http://signup-service.localhost.com/signup", { name, email, password });
  return response;
};

const me = async () => {
  const response = await getRequest("http://user-service.localhost.com/me", {}, { ...auth() });
  return response;
};

const api = {
  validateSession,
  login,
  signup,
  me,
};

export default api;
