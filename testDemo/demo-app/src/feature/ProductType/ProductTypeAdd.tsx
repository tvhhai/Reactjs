import React from 'react';
import {addProductType, getProductType,} from "./ProductTypeSlice";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {IProductType} from '../../model/IProductType';
import AppLoader from "../../component/common/Loader/AppLoader";
import NotificationUtils from "../../component/common/Notification/Notification";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import ProductTypeFormAction from "./ProductTypeFormAction";
import {TextField} from "@mui/material";


const ProductTypeAdd = () => {
    const {t} = useTranslation();
    const {isLoading} = useSelector(getProductType);
    const [value, setValue] = React.useState<IProductType>({name: "", value: "", status: ''});
    const dispatch = useDispatch<any>();

    const handleClick = () => {
        console.log(value)
        dispatch(addProductType(value)).unwrap();
        // NotificationUtils.success('PhoneAdd phone successfully!');
        // backPage();
    }

    const backPage = () => {
        // navigate(-1)
        // dispatch(resetActionState());
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
            // disable: handleDisable(),
        }
    ]
    return (
        <CardLayout titleHeader={t('phone.add')} btnFooter={btnAction}>
            {/*<AppLoader isLoading={isLoading}/>*/}

            <TextField
                onChange={(e) => {
                    const name = e.target.value && e.target.value.trimLeft();
                    setValue({...value, name: name})
                }}
                fullWidth
                placeholder={"Enter Name"}
                id="outlined-basic"
                variant="outlined"
                value={value.name || ""}
            />
            <ProductTypeFormAction/>
        </CardLayout>
    );
};

export default ProductTypeAdd;