import React from "react";
import {useNavigate} from "react-router";
import {addPhone, resetState} from "./PhoneSlice";
import {useDispatch} from "react-redux";
import {showNotification} from "../../component/common/Notification/NotificationSlice";
import {IPhone} from "../../model/IPhone";
import CardLayout from "../../component/common/CardLayout/CardLayout";
import {useTranslation} from "react-i18next";
import PhoneFormAction from "./PhoneFormAction";

const PhoneAdd = () => {
        const {t} = useTranslation();
        const navigate = useNavigate();
        const [value, setValue] = React.useState<IPhone>({image: "", name: "", price: 0});
        const [isValid, setIsValid] = React.useState(true);
        const dispatch = useDispatch<any>();

        const handleClick = async () => {
            try {
                await dispatch(addPhone(value)).unwrap();
                dispatch(showNotification({message: "PhoneAdd phone successfully!", type: "success"}))
            } catch (err) {
                dispatch(showNotification({message: `PhoneAdd phone failed, ${err}`, type: "error"}))
            }
            backPage();
        }

        const backPage = () => {
            // navigate(-1)
            dispatch(resetState())
        }

        const handleDisable = () => {
            return !isValid
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
                <PhoneFormAction value={value} setValue={setValue} checkIsValidForm={checkIsValid}/>
            </CardLayout>
        );
    }
;

export default PhoneAdd;
