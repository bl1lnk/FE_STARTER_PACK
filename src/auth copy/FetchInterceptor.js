import axios from 'axios'
import { API_BASE_URL } from 'configs/AppConfig'
import history from '../history'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import { notification } from 'antd';
import {useDispatch } from "react-redux";
import { signOut } from 'redux/actions/Auth';
import localForage from 'localforage';


const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  withCredentials: true,
})

// Config
const ENTRY_ROUTE = '/auth/login'
const TOKEN_PAYLOAD_KEY = 'authorization'
const PUBLIC_REQUEST_KEY = 'public-request'
// API Request interceptor
service.interceptors.request.use(config => {
	//const authVariables = useSelector((state) => state.auth);


	const jwtToken = localForage.getItem(AUTH_TOKEN)
	
	if (config.headers[PUBLIC_REQUEST_KEY]) {
	/* 	config.withCredentials = false; */
	}
	


  if (!jwtToken && !config.headers[PUBLIC_REQUEST_KEY]) {
		localForage.removeItem('userInfo')
		history.push(ENTRY_ROUTE)
		window.location.reload();
  }

  return config
}, error => {
	localForage.removeItem('userInfo')
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
  Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	console.log(response);
	return response.data

}, (error) => {


	let notificationParam = {
		message: ''
	}

	console.log(error.response);

		
		if (error.response.status === 401) {
			notificationParam.message = 'Authentication Fail'
			notificationParam.description = 'Please login again'
			localForage.removeItem('userInfo')
		}
	
		if (error.response.status === 403) {
			notificationParam.message = 'Authentication Fail'
			notificationParam.description = error.response.data.message
		}
	
		if (error.response.status === 400) {
			notificationParam.message = error.response.data.message
			notificationParam.description = error.response.data.error.details
		}
		if (error.response.status === 404) {
			notificationParam.message = 'Not Found'
		}
	
		if (error.response.status === 500) {
			notificationParam.message = 'Internal Server Error'
		}
		
		if (error.response.status === 508) {
			notificationParam.message = 'Time Out'
		}
	
	

	notification.error(notificationParam)

	return Promise.reject(error);
});

export default service