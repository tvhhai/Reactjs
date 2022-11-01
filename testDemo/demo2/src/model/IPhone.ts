export interface IPhone {
    name: string,
    price: number,
    image: string
}

export interface PhoneState {
    isLoading: boolean,
    phoneId: any,
    listPhone: object[],
    getPhoneDetail: object,
    actionState: object,
    error: string

}