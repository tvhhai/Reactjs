import React from 'react';
import AppAgGrid from "../../component/common/AgGrid/AppAgGrid";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getListProduct, getProduct, getProductById, setActionState, setProductId} from "./ProductSlice";
import {getColumnList} from "../../helper/commonHelper";
import ProductAdd from "./ProductAdd";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import _ from "lodash";
import ProductEdit from "./ProductEdit";
import AppDialog from "../../component/common/Dialog/AppDialog";
import i18n from "i18next";
import { ValueFormatterParams} from "ag-grid-community";
import {DISCOUNT_BY} from "../../constant/commonConstant";
import {tooltipValueGetter} from "../../helper/agGridHelper";


const Product = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {listProduct, isLoading, actionState, productId} = useSelector(getProduct);
    const [id, setId] = React.useState(productId);
    const [gridApi, setGridApi] = React.useState<any>();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState<object[]>([]);


    const formatterDiscountBy = (params: ValueFormatterParams) => {
        const value = DISCOUNT_BY.filter((val) => {
            return val.value === params.value;
        });
        return t(value[0].title);
    }

    const columns = [
        {field: "name", headerName: t('common.name')},
        {field: "productType", headerName: t('product.column.productType')},
        {field: "price", headerName: t('product.column.price')},
        {field: "importPrice", headerName: t('product.column.importPrice')},
        {field: "image", headerName: t('common.image'),},
        {
            field: "discountBy",
            tooltipField: '',
            headerName: t('product.column.discountBy'),
            valueFormatter: formatterDiscountBy,
            tooltipValueGetter: tooltipValueGetter,
        },
        {field: "discountValue", headerName: t('product.column.discountValue')},
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
    };

    const handleEdit = () => {
        const id = _.get(selectedRows[0], "id");
        dispatch(getProductById(id));
        dispatch(setProductId(id));
        dispatch(setActionState({isCreate: false, isEdit: true}));
    };

    const handleDelete = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleApply = () => {
        const ids = selectedRows.map((val: any) => {
            return val.id
        });
        dispatch(deleteProduct(ids));
        handleClose();
    }

    const handleDisable = (editAction: boolean) => {
        let selected;
        if (_.get(gridApi, 'getSelectedRows') && !gridApi.destroyCalled) {
            selected = gridApi.getSelectedRows();
        }
        return editAction ? !(
            selected &&
            selected.length > 0 &&
            selected.length <= 1
        ) : !(
            selected &&
            selected.length > 0
        );
    }

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
            onClick: handleEdit,
            disable: handleDisable(true),
            icon: <EditIcon/>,
            colorIcon: "success",
            // permission: Todo
        },
        delete: {
            id: "delete",
            i18nKey: "common.delete",
            onClick: handleDelete,
            disable: handleDisable(false),
            icon: <DeleteIcon/>,
            colorIcon: "error",
            // permission: Todo
        },
    };

    React.useEffect(() => {
        if (productId) {
            setId(productId);
        }
    }, [productId]);

    React.useEffect(() => {
        dispatch(getListProduct());
    }, []);

    return (
        <div className='product-wrapper'>
            {actionState.isCreate && <ProductAdd/>}
            {actionState.isEdit && <ProductEdit id={id}/>}
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

            <AppDialog i18nKeyTitle='common.delete'
                       open={openDialog}
                       closeFunction={handleClose}
                       applyFunction={handleApply}
                       textContent={i18n.t('phone.deleteMsg')}
            />
        </div>
    );
};

export default Product;