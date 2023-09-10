const getRequest = async (path, params, headers) => {
  const response = await fetch(path, {
    method: "GET",
    headers,
  });

  return {
    status: response.status,
    body: await response.json(),
  };
};

const postRequest = async (path, body, headers) => {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return {
    status: response.status,
    body: await response.json(),
  };
};

const putRequest = async (path, body, headers) => {
  const response = await fetch(path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return {
    status: response.status,
    body: await response.json(),
  };
};

const deleteRequest = async (path, headers) => {
  const response = await fetch(path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...headers,
    },
  });

  return {
    status: response.status,
    body: await response.json(),
  };
};

export { getRequest, postRequest, putRequest, deleteRequest };
