// "use server";
// import axios, {
//   AxiosError,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";
// import { cookies } from "next/headers";
// // import { refreshAccessToken } from "./fetcher/auth.fetcher";

// interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// const satellite = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// satellite.interceptors.request.use(
//   async (request: CustomAxiosRequestConfig) => {
//     const cookiesStore = await cookies();
//     const tokenSession = cookiesStore.get("token")?.value;

//     if (tokenSession) {
//       request.headers.Authorization = `Bearer ${tokenSession}`;
//     }
//     return request;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

// satellite.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response?.data;
//   },
//   async (error: AxiosError) => {
//     const originalRequest = error.config as CustomAxiosRequestConfig;

//     if (
//       error?.response?.status === 401 &&
//       originalRequest &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         // Call the API route to refresh the token
//         console.log("REFRESH TOKEN");

//         const refreshResponse = await axios.post("/api/refresh-token");

//         if (refreshResponse.data.success) {
//           // Retry the original request with the new token
//           return satellite(originalRequest);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default satellite;

"use server";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { cookies } from "next/headers";
import refreshFetcher from "./fetcher/auth.fetcher";

export const tempt = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const satellite = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const onAxiosRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const cookieStore = await cookies();
  const access = cookieStore.get("token")?.value;
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
};

const onAxiosRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

satellite.interceptors.request.use(onAxiosRequest, onAxiosRequestError);
satellite.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    const cookieStore = await cookies();
    if (error.response?.status === 401) {
      try {
        const access = await refreshFetcher();
        if (error.config) {
          error.config.headers.Authorization = `Bearer ${access}`;
          return satellite.request(error.config);
        }
      } catch (error: any) {
        cookieStore.delete("token");
        cookieStore.delete("refreshToken");
        cookieStore.delete("user");
        console.log(error);
      }
    }

    return Promise.reject(error?.response?.data || error);
  }
);

export default satellite;
