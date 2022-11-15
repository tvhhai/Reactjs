import React from 'react';
import AppAgGrid from "../../component/common/AgGrid/AppAgGrid";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getListProduct, getProduct, setActionState} from "./ProductSlice";
import ImageCellRender from "../../component/common/CellRender/ImageCellRender";
import {getColumnList} from "../../helper/commonHelper";
import ProductAdd from "./ProductAdd";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import _ from "lodash";

const Product = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {listProduct, isLoading, actionState} = useSelector(getProduct);
    const [gridApi, setGridApi] = React.useState<any>();
    const [selectedRows, setSelectedRows] = React.useState<object[]>([]);

    const columns = [
        {field: "name", headerName: t('common.name'),},
        {field: "productType", headerName: t('product.column.type')},
        {field: "price", headerName: t('product.column.price')},
        {field: "importPrice", headerName: t('product.column.importPrice')},
        {field: "image", headerName: t('common.image'), },
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

    const handleAdd = () => {
        dispatch(setActionState({isCreate: true, isEdit: false}));
        // navigate("/phone/add");
    };

    const action = {
        add: {
            id: "add",
            i18nKey: "common.add",
            onClick: handleAdd,
            disable: false,
            icon: <AddIcon/>,
            // permission: Todo
        },
        edit: {
            id: "edit",
            i18nKey: "common.edit",
            // onClick: handleEdit,
            // disable: handleDisable(),
            icon: <EditIcon/>,
            colorIcon: "success",
            // permission: Todo
        },
        delete: {
            id: "delete",
            i18nKey: "common.delete",
            // onClick: handleDelete,
            // disable: handleDisable(),
            icon: <DeleteIcon/>,
            colorIcon: "error",
            // permission: Todo
        },
    };

    React.useEffect(() => {
        dispatch(getListProduct());
    }, []);

    return (
        <div className='product-wrapper'>
            {actionState.isCreate && <ProductAdd/>}
            {_.isEmpty(actionState) && <AppAgGrid
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
                toolbarLeftAction={[action.add, action.edit, action.delete]}
                loading={isLoading}
            />}
        </div>
    );
};

export default Product;