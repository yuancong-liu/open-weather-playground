import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
