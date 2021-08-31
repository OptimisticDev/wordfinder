import axios from "axios";
import { API_URI, API_TOKEN } from "../utils/constants";

const config = {
  headers: { Authorization: `Token ${API_TOKEN}` },
};

export const getWordDefination = (word) => {
  return axios.get(`${API_URI}/${word}`, config);
};
