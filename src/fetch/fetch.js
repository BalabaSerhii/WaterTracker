import axios from "axios";

const API_URL = " ";
export function setAuthHeader(token) {
  axios.defaults.headers.common.Authorization = token;
}

export async function registerFetch(data) {
  axios.defaults.baseURL = "/";
  const response = await axios.post("users/signup", data);
  return response;
}


export async function getUserInfo() {
  const response = await axios.get(`${API_URL}/user/info`);
  return response;
}


