import httpService from "./HttpService";
import ApiConfig from "./ApiConfig";

export const fetchCurrentListPhone = async () => {
    return await httpService.get(ApiConfig.phone);
};

export const addPhones = async (data:any) => {
    return await httpService.post(ApiConfig.phone, data);
};