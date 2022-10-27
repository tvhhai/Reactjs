import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import AppAgGrid from "../../component/common/AppAgGrid/AppAgGrid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {getPhone, getListPhone, deletePhone, getPhoneById, setActionState} from "./PhoneSlice";
import {showNotification} from "../../component/common/Notification/NotificationSlice";
import _ from "lodash";
import "./style.scss";
import {AG_GRID_CHECKBOX_SELECTION} from "../../constant/commonConstant";
import ImageCellRender from "./ImageCellRender";


const Phone = () => {
        const {t} = useTranslation();
        const navigate = useNavigate();
        const {listPhone, isLoading} = useSelector(getPhone);
        const dispatch = useDispatch<any>();
        const gridRef = React.useRef<any>();
        const [selectedRows, setSelectedRows] = React.useState([]);

        const initColumnHeader = [
            AG_GRID_CHECKBOX_SELECTION,
            {field: "name", headerName: t('phone.column.name')},
            {field: "price", headerName: t('phone.column.price')},
            {field: "image", headerName: t('phone.column.image'), cellRenderer: ImageCellRender},
        ]

        const [columnDefs, setColumnDefs] = React.useState(initColumnHeader);

        // Trick switch language
        React.useEffect(() => {
            setColumnDefs(initColumnHeader)
        }, [t('phone.column.name')]);

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
            dispatch(getListPhone())
        }, []);

        const onPageSizeChanged = React.useCallback(() => {
            var value = (document.getElementById("page-size") as HTMLInputElement)
                .value;
            gridRef.current.api.paginationSetPageSize(Number(value));
        }, []);

        const handleAdd = () => {
            dispatch(setActionState({isCreate: true, isEdit: false}));
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
            let id = _.get(selectedRows[0], "id");
            dispatch(getPhoneById(id));
            dispatch(setActionState({isCreate: false, isEdit: true}));
            navigate(`/phone/edit/${id}`);
        };

        const handleDelete = async () => {
            let id = _.get(selectedRows[0], "id");
            try {
                await dispatch(deletePhone(id)).unwrap();
                dispatch(showNotification({message: "Delete phone successfully!", type: "success"}))
                dispatch(getListPhone());
            } catch (err) {
                dispatch(showNotification({message: `Delete phone failed, ${err}`, type: "error"}))
            }
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
                    paginationPageSize={5}
                    //  -----------  custom -----------------
                    refresh={onGridReady}
                    searchAll={true}
                    title={t("phone.title")}
                    toolbarLeftAction={[action.add, action.edit, action.delete]}
                    loading={isLoading}
                />
            </div>
        );
    }
;
export default Phone;
