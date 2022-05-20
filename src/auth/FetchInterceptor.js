import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";
import history from "../history";
//import { AUTH_TOKEN } from "redux/constants/Auth";
import { notification } from "antd";

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
});

// Config
const ENTRY_ROUTE = "/auth/login";
//const TOKEN_PAYLOAD_KEY = "authorization";
const PUBLIC_REQUEST_KEY = "public-request";

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.headers[PUBLIC_REQUEST_KEY]) {
    /*   config.withCredentials = false; */
    }

/* 	if (false || !config.headers[PUBLIC_REQUEST_KEY]) {
		history.push(ENTRY_ROUTE)
		window.location.reload();
  } */
    return config;
  },
  (error) => {
    console.log(error);
    // Do something with request error here
    notification.error({
      message: "Error",
    });
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let notificationParam = {
      message: "Server Error please try again",
    };
    if (error.response) {
      // Remove token and redirect
      if (error.response.status === 403) {
        notificationParam.message = "Authentication Fail";
        notificationParam.description = "Please login again";
        history.push(ENTRY_ROUTE);
        window.location.reload();
      }

      if (error.response.status === 401) {
        return error.response.status;
      }

      if (error.response.status === 404) {
        notificationParam.message = "Not Found";
      }

      if (error.response.status === 400) {
        notificationParam.message = "Not Found";
      }

      if (error.response.status === 500) {
        notificationParam.message = "Internal Server Error";
      }

      if (error.response.status === 508) {
        notificationParam.message = "Time Out";
      }
    } else {
      notificationParam.message = "No Server Response";
      //localStorage.removeItem(AUTH_TOKEN);
      //history.push(ENTRY_ROUTE);
      //window.location.reload();
    }

    notification.error(notificationParam);

    return Promise.reject(error);
  }
);

export default service;
