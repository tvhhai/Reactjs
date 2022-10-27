import httpService from "./httpService";
import ApiConfig from "./apiConfig";
import {IPhone} from "../model/IPhone";

export const fetchCurrentListPhone = async () => {
    return await httpService.get(ApiConfig.phone);
};

export const addPhonesService = async (data: IPhone) => {
    return await httpService.post(ApiConfig.phone, data);
};

export const deletePhoneService = async (id: number) => {
    return await httpService.delete(ApiConfig.phone + '/' + id);
};

export const getPhoneByIdService = async (id: number) => {
    return await httpService.get(ApiConfig.phone + '/' + id);
};

export const editPhoneService = async (id: number, data: IPhone) => {
    return await httpService.put(ApiConfig.phone + '/' + id, data);
};