import axiosConfig from "./axiosService";
import {PRODUCT_URL} from "../constant/urlConstant";
import {IProduct} from "../model/IProduct";


export const getListProductService = async () => {
    return await axiosConfig.get(PRODUCT_URL.PRODUCT);
};

export const getProductByIdService = async (id: number) => {
    return await axiosConfig.get(PRODUCT_URL.PRODUCT + '/' + id);
};

export const editProductService = async (id: number, data: IProduct) => {
    return await axiosConfig.put(PRODUCT_URL.PRODUCT + '/' + id, data);
};

export const addProductService = async (data: IProduct) => {
    return await axiosConfig.post(PRODUCT_URL.PRODUCT, data,{
        headers:{
            'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarybbEPTuzJ10qV9ugF',
        }

    });
};

export const deleteProductService = async (id: number) => {
    return await axiosConfig.delete(PRODUCT_URL.PRODUCT + '/' + id);
};

