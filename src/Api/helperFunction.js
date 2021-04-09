import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

export const handleError = (error) => {
  throw error.response.data;
};

export const publicGet = (url) => {
  return axios
    .get(baseURL + url)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return handleError(error);
    });
};

export const publicPostCall = (url, data) => {
  return axios
    .post(baseURL + url, data)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return handleError(error);
    });
};

export const getWithToken = (url, token) => {
  return axios
    .get(baseURL + url, {
      headers: { "x-token": token },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return handleError(error);
    });
};

export const postCall = (url, data, token) => {
  console.log(data);
  return axios
    .post(baseURL + url, data, {
      headers: { "x-token": token },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return handleError(error);
    });
};

export const postCallWithoutData = (url, token) => {
  return axios
    .post(
      baseURL + url,
      {},
      {
        headers: { "x-token": token },
      }
    )
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return handleError(error);
    });
};
