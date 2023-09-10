import { http } from "@blog-manager/utils";

// Consider a single subdomain instead, with path based routing at reverse proxy
const services = {
  COMMENT: "comment-service",
};

// Should be environment variables
const API_DOMAIN = "localhost.com";
const TRANSPORT = "http";

/**
 *
 * @param {string} postId
 */
const findComments = async (postId) => {
  const response = await http.getRequest(`${TRANSPORT}://${services.COMMENT}.${API_DOMAIN}/comments/${postId}`, {}, {});
  return response;
};

/**
 *
 * @param {string} postId
 * @param {string} author
 * @param {string} content
 * @param {string?} parentId
 */
const addComment = async (postId, author, content, parentId) => {
  const response = await http.postRequest(
    `${TRANSPORT}://${services.COMMENT}.${API_DOMAIN}/comment`,
    {
      postId,
      author,
      content,
      parentId,
    },
    {}
  );
  return response;
};

const updateComment = async (id, content) => {
  const response = await http.putRequest(`${TRANSPORT}://${services.COMMENT}.${API_DOMAIN}/comment/${id}`, {
    content,
  });
  return response;
};

const deleteComment = async (id) => {
  const response = await http.deleteRequest(`${TRANSPORT}://${services.COMMENT}.${API_DOMAIN}/comment/${id}`, {});
  return response;
};

const api = {
  findComments,
  addComment,
  updateComment,
  deleteComment,
};

export default api;
