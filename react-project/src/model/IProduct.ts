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
    productType: string,
    importPrice: number,
    price: number,
    image: any,
    discountBy: string,
    discountValue: number,
    description: string,
}