import axios from "axios";
import NotificationUtils from "../component/common/Notification/Notification";
import _ from "lodash";

// Create global Axios instance for CTC Backends API calls
// Timeout 3,5 sec for each requests, ref: https://stackoverflow.com/questions/266281/best-practices-for-web-service-timeouts
// Handle timeout by checking error.message.indexOf("timeout")
const instance = axios.create({
    // baseURL: 'http://localhost:8085/api',
    baseURL: 'https://springboot-mongo-app.herokuapp.com/api/',
    timeout: 30000,
    // headers: {
    //     Authorization: 'Bearer {token}'
    // }
    // withCredentials: true
});

instance.interceptors.request.use(request => {
    return request;
}, error => {
    console.log(error);
    NotificationUtils.error(_.get(error, 'request.data.message'));
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    NotificationUtils.error(_.get(error, 'response.data.message'));
    return Promise.reject(error);
});

export default instance;

