import React from 'react';
import AppAgGrid from "../../component/common/AgGrid/AppAgGrid";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getListProduct, getProduct} from "./ProductSlice";
import ImageCellRender from "../../component/common/CellRender/ImageCellRender";
import {getColumnList} from "../../helper/commonHelper";

const Product = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {listProduct, isLoading} = useSelector(getProduct);
    const [gridApi, setGridApi] = React.useState<any>();
    const [selectedRows, setSelectedRows] = React.useState<object[]>([]);

    const columns = [
        {field: "name", headerName: t('common.name'),},
        {field: "type", headerName: t('common.type')},
        {field: "price", headerName: t('product.column.price')},
        {field: "import_price", headerName: t('product.column.importPrice')},
        {field: "img", headerName: t('common.image'), cellRenderer: ImageCellRender},
        {field: "sale", headerName: t('product.column.sale')},
        {field: "description", headerName: t('product.column.description')},
    ]

    const [columnDefs, setColumnDefs] = React.useState(getColumnList(columns));






    const onSelectionChanged = React.useCallback(() => {
        gridApi && setSelectedRows(gridApi.getSelectedRows());
    }, [gridApi]);

    const onGridReady = React.useCallback((param: any) => {
        setGridApi(param.api);
    }, []);

    const refresh = React.useCallback(() => {
        dispatch(getListProduct());
    }, []);

    React.useEffect(() => {
        dispatch(getListProduct());
    }, []);

    return (
        <div className='product-wrapper'>
            <AppAgGrid
                gridName="product"
                title={t("product.title")}
                rowData={listProduct}
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

export default Product;