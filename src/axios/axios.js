import axios from 'axios';
import store from '../store/store.js';
// axios request 拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
	if (store.state.token) {
		config.headers.Authorization = store.state.token;
	}
	// Do something before request is sent
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	// Do something with response data
	return response;
}, function (error) {
	// Do something with response error
	return Promise.reject(error);
});

console.log(store.state);
