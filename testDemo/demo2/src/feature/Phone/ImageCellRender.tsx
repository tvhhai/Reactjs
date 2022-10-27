import React from 'react';
import {ICellRendererParams} from 'ag-grid-community';

const ImageCellRender = (props: ICellRendererParams) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    return (
        <div className='app-flex-center h-100'>
            <img className='h-100' src={cellValue} alt="error"/>
        </div>
    );
};

export default ImageCellRender;