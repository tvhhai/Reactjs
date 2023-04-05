import React from 'react';
import {ICellRendererParams} from "ag-grid-community";

import i18n from "i18next";
import {useTranslation} from "react-i18next";

const StatusCellRender = (props: ICellRendererParams) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const {t} = useTranslation();
    return (
        <div>
            <span className={cellValue}>
                {
                    cellValue && <> {i18n.t(`common.${cellValue}`)} </>
                }
            </span>
        </div>
    );
};

export default StatusCellRender;