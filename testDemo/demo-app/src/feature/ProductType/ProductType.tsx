import React from 'react';
import AppAgGrid from "../../component/common/AgGrid/AppAgGrid";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getColumnList} from "../../helper/commonHelper";
import {getListProductType, getProductType} from "./ProductTypeSlice";
import ProductTypeAdd from "./ProductTypeAdd";
import StatusCellRender from "../../component/common/CellRender/StatusCellRender";

const ProductType = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {listProductType, isLoading} = useSelector(getProductType);
    const [gridApi, setGridApi] = React.useState<any>();
    const [selectedRows, setSelectedRows] = React.useState<object[]>([]);

    const columns = [
        {field: "name", headerName: t('common.name')},
        {field: "status", headerName: t('common.status'), cellRenderer: StatusCellRender}
    ]

    const [columnDefs, setColumnDefs] = React.useState(getColumnList(columns));


    const onSelectionChanged = React.useCallback(() => {
        gridApi && setSelectedRows(gridApi.getSelectedRows());
    }, [gridApi]);

    const onGridReady = React.useCallback((param: any) => {
        setGridApi(param.api);
    }, []);

    const refresh = React.useCallback(() => {
        dispatch(getListProductType());
    }, []);

    React.useEffect(() => {
        dispatch(getListProductType());
    }, []);

    return (
        <div>
            <ProductTypeAdd/>
            <AppAgGrid
                gridName="product-type"
                title={t("product.title")}
                rowData={listProductType}
                onGridReady={onGridReady}
                initialColumnDefs={columnDefs}
                onSelectionChanged={onSelectionChanged}
                //  -----------  custom -----------------
                selectMultiWithCheckbox={true}
                enableFullScreen={true}
                refresh={refresh}
                searchAll={true}
                // toolbarLeftAction={[action.add, action.edit, action.delete]}
                loading={isLoading}
            />
        </div>
    );
};

export default ProductType;