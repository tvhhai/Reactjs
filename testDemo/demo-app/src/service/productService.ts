import axiosConfig from "./axiosService";


export const fetchListProduct = async () => {
    return await axiosConfig.get('/api/product');
};