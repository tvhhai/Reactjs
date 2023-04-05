import axiosConfig from "./axiosService";
import {AG_GRID_URL} from "../constant/urlConstant";


export const getTableConfigService = (tableId: string) => {
    return axiosConfig.get(AG_GRID_URL.TABLE_CONFIG_URL + '/' + tableId);
};

export const saveTableConfigService = async (data: object) => {
    return await axiosConfig.post(AG_GRID_URL.TABLE_CONFIG_URL, data);
};

export const updateTableConfigService = async (tableId: string, data: object) => {
    return await axiosConfig.put(AG_GRID_URL.TABLE_CONFIG_URL + '/' + tableId, data);
};