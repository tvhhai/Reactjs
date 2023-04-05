import React from 'react';
import { useTranslation } from "react-i18next";

function Collapse() {
    const { t } = useTranslation();
    return (
        <div className="Test">
            <h1 className="d-flex">{t('common.title')}</h1>
        </div>
    );
}

export default Collapse;