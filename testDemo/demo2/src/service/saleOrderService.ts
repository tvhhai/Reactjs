import httpService from "./httpService";
import ApiConfig from "./apiConfig";

export const fetchCurrentListSaleOrder = async () => {
  return await httpService.get(ApiConfig.baseUrl);
};

export const addSaleOrderService = async (data: object) => {
  return await httpService.post(ApiConfig.baseUrl, data);
};

export const deleteSaleOrderService = async (id: number) => {
  return await httpService.delete(ApiConfig.baseUrl + "/" + id);
};

export const getSaleOrderByIdService = async (id: number) => {
  return await httpService.get(ApiConfig.baseUrl + "/" + id);
};

export const editSaleOrderService = async (id: number, data: object) => {
  return await httpService.put(ApiConfig.baseUrl + "/" + id, data);
};
