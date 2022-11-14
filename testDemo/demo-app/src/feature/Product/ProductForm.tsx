import React from 'react';
import * as yup from "yup";

import {Button, FormControl, Grid, MenuItem, Select, TextField} from "@mui/material";
import AppInputLabel from "../../component/common/InputLabel/AppInputLabel";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useYupValidationResolver} from "../../helper/yupHelper";
import {IProduct} from "../../model/IProduct";
import {useDispatch, useSelector} from "react-redux";
import {getListProductType, getProductType} from "../ProductType/ProductTypeSlice";
import {getListProduct} from "./ProductSlice";
import UploadImage from "../../component/common/Upload/UploadImage";

interface ProductProps {
    value: IProduct;
    setValue: Function;
    checkIsValidForm?: (val: boolean) => void;
}

const ProductForm = (props: ProductProps) => {
    const {value, setValue, checkIsValidForm} = props
    const {t} = useTranslation();
    const dispatch = useDispatch<any>();
    const {listProductType} = useSelector(getProductType);

    console.log(listProductType)
    const validationSchema = yup.object().shape({
        name: yup.string().required('common.validate.requite'),
        type: yup.string().required('common.validate.requite'),
        sale: yup.string().required('common.validate.requite'),
        description: yup.string().required('common.validate.requite'),
        price: yup.string().matches(/^[0-9]+$/, "common.validate.number")
            .max(9, 'common.validate.maxNumberLength').required('common.validate.requite'),
        image: yup.string().trim().required('common.validate.requite'),
    });

    const {register, formState} = useForm<IProduct>({
        mode: "all",
        resolver: useYupValidationResolver(validationSchema),
    });

    const {errors, isValid} = formState;

    React.useEffect(() => {
        checkIsValidForm?.(isValid);
    }, [isValid]);

    React.useEffect(() => {
        dispatch(getListProductType());
    }, []);

    return (
        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"common.name"} required/>
                <TextField
                    {...register("name", {
                        onChange: (e) => {
                            const name = e.target.value && e.target.value.trimLeft();
                            setValue({...value, name: name})
                        },
                    })}
                    fullWidth
                    placeholder={"Enter Name"}
                    id="outlined-basic"
                    variant="outlined"
                    value={value.name || ""}
                    helperText={errors.name && t(`${errors.name.message}`)}
                    error={!!(errors.name)}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.type"} required/>
                <FormControl fullWidth>
                    <Select
                        id="type"
                        {...register("type", {
                            onChange: (e) => setValue({...value, type: e.target.value}),
                        })}
                        value={value.type || ""}
                    >
                        {listProductType.map((val: any, i: number) => (
                            <MenuItem key={i} value={val.name}>{val.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Grid>


            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.price"} required/>
                <TextField
                    {...register("price", {
                        onChange: (e) =>
                            setValue({...value, price: Number(e.target.value)}),
                    })}
                    fullWidth
                    id="outlined-basic"
                    placeholder={"Enter Price"}
                    type="tel"
                    variant="outlined"
                    value={value.price || ""}
                    helperText={errors.price && t(`${errors.price.message}`, {length: 9})}
                    error={!!errors.price}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.importPrice"} required/>
                <TextField
                    {...register("importPrice", {
                        onChange: (e) =>
                            setValue({...value, importPrice: Number(e.target.value)}),
                    })}
                    fullWidth
                    id="outlined-basic"
                    placeholder={"Enter Price"}
                    type="tel"
                    variant="outlined"
                    value={value.importPrice || ""}
                    helperText={errors.importPrice && t(`${errors.importPrice.message}`, {length: 9})}
                    error={!!errors.importPrice}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.sale"} required/>
                <TextField
                    {...register("sale", {
                        onChange: (e) =>
                            setValue({...value, sale: e.target.value}),
                    })}
                    fullWidth
                    id="outlined-basic"
                    placeholder={"Enter Price"}
                    type="tel"
                    variant="outlined"
                    value={value.sale || ""}
                    helperText={errors.sale && t(`${errors.sale.message}`)}
                    error={!!errors.sale}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"common.image"} required/>
                <UploadImage value={value.image || ""}  {...register("image", {
                    onChange: (e) => setValue({...value, image: e.target.value}),
                })}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file"
                           value={value.image || ""}
                           {...register("image", {
                               onChange: (e) => setValue({...value, image: e.target.value}),
                           })}
                    />
                </Button>
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.description"} required/>
                <TextField
                    {...register("description", {
                        onChange: (e) =>
                            setValue({...value, description: e.target.value}),
                    })}
                    fullWidth
                    id="outlined-basic"
                    placeholder={"Enter Description"}
                    type="text"
                    variant="outlined"
                    value={value.description || ""}
                    helperText={errors.description && t(`${errors.description.message}`)}
                    error={!!errors.description}
                />
            </Grid>
        </Grid>
    );
};

export default ProductForm;