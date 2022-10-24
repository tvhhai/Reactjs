import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {increment, decrement, selectCount} from '../redux/reducer/counter'
import {Button, ButtonGroup} from "@mui/material";




const Counter = () => {
    // const counter = useSelector((state: any) => state.counter.count);
    const counter = useSelector(selectCount);
    const dispatch = useDispatch();
    return (
        <div>
            <div>
                <h1>Counter {counter}</h1>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => dispatch(decrement(counter))} variant="contained">Decrement</Button>
                    <Button onClick={() => dispatch(increment(counter))} variant="contained">Increment</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default Counter;