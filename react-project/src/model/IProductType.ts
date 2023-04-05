export interface IProductType {
    name: string,
    value: string,
    status: string
}

export interface IProductTypeState {
    isLoading: boolean,
    productTypeId: string,
    listProductType: object[],
    getProductTypeDetail: object,
    actionState: object,
    error: string
}