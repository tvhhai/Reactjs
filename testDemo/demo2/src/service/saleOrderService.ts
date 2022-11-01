import axiosConfig from "./axiosService";
import ApiConfig from "./apiConfig";

export const fetchCurrentListSaleOrder = async () => {
  return await axiosConfig.get(ApiConfig.baseUrl);
};

export const addSaleOrderService = async (data: object) => {
  return await axiosConfig.post(ApiConfig.baseUrl, data);
};

export const deleteSaleOrderService = async (id: number) => {
  return await axiosConfig.delete(ApiConfig.baseUrl + "/" + id);
};

export const getSaleOrderByIdService = async (id: number) => {
  return await axiosConfig.get(ApiConfig.baseUrl + "/" + id);
};

export const editSaleOrderService = async (id: number, data: object) => {
  return await axiosConfig.put(ApiConfig.baseUrl + "/" + id, data);
};
