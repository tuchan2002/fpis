import axios from "axios";

const VERSION = "v1";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${VERSION}/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const postDataAPI = async (url, data, token) => {
  const res = await axios.post(`/api/${VERSION}/${url}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const putDataAPI = async (url, data, token) => {
  const res = await axios.put(`/api/${VERSION}/${url}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const patchDataAPI = async (url, data, token) => {
  const res = await axios.patch(`/api/${VERSION}/${url}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${VERSION}/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
