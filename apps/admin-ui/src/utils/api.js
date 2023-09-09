import { deleteRequest, getRequest, postRequest, putRequest } from "./http";

// Consider a single subdomain instead, with path based routing at reverse proxy
const services = {
  AUTH: "auth-service",
  SIGNUP: "signup-service",
  USER: "user-service",
  POST: "post-service",
};

// Should be an environment variable
const API_DOMAIN = "localhost.com";

const TRANSPORT = "http";

const auth = () => {
  const jwt = localStorage.getItem("jwt");
  return { Authorization: `Bearer ${jwt}` };
};

const validateSession = async () => {
  const jwt = localStorage.getItem("jwt");
  const response = await postRequest(`${TRANSPORT}://${services.AUTH}.${API_DOMAIN}/test`, { jwt });
  if (response?.status === 200) return true;
  return false;
};

const login = async (email, password) => {
  const response = await postRequest(`${TRANSPORT}://${services.AUTH}.${API_DOMAIN}/login`, { email, password });
  if (response?.body?.jwt) return response.body.jwt;
};

const signup = async (name, email, handle, password) => {
  const response = await postRequest(`${TRANSPORT}://${services.SIGNUP}.${API_DOMAIN}/signup`, { name, email, handle, password });
  return response;
};

const me = async () => {
  const response = await getRequest(`${TRANSPORT}://${services.USER}.${API_DOMAIN}/me`, {}, { ...auth() });
  return response;
};

const findPosts = async () => {
  const response = await getRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/posts`, {}, { ...auth() });
  return response;
};

const createPost = async (title, content) => {
  const author = localStorage.getItem("name");
  const response = await postRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post`, { title, content, author }, { ...auth() });
  return response;
};

const updatePost = async (id, title, content) => {
  // Debatable whether should be a PATCH instead, but from the user standpoint these are the only exposed fields, so effectively appears to be a PUT
  const response = await putRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post/${id}`, { title, content }, { ...auth() });
  return response;
};

const deletePost = async (id) => {
  const response = await deleteRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post/${id}`, { ...auth() });
  return response;
};

const findPost = async (id) => {
  const response = await getRequest(`${TRANSPORT}://${services.POST}.${API_DOMAIN}/post/${id}`, {}, { ...auth() });
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
