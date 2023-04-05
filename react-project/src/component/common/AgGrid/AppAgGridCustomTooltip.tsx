import React from 'react';
import {ColGroupDef, ITooltipParams} from "ag-grid-community";

const AppAgGridCustomTooltip = (props: ITooltipParams) => {
    console.log('ádasdasdasdas')
    const data = React.useMemo(
        () => props.api.getDisplayedRowAtIndex(props.rowIndex!)!.data,
        []
    );

    const valueToDisplay = props.value.value ? props.value.value : '- Missing -';

    console.log(props)
    return (
        <div className="custom-tooltip">
            <p>
                <span>Athlete's Name:</span>
            </p>
            <p>
                <span>{valueToDisplay}</span>
            </p>
        </div>
    );
};

export default AppAgGridCustomTooltip;