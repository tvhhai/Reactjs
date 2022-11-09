import axiosConfig from "./axiosService";
import ApiConfig from "./apiConfig";

export const fetchCurrentWeather = async () => {
    // return await httpService.get(ApiConfig.weather);
    return await axiosConfig.get('https://api.openweathermap.org/data/2.5/weather?q=paris,fr&units=metric&appid=2b3526b1bd25d0bdb1751e85c89badb0');
};