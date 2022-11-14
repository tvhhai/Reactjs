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
        sale: "",
        description: ""
    });
    const [isValid, setIsValid] = React.useState(true);
    const dispatch = useDispatch<any>();

    const handleClick = async () => {
        try {
            // console.log(value.image.get('image'))
            let formData = new FormData();
            console.log(value.image)
            for (let i = 0; i < value.image.length; i++) {
                formData.append('images', value.image[i])
            }
            // formData.append("images", value.image);

            formData.append('user', new Blob([JSON.stringify({
                "name": value.name,
                "price": value.price,
                "importPrice": value.importPrice,
                "sale": value.sale,
                "description": value.description,
            })], {
                type: "application/json"
            }));
            console.log(formData.get('user'), formData.get('images'))
            await dispatch(addProduct(formData));
            NotificationUtils.success('PhoneAdd phone successfully!');
        } catch (err) {
            NotificationUtils.error(err);
        }
        backPage();
    }

    const createFormData = (object: IProduct, form: any, namespace: any) => {
        const formData = new FormData();
        for (let property in object) {
            // @ts-ignore
            if (!object.hasOwnProperty(property) || !object[property]) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            // @ts-ignore
            if (object[property] instanceof Date) {
                // @ts-ignore
                formData.append(formKey, object[property].toISOString());
            } else { // @ts-ignore
                if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                    // @ts-ignore
                    createFormData(object[property], formData, formKey);
                } else {
                    // @ts-ignore
                    formData.append(formKey, object[property]);
                }
            }
        }
        return formData
    }

    const backPage = () => {
        // navigate(-1)
        dispatch(resetActionState());
    }

    const handleDisable = () => {
        // return !isValid;
        return false
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