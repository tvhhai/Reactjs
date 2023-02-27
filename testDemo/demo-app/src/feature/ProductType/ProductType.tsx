import React from 'react';
import AppAgGrid from "../../component/common/AgGrid/AppAgGrid";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getColumnList} from "../../helper/commonHelper";
import {getListProductType, getProductType, setActionState} from "./ProductTypeSlice";
import ProductTypeAdd from "./ProductTypeAdd";
import StatusCellRender from "../../component/common/CellRender/StatusCellRender";
import ProductTypeEdit from "./ProductTypeEdit";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";

const ProductType = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {listProductType, isLoading, actionState, productTypeId} = useSelector(getProductType);
    const [IdProductType, setIdProductType] = React.useState(productTypeId);
    const [gridApi, setGridApi] = React.useState<any>();
    const [openDialog, setOpenDialog] = React.useState(false);
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


    const handleAdd = () => {
        dispatch(setActionState({isCreate: true, isEdit: false}));
    };

    const handleEdit = () => {
        // const id = _.get(selectedRows[0], "id");
        // dispatch(getProductById(id));
        // dispatch(setProductId(id));
        // dispatch(setActionState({isCreate: false, isEdit: true}));
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
        // dispatch(deleteProduct(ids));
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
        dispatch(getListProductType());
    }, []);

    React.useEffect(() => {
        if (productTypeId) {
            setIdProductType(productTypeId);
        }
    }, [productTypeId]);

    return (
        <div>
            {actionState.isCreate && <ProductTypeAdd/>}
            {actionState.isEdit && <ProductTypeEdit id={IdProductType}/>}
            {_.isEmpty(actionState) && <AppAgGrid
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
                toolbarLeftAction={[action.add, action.edit, action.delete]}
                loading={isLoading}
            />
            }
        </div>
    );
};

export default ProductType;