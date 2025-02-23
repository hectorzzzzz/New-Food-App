import axios, { AxiosError } from 'axios';

// const BE_URL = 'https://delta-indie.vercel.app/api';
const BE_URL = 'https://delta-indie.vercel.app/api';

const service = (token?: string) => {
  const axiosApi = axios.create();
  axiosApi.interceptors.request.use(
    async (config) => {
      config = {
        ...config,
        baseURL: BE_URL,
      };

      config.headers['Authorization'] = `Bearer ${token}`;
      // config.data = toSnakeKeys(config.data);

      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  axiosApi.interceptors.response.use(
    (response) => {
      // response.data = camelizeKeys(response.data);
      return response;
    },
    async (error: AxiosError) => {
      //Handle error
      return Promise.reject(error);
    },
  );
  return axiosApi;
};

export default service;