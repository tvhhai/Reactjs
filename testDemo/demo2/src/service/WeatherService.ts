import httpService from "./HttpService";
import ApiConfig from "./ApiConfig";

export const fetchCurrentWeather = async () => {
    // return await httpService.get(ApiConfig.weather);
    return await httpService.get('https://api.openweathermap.org/data/2.5/weather?q=paris,fr&units=metric&appid=2b3526b1bd25d0bdb1751e85c89badb0');
};