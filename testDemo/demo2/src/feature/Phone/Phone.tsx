import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import AppAgGrid from "../../component/common/AppAgGrid/AppAgGrid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";

import {getPhone, getListPhone} from "./PhoneSlice";
import "./style.scss";

const Phone = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {listPhone, isLoading} = useSelector(getPhone);
    const dispatch = useDispatch<any>();
    const gridRef = React.useRef<any>();
    const [selectedRows, setSelectedRows] = React.useState([]);

    const [columnDefs] = React.useState([
        {
            field: "",
            width: 54,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            sortable: false,
            filter: false,
            pinned: "left",
        },
        {field: "name"},
        {field: "price"},
        {field: "image"},
    ]);

    const defaultColDef = {
        flex: 1,
        editable: true,
        sortable: true,
        filter: true,
        resizable: true,
    };

    const onSelectionChanged = React.useCallback(() => {
        setSelectedRows(gridRef.current.api.getSelectedRows());
    }, []);

    const onGridReady = React.useCallback((params: any) => {
        dispatch(getListPhone());
    }, []);

    const onPageSizeChanged = React.useCallback(() => {
        var value = (document.getElementById("page-size") as HTMLInputElement)
            .value;
        gridRef.current.api.paginationSetPageSize(Number(value));
    }, []);

    const handleAdd = () => {
        navigate("/phone/add");
    };

    const handleDisable = (): boolean => {
        return !(
            selectedRows &&
            selectedRows.length > 0 &&
            selectedRows.length <= 1
        );
    };

    const handleEdit = () => {
        var id = _.get(selectedRows[0], "id");
    };

    const handleDelete = () => {
        // var listId = selectedRows.map((value: any) => value.id);
        var id = _.get(selectedRows[0], "id");
        console.log(id);
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
            onClick: handleEdit,
            disable: handleDisable(),
            icon: <EditIcon/>,
            colorIcon: "success",
            // permission: Todo
        },
        delete: {
            id: "delete",
            i18nKey: "common.delete",
            onClick: handleDelete,
            disable: handleDisable(),
            icon: <DeleteIcon/>,
            colorIcon: "error",
            // permission: Todo
        },
    };

    return (
        <div>

            <AppAgGrid
                rowData={listPhone}
                gridRef={gridRef}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection={"multiple"}
                onSelectionChanged={onSelectionChanged}
                paginationPageSize={300}
                //  -----------  custom -----------------
                refresh={onGridReady}
                searchAll={true}
                title={t("phoneManager")}
                toolbarLeftAction={[action.add, action.edit, action.delete]}
                loading={isLoading}
            />
        </div>
    );
};
export default Phone;
