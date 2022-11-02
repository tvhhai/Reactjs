import React from "react";
import {Grid, TextField} from "@mui/material";
import {IPhone} from "../../model/IPhone";
import {useTranslation} from "react-i18next";
import AppInputLabel from "../../component/common/InputLabel/AppInputLabel";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {useYupValidationResolver} from "../../helper/yupHelper";

interface PhoneValueProps {
    value: IPhone;
    setValue: Function;
    checkIsValidForm?: (val: boolean) => void;
}

const PhoneFormAction = ({value, setValue, checkIsValidForm,}: PhoneValueProps) => {

    const {t} = useTranslation();

    const validationSchema = yup.object().shape({
        name: yup.string().required('common.validate.requite'),
        price: yup.string().matches(/^[0-9]+$/, "common.validate.number")
            .max(9, 'common.validate.maxNumberLength').required('common.validate.requite'),
        image: yup.string().required('common.validate.requite'),
    });

    const {
        register,
        formState,
    } = useForm<IPhone>({
        mode: "all",
        resolver: useYupValidationResolver(validationSchema),
    });

    const {errors, isValid} = formState;

    React.useEffect(() => {
        checkIsValidForm?.(isValid);
    }, [isValid]);

    return (
        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
            <Grid item sm={12} md={6}>
                <AppInputLabel i18nTitleKey={"phone.column.name"} required/>
                <TextField
                    {...register("name", {
                        // https://github.com/react-hook-form/react-hook-form/releases/tag/v7.16.0
                        // onChange should be in the register
                        onChange: (e) => setValue({...value, name: e.target.value}),
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
                <AppInputLabel i18nTitleKey={"phone.column.price"} required/>
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
                <AppInputLabel i18nTitleKey={"phone.column.image"} required/>
                <TextField
                    {...register("image", {
                        onChange: (e) => setValue({...value, image: e.target.value}),
                    })}
                    fullWidth
                    id="outlined-basic"
                    placeholder={"Enter Image"}
                    variant="outlined"
                    value={value.image || ""}
                    helperText={errors.image && t(`${errors.image.message}`)}
                    error={!!errors.image}
                />
            </Grid>

            {value.image && <Grid item sm={12} md={6} className='preview-img'>
                <img src={value.image} alt=""/>
            </Grid>}
        </Grid>
    );
};

export default PhoneFormAction;
