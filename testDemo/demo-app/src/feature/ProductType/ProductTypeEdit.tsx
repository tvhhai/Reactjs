import React from 'react';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {editProductType, getListProductType, getProductType, resetActionState} from "./ProductTypeSlice";
import NotificationUtils from "../../component/common/Notification/Notification";
import {compareDeepObj} from "../../helper/commonHelper";
import {IProductType} from "../../model/IProductType";

interface ProductTypeEditProps {
    id?: string
}

const ProductTypeEdit = ({id}: ProductTypeEditProps) => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {getProductTypeDetail, isLoading} = useSelector(getProductType);

    const [value, setValue] = React.useState<IProductType>(getProductTypeDetail);
    const [valueBk, setValueBk] = React.useState<IProductType>(_.cloneDeep(value));
    const [isValid, setIsValid] = React.useState<boolean>();

    const handleClick = async () => {
        try {
            await dispatch(editProductType({id, value}))
            NotificationUtils.success('Product Edit phone successfully!');
        } catch (err) {
            NotificationUtils.error(`Edit Product failed, ${err}`);
        }
        backPage();
    }

    const backPage = () => {
        dispatch(resetActionState());
        dispatch(getListProductType());
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
        if (!_.isEmpty(getProductTypeDetail)) {
            setValue(getProductTypeDetail)
            setValueBk(_.cloneDeep(getProductTypeDetail))
        }
    }, [getProductTypeDetail]);

    return (
        <div>

        </div>
    );
};

export default ProductTypeEdit;