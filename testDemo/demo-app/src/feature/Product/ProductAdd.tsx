import React from 'react';
import AppLoader from "../../component/common/Loader/AppLoader";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import NotificationUtils from "../../component/common/Notification/Notification";
import {addProduct, getProduct, resetActionState} from "./ProductSlice";
import {IProduct} from "../../model/IProduct";
import ProductForm from "./ProductForm";


const ProductAdd = () => {
    const {t} = useTranslation();
    const {isLoading} = useSelector(getProduct);
    const [value, setValue] = React.useState<IProduct>({
        name: "",
        image: "",
        type: "",
        price: 0,
        importPrice: 0,
        discountBy: "",
        discountValue: 0,
        description: ""
    });
    const [isValid, setIsValid] = React.useState(true);
    const dispatch = useDispatch<any>();

    const handleClick = () => {
        try {
            console.log(createFormData(value))
            dispatch(addProduct(createFormData(value)));
            NotificationUtils.success('PhoneAdd phone successfully!');
        } catch (err) {
            NotificationUtils.error(err);
        }
        backPage();
    }

    const createFormData = (value: IProduct) => {
        const formData = new FormData();
        for (let i = 0; i < value.image.length; i++) {
            formData.append('images', value.image[i])
        }

        formData.append('user', new Blob([JSON.stringify({
            "name": value.name,
            "productType": value.type,
            "price": value.price,
            "importPrice": value.importPrice,
            "discountBy": value.discountBy,
            "discountValue": value.discountValue,
            "description": value.description,
        })], {
            type: "application/json"
        }));
        return formData
    }

    const backPage = () => {
        // navigate(-1)
        dispatch(resetActionState());
    }

    const handleDisable = () => {
        return !isValid;
        // return false
    }

    const checkIsValid = (isValid: boolean) => {
        setIsValid(isValid);
    }
    const btnAction = [
        {
            id: "cancel",
            i18nKey: "common.btn.cancel",
            onClick: backPage,
            variant: "contained",
            color: "inherit",
        },
        {
            id: "add",
            i18nKey: "common.btn.add",
            onClick: handleClick,
            variant: "contained",
            disable: handleDisable(),
        }
    ]
    return (
        <CardLayout titleHeader={t('phone.add')} btnFooter={btnAction}>
            <AppLoader isLoading={isLoading}/>
            <ProductForm value={value} setValue={setValue} checkIsValidForm={checkIsValid}/>
        </CardLayout>
    );
};

export default ProductAdd;