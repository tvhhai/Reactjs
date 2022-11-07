import axios from "axios";
import store from '../app/store';
import NotificationUtils from "../component/common/Notification/Notification";

const {dispatch} = store;

// Create global Axios instance for CTC Backends API calls
// Timeout 3,5 sec for each requests, ref: https://stackoverflow.com/questions/266281/best-practices-for-web-service-timeouts
// Handle timeout by checking error.message.indexOf("timeout")
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 30000,
    // headers: {
    //     Authorization: 'Bearer {token}'
    // }
    // withCredentials: true
});

instance.interceptors.request.use(request => {
    // console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    NotificationUtils.error(` ${error}`);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    // console.log(response);
    // Edit response
    return response;
}, error => {
    console.log(error);
    NotificationUtils.error(` ${error}`);
    return Promise.reject(error);
});

export default instance;

