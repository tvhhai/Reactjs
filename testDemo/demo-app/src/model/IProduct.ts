export interface ProductState {
    isLoading: boolean,
    productId: string,
    listProduct: object[],
    getProductDetail: object,
    actionState: object,
    error: string
}

export interface IProduct {
    name: string,
    type: string,
    price: number,
    image: any,
    importPrice: number,
    sale: string,
    description: string,
}