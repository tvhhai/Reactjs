import axiosConfig from "./axiosService";
import {AG_GRID_URL} from "../constant/urlConstant";


export const getTableConfigService = async (tableId: string) => {
    return await axiosConfig.get(AG_GRID_URL.TABLE_CONFIG_URL + '/' + tableId);
};

export const saveTableConfig = async (data: object[]) => {
    return await axiosConfig.post(AG_GRID_URL.TABLE_CONFIG_URL, data);
};