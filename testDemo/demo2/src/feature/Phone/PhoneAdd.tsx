import React from "react";
import { useNavigate } from "react-router";
import { addPhone, resetState } from "./PhoneSlice";
import { useDispatch, useSelector } from "react-redux";
import { IPhone } from "../../model/IPhone";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import { useTranslation } from "react-i18next";
import PhoneFormAction from "./PhoneFormAction";
import AppLoader from "../../component/common/Loader/AppLoader";
import { getPhone } from "./PhoneSlice";
import NotificationUtils from "../../component/common/Notification/Notification";

const PhoneAdd = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isLoading } = useSelector(getPhone);
    const [value, setValue] = React.useState<IPhone>({ image: "", name: "", price: 0 });
    const [isValid, setIsValid] = React.useState(true);
    const dispatch = useDispatch<any>();

    const handleClick = async () => {
        try {
            await dispatch(addPhone(value)).unwrap();
            NotificationUtils.success('PhoneAdd phone successfully!');
        } catch (err) {
            NotificationUtils.error(err);
        }
        backPage();
    }

    const backPage = () => {
        // navigate(-1)
        dispatch(resetState());
    }

    const handleDisable = () => {
        return !isValid;
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
            <AppLoader isLoading={isLoading} />
            <PhoneFormAction value={value} setValue={setValue} checkIsValidForm={checkIsValid} />
        </CardLayout>
    );
};


export default PhoneAdd;
