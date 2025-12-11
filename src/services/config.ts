import axios from "axios";
import { tokenUtils } from "./utils.services";

const API_BASE_URL = process.env.NEXT_PUBLIC_SME_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth tokens
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await tokenUtils.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear tokens from cookies and redirect
      tokenUtils.removeTokens();
      // Optionally redirect to login
      // window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const GraphqlEndpoints = {
  AUTH: "/auth",
  EVENTS: "/events",
  EVENT: "/event",
  EVENTS_YEARS: "/Years",
  COURSES: "/courses",
  COURSE: "/course",
  USERS: "/users",
  COMPANIES: "/companies",
  DOCUMENTS: "/documents",
  ANALYTICS: "/analytics",
  HEALTH: "/health",
};
