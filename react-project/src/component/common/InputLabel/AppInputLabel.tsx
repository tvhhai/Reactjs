import React from 'react';
import {InputLabel} from "@mui/material";
import {useTranslation} from "react-i18next";

import './style.scss'

interface AppInputLabelProps {
    i18nTitleKey: string,
    required?: boolean
}

const AppInputLabel = ({i18nTitleKey, required}: AppInputLabelProps) => {
    const {t} = useTranslation();
    return (
        <InputLabel className="app-label-input">
            {t(i18nTitleKey)}
            {required ? <span className='required'>*</span> : <></>}
        </InputLabel>
    );
};

export default AppInputLabel;