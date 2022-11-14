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
    image: string,
    importPrice: number,
    sale: string,
    description: string,
}