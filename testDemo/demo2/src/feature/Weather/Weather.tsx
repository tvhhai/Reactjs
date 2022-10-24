import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getState, getWeather } from "./WeatherSlice";

const Weather = () => {
    const weatherState = useSelector(getState);
    const dispatch = useDispatch<any>();


    React.useEffect(() => {
        dispatch(getWeather());
    }, []);






    return (
        <div>

        </div>
    );
};

export default Weather;