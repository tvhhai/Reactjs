import React from 'react';
// import { useNavigate } from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getPhoneById, editPhone, getPhone, resetActionState, getListPhone} from "./PhoneSlice";
// import { useParams } from 'react-router-dom';
import {IPhone} from "../../model/IPhone";
import {useTranslation} from "react-i18next";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import PhoneFormAction from "./PhoneFormAction";
import _ from "lodash";
import {compareObj} from "../../helper/commonHelper";
import AppLoader from "../../component/common/Loader/AppLoader";
import NotificationUtils from "../../component/common/Notification/Notification";

interface props {
    id?: number
}

const PhoneEdit = ({id}: props) => {
    const {t} = useTranslation();
    // const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const {getPhoneDetail, isLoading} = useSelector(getPhone);
    const [value, setValue] = React.useState<IPhone>(getPhoneDetail);
    const [valueBk, setValueBk] = React.useState<IPhone>(_.cloneDeep(value));
    const [isValid, setIsValid] = React.useState<boolean>();


    // const {id}: any = useParams();

    React.useEffect(() => {
        // dispatch(getPhoneById(Number(id)));
    }, []);

    React.useEffect(() => {
        if (!_.isEmpty(getPhoneDetail)) {
            setValue(getPhoneDetail)
            setValueBk(_.cloneDeep(getPhoneDetail))
        }
    }, [getPhoneDetail]);


    const handleClick = async () => {
        try {
            await dispatch(editPhone({id, value}))
            NotificationUtils.success('PhoneEdit phone successfully!');
        } catch (err) {
            NotificationUtils.error(`Edit phone failed, ${err}`);
        }
        backPage();
    }

    const backPage = () => {
        dispatch(resetActionState());
        dispatch(getListPhone());
        // navigate(-1)
    }

    const handleDisable = () => {
        return compareObj(value, valueBk) && isValid || !isValid;
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

    return (
        <CardLayout titleHeader={t('phone.edit')} btnFooter={btnAction}>
            <AppLoader isLoading={isLoading}/>
            {!_.isEmpty(value) && <PhoneFormAction value={value} setValue={setValue} checkIsValidForm={checkIsValid}/>}
        </CardLayout>
    );
};

export default PhoneEdit;