import React from "react";
import {Button, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router";
import {addPhone} from "./PhoneSlice";
import {useDispatch} from "react-redux";
import {showNotification} from "../../component/common/Notification/NotificationSlice";


export interface Value {
    name: string,
    price: number,
    image: string
}

const Add = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Value>({image: "", name: "", price: 0});
    const dispatch = useDispatch<any>();

    const handleClick = async () => {
        try {
            await dispatch(addPhone(value)).unwrap();
            dispatch(showNotification({message: "Add phone successfully!", type: "success"}))
        } catch (err) {
            dispatch(showNotification({message: `Add phone failed, ${err}`, type: "error"}))
        }
        backPage();
    }

    const backPage = () => {
        navigate(-1)
    }

    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={value.name}
                        onChange={(e) => setValue({...value, name: e.target.value})}
                    />
                </Grid>
                <Grid item sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        type="number"
                        label="Price"
                        variant="outlined"
                        value={value.price}
                        onChange={(e) => setValue({...value, price: Number(e.target.value)})}
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Image"
                        variant="outlined"
                        value={value.image}
                        onChange={(e) => setValue({...value, image: e.target.value})}
                    />
                </Grid>
            </Grid>
            <div className={"d-flex align-items-center justify-content-end"}>
                <Button onClick={backPage}>Cancel</Button>
                <Button onClick={handleClick}>Add</Button>
            </div>
        </div>
    );
};

export default Add;
