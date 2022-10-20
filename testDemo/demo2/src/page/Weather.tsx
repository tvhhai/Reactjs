import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getState, getWeather } from "../redux/reducer/WeatherSlice";

const Weather = () => {
    const a = useSelector(getState);
    console.log(a)
    const dispatch = useDispatch<any>();

    React.useEffect(() => {
        dispatch(getWeather())
    }, []);


    return (
        <div>
            {/*{a}*/}
        </div>
    );
};

export default Weather;