import axios from "axios";

// export const API_URL = import.meta.env.VITE_API_URL;
// console.log("url", API_URL)
export const API_URL = "http://localhost:5272/api";
export const API_URL_IMAGES = import.meta.env.VITE_API_URL_IMAGES;

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });