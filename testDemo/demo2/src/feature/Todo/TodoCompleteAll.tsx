import React from 'react';
import {Checkbox} from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

interface Props {
    isChecked: boolean,
    completeAllTodo?: (val: boolean) => void;
}

const TodoCompleteAll = ({isChecked, completeAllTodo}: Props) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        completeAllTodo?.(event.target.checked)
    };

    return (
        <div className="todoDone">
            <Checkbox checked={isChecked}
                      icon={<DoneOutlineIcon />}
                      checkedIcon={<DoneAllIcon />}
                      onChange={handleChange}
                      color="success"
                      inputProps={{'aria-label': 'controlled'}}/>
        </div>
    );
};

export default TodoCompleteAll;