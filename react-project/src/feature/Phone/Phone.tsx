import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import AppAgGrid from "../../component/common/AgGrid/AppAgGrid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getPhone,
    getListPhone,
    deletePhone,
    getPhoneById,
    setActionState,
    setPhoneId,
} from "./PhoneSlice";
import _ from "lodash";
import "./style.scss";
import ImageCellRender from "../../component/common/CellRender/ImageCellRender";
import PhoneAdd from "./PhoneAdd";
import PhoneEdit from "./PhoneEdit";
import NotificationUtils from '../../component/common/Notification/Notification';
import AppDialog from "../../component/common/Dialog/AppDialog";
import i18n from "i18next";
import {getColumnList} from "../../helper/commonHelper";


const Phone = () => {
        const {t} = useTranslation();
        const {listPhone, isLoading, actionState, phoneId} = useSelector(getPhone);
        const dispatch = useDispatch<any>();
        const [selectedRows, setSelectedRows] = React.useState<object[]>([]);
        const [id, setId] = React.useState(phoneId);
        const [openDialog, setOpenDialog] = React.useState(false);
        const [gridApi, setGridApi] = React.useState<any>();

        const columns = [
            {field: "name", headerName: t('phone.column.name')},
            {field: "price", headerName: t('phone.column.price')},
            {field: "image", headerName: t('phone.column.image'), cellRenderer: ImageCellRender},
        ]

        const [columnDefs, setColumnDefs] = React.useState(getColumnList(columns));

        const defaultColDef = {
            flex: 1,
            editable: false,
            sortable: true,
            filter: true,
            resizable: true,
        };

        const onSelectionChanged = React.useCallback(() => {
            gridApi && setSelectedRows(gridApi.getSelectedRows());
        }, [gridApi]);

        const onGridReady = React.useCallback((param: any) => {
            setGridApi(param.api);
        }, []);

        const refresh = React.useCallback(() => {
            dispatch(getListPhone());
        }, []);

        const handleAdd = () => {
            dispatch(setActionState({isCreate: true, isEdit: false}));
            // navigate("/phone/add");
        };

        const handleDisable = (): boolean => {
            let selected;
            if (_.get(gridApi, 'getSelectedRows') && !gridApi.destroyCalled) {
                selected = gridApi.getSelectedRows();
            }
            return !(
                selected &&
                selected.length > 0 &&
                selected.length <= 1
            );
        };

        const handleEdit = () => {
            const id = _.get(selectedRows[0], "id");
            // setId(id)
            dispatch(getPhoneById(id));
            dispatch(setPhoneId(id));
            dispatch(setActionState({isCreate: false, isEdit: true}));
            // navigate(`/phone/edit/${id}`);
        };

        const handleDelete = async () => {
            setOpenDialog(true);
        };

        const handleClose = () => {
            setOpenDialog(false);
        };

        const handleApply = async () => {
            const id = _.get(selectedRows[0], "id");
            try {
                await dispatch(deletePhone(id)).unwrap();
                NotificationUtils.success('Success');
                // dispatch(getListPhone());
            } catch (err) {
                NotificationUtils.error(err);
            } finally {
                handleClose()
            }
        }

        React.useEffect(() => {
            dispatch(getListPhone());
        }, []);

        React.useEffect(() => {
            if (phoneId) {
                setId(phoneId);
            }
        }, [phoneId]);

        // Trick switch language
        React.useEffect(() => {
            setColumnDefs(columns);
        }, [t('phone.column.name')]);

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
            <div className='phone-wrapper'>
                {actionState.isCreate && <PhoneAdd/>}
                {actionState.isEdit && <PhoneEdit id={id}/>}
                {_.isEmpty(actionState) && <AppAgGrid
                    gridName="agGrid-phoneManager"
                    rowData={listPhone}
                    onGridReady={onGridReady}
                    initialColumnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onSelectionChanged={onSelectionChanged}
                    //  -----------  custom -----------------
                    selectMultiWithCheckbox={false}
                    selectSingleWithoutCheckbox={true}
                    enableFullScreen={true}
                    refresh={refresh}
                    searchAll={true}
                    title={t("phone.title")}
                    toolbarLeftAction={[action.add, action.edit, action.delete]}
                    loading={isLoading}
                />
                }

                <AppDialog i18nKeyTitle='common.delete'
                           open={openDialog}
                           closeFunction={handleClose}
                           applyFunction={handleApply}
                           textContent={i18n.t('phone.deleteMsg')}
                />
            </div>
        );
    }
;
export default Phone;
