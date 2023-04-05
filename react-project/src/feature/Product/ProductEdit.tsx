import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import AppLoader from "../../component/common/Loader/AppLoader";
import ProductForm from "./ProductForm";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import {IProduct} from "../../model/IProduct";
import {compareDeepObj} from "../../helper/commonHelper";
import NotificationUtils from "../../component/common/Notification/Notification";
import {editProduct, getListProduct, getProduct, resetActionState} from "./ProductSlice";

interface ProductEditProps {
    id?: string
}

const ProductEdit = ({id}: ProductEditProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {getProductDetail, isLoading} = useSelector(getProduct);
    console.log(getProductDetail)
    const [value, setValue] = React.useState<IProduct>(getProductDetail);
    const [valueBk, setValueBk] = React.useState<IProduct>(_.cloneDeep(value));
    const [isValid, setIsValid] = React.useState<boolean>();

    const handleClick = async () => {
        try {
            await dispatch(editProduct({id, value}))
            NotificationUtils.success('Product Edit phone successfully!');
        } catch (err) {
            NotificationUtils.error(`Edit Product failed, ${err}`);
        }
        backPage();
    }

    const backPage = () => {
        dispatch(resetActionState());
        dispatch(getListProduct());
    }

    const handleDisable = () => {
        return compareDeepObj(value, valueBk) && isValid || !isValid;
    }

    const checkIsValid = (isValid: boolean) => {
        setIsValid(isValid)
    }
    const btnAction = [
        {
            id: "cancel",
            i18nKey: "common.btn.cancel",
            onClick: backPage,
            variant: "contained",
            color: "error",
        },
        {
            id: "add",
            i18nKey: "common.btn.edit",
            onClick: handleClick,
            disable: handleDisable(),
            variant: "contained",
            // color: null,
        }
    ]

    React.useEffect(() => {
        if (!_.isEmpty(getProductDetail)) {
            setValue(getProductDetail)
            setValueBk(_.cloneDeep(getProductDetail))
        }
    }, [getProductDetail]);

    return (
        <CardLayout titleHeader={t('phone.add')} btnFooter={btnAction}>
            <AppLoader isLoading={isLoading}/>
            <ProductForm value={value} setValue={setValue} checkIsValidForm={checkIsValid}/>
        </CardLayout>
    );
};

export default ProductEdit;