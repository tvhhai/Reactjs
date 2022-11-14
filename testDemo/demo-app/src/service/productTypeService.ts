import axiosConfig from "./axiosService";
import {PRODUCT_URL} from "../constant/urlConstant";
import {IProductType} from "../model/IProductType";


export const getListProductTypeService = async () => {
    return await axiosConfig.get(PRODUCT_URL.PRODUCT_TYPE);
};

export const addProductTypeService = async (data: IProductType) => {
    return await axiosConfig.post(PRODUCT_URL.PRODUCT_TYPE, data);
};

export const deleteProductTypeService = async (id: number) => {
    return await axiosConfig.delete(PRODUCT_URL.PRODUCT_TYPE + '/' + id);
};

export const getProductTypeByIdService = async (id: number) => {
    return await axiosConfig.get(PRODUCT_URL.PRODUCT_TYPE + '/' + id);
};

export const editProductTypeService = async (id: number, data: IProductType) => {
    return await axiosConfig.put(PRODUCT_URL.PRODUCT_TYPE + '/' + id, data);
};
