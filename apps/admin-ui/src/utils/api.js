import { http } from "@blog-manager/utils";

// Consider a single subdomain instead, with path based routing at reverse proxy
const services = {
  AUTH: "auth-service",
  SIGNUP: "signup-service",
  USER: "user-service",
  POST: "post-service",
};

// Should be environment variables
const API_DOMAIN = "localhost.com";
const TRANSPORT = "http";

const auth = () => {
  const jwt = localStorage.getItem("jwt");
  return { Authorization: `Bearer ${jwt}` };
};

const validateSession = async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await http.postRequest(`${TRANSPORT}://${services.AUTH}.${API_DOMAIN}/test`, { jwt });
  if (response?.status === 200) return true;
  return false;
};

const login = async (email, password) => {
  const response = await http.postRequest(`${TRANSPORT}://${services.AUTH}.${API_DOMAIN}/login`, { email, password });
  if (response?.body?.jwt) return response.body.jwt;
};

const signup = async (name, email, handle, password) => {
  const response = await http.postRequest(`${TRANSPORT}://${services.SIGNUP}.${API_DOMAIN}/signup`, { name, email, handle, password });
  return response;
};

const me = async () => {
  const response = await http.getRequest(`${TRANSPORT}://${services.USER}.${API_DOMAIN}/me`, {}, { ...auth() });
  return response;
};

const findPosts = async () => {
  const response = await http.getRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/posts`, {}, { ...auth() });
  return response;
};

const createPost = async (title, content) => {
  const author = localStorage.getItem("name");
  const response = await http.postRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post`, { title, content, author }, { ...auth() });
  return response;
};

const updatePost = async (uuid, title, content) => {
  // Debatable whether should be a PATCH instead, but from the user standpoint these are the only exposed fields, so effectively appears to be a PUT
  const response = await http.putRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post/${uuid}`, { title, content }, { ...auth() });
  return response;
};

const deletePost = async (uuid) => {
  const response = await http.deleteRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post/${uuid}`, { ...auth() });
  return response;
};

const findPost = async (uuid) => {
  const response = await http.getRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post/${uuid}`, {}, { ...auth() });
  return response;
};

const api = {
  validateSession,
  login,
  signup,
  me,
  findPosts,
  createPost,
  updatePost,
  deletePost,
  findPost,
};

export default api;
