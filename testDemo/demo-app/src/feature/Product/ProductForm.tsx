import React from 'react';
import * as yup from "yup";

import {Button, FormControl, FormHelperText, Grid, MenuItem, Select, TextField} from "@mui/material";
import AppInputLabel from "../../component/common/InputLabel/AppInputLabel";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import {useYupValidationResolver} from "../../helper/yupHelper";
import {IProduct} from "../../model/IProduct";
import {useDispatch, useSelector} from "react-redux";
import {getListProductType, getProductType} from "../ProductType/ProductTypeSlice";
import {DISCOUNT_BY} from "../../constant/commonConstant";

import _ from "lodash";

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

    const validationSchema = yup.object().shape({
        name: yup.string().required('common.validate.requite'),
        type: yup.string().required('common.validate.requite'),
        price: yup.string().matches(/^[0-9]+$/, "common.validate.number")
            .max(9, 'common.validate.maxNumberLength').required('common.validate.requite'),
        importPrice: yup.string().matches(/^[0-9]+$/, "common.validate.number")
            .max(9, 'common.validate.maxNumberLength').required('common.validate.requite'),
        // discountValue: yup.string().when("discountBy", {
        //         is: (value: string) => value === DISCOUNT_BY[1].value,
        //         then: yup.string().test('len', 'common.validate.percentValue', (val:any) => val <= 100),
        //         otherwise: yup.string().max(9, 'common.validate.maxNumberLength')
        //     }).matches(/^[0-9]+$/, "common.validate.number")

        discountValue: yup.string().test('values-test', 'dummy message', (val: any, validationContext: any) => {
            const {
                createError,
                parent: {
                    discountBy,
                },
            } = validationContext;

            if (_.isEmpty(discountBy)) {
                return true;
            }

            if (discountBy === DISCOUNT_BY[1].value && val >= 100) {
                return createError({message: 'listType = 1, ' + val});
            } else if (discountBy === DISCOUNT_BY[2].value && val.length >= 9) {
                return createError({message: 'listType = 1, ' + val});
            } else {
                return true
            }
        })
    });

    const {register, formState} = useForm<IProduct>({
        mode: "all",
        resolver: useYupValidationResolver(validationSchema),
    });

    const {errors, isValid} = formState;

    console.log(errors)

    React.useEffect(() => {
        checkIsValidForm?.(isValid);
    }, [isValid]);

    React.useEffect(() => {
        dispatch(getListProductType());
    }, []);

    return (
        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>

            <Grid item sm={12} md={12}>
                <input type="file" accept="image/*" multiple
                       defaultValue={value.image}
                       {...register("image", {
                           onChange: async (e) => {
                               const formData = new FormData();
                               const files = e.target.files
                               for (let i = 0; i < files.length; i++) {
                                   formData.append('image', files[i])
                               }
                               setValue({...value, image: files})
                           }
                       })}

                />
                {/*</Button>*/}
                {/*<ImageUploading*/}
                {/*    multiple*/}
                {/*    value={value.image || ""}*/}
                {/*    onChange={handleChange}*/}
                {/*    maxNumber={69}*/}
                {/*    dataURLKey="data_url"*/}
                {/*>*/}
                {/*    {({*/}
                {/*          imageList,*/}
                {/*          onImageUpload,*/}
                {/*          onImageRemoveAll,*/}
                {/*          onImageUpdate,*/}
                {/*          onImageRemove,*/}
                {/*          isDragging,*/}
                {/*          dragProps,*/}
                {/*      }) => (*/}
                {/*        // write your building UI*/}
                {/*        <div className="upload__image-wrapper">*/}
                {/*            <button*/}
                {/*                style={isDragging ? {color: 'red'} : undefined}*/}
                {/*                onClick={onImageUpload}*/}
                {/*                {...dragProps}*/}
                {/*            >*/}
                {/*                Click or Drop here*/}
                {/*            </button>*/}
                {/*            &nbsp;*/}
                {/*            <button onClick={onImageRemoveAll}>Remove all images</button>*/}
                {/*            {imageList.map((image, index) => (*/}
                {/*                <div key={index} className="image-item">*/}
                {/*                    <img src={image['data_url']} alt="" width="100"/>*/}
                {/*                    <div className="image-item__btn-wrapper">*/}
                {/*                        <button onClick={() => onImageUpdate(index)}>Update</button>*/}
                {/*                        <button onClick={() => onImageRemove(index)}>Remove</button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</ImageUploading>*/}
            </Grid>

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
                    id="outlined-basic"
                    variant="outlined"
                    value={value.name || ""}
                    helperText={errors.name && t(`${errors.name.message}`)}
                    error={!!(errors.name)}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.type"} required/>
                <FormControl fullWidth error={!!(errors.type)}>
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
                    <FormHelperText>{errors.type && t(`${errors.type.message}`)}</FormHelperText>
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
                    type="tel"
                    variant="outlined"
                    value={value.importPrice || ""}
                    helperText={errors.importPrice && t(`${errors.importPrice.message}`, {length: 9})}
                    error={!!errors.importPrice}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.discountBy"}/>
                <FormControl fullWidth error={!!(errors.discountBy)}>
                    <Select
                        id="discountBy"
                        {...register("discountBy", {
                            onChange: (e) => {
                                if (!(e.target.value)) {
                                    setValue({...value, discountValue: 0})
                                }
                                setValue({...value, discountBy: e.target.value})
                            },
                        })}
                        value={value.discountBy || ""}
                    >
                        {DISCOUNT_BY.map((val: any, i: number) => (
                            <MenuItem key={i} value={val.value}>{val.title}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{errors.discountBy && t(`${errors.discountBy.message}`)}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"product.column.discountValue"}/>
                <TextField
                    fullWidth
                    // disabled={!value.discountBy}
                    id="discountValue"
                    type="tel"
                    {...register("discountValue", {
                        onChange: (e) =>
                            setValue({...value, discountValue: e.target.value}),
                    })}
                    value={value.discountValue || ""}
                    helperText={errors.discountValue && t(`${errors.discountValue.message}`, {length: 9})}
                    error={!!errors.discountValue}
                />
            </Grid>

            <Grid item sm={12} md={12}>
                <AppInputLabel i18nTitleKey={"product.column.description"}/>
                <TextField
                    fullWidth
                    id="description"
                    variant="outlined"
                    multiline
                    rows={4}

                    {...register("description", {
                        onChange: (e) =>
                            setValue({...value, description: e.target.value}),
                    })}
                    value={value.description || ""}
                    helperText={errors.description && t(`${errors.description.message}`)}
                    error={!!errors.description}
                />
            </Grid>
        </Grid>
    );
};

export default ProductForm;