import axiosConfig from "./axiosService";
import apiConfig from "./apiConfig";
import {IPhone} from "../model/IPhone";

export const fetchCurrentListPhone = async () => {
    return await axiosConfig.get(apiConfig.phone);
};

export const addPhonesService = async (data: IPhone) => {
    return await axiosConfig.post(apiConfig.phone, data);
};

export const deletePhoneService = async (id: number) => {
    return await axiosConfig.delete(apiConfig.phone + '/' + id);
};

export const getPhoneByIdService = async (id: number) => {
    return await axiosConfig.get(apiConfig.phone + '/' + id);
};

export const editPhoneService = async (id: number, data: IPhone) => {
    return await axiosConfig.put(apiConfig.phone + '/' + id, data);
};