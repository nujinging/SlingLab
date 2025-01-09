import axios from 'axios';
import { API_URL } from './../config';

const createRequest = () => {
  const loginToken = localStorage.getItem("token");
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: loginToken,
    }
  });
};

export default createRequest;