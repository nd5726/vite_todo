import axios from "axios";

const baseURL = "https://todoo.5xcamp.us";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 從 localStorage 將 token 取出
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 如果 token 存在的話，則帶入到 headers 當中
    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export const apiHelper = axiosInstance;
