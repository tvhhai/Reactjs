import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    root: {
        minWidth: 0,
        "&.MuiButtonBase-root": {
            minWidth: 0,
        },
        "&.Mui-disabled": {
            pointerEvents: "auto"
        }
    }
});