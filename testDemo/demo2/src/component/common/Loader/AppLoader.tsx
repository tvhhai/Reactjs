import React from 'react';
import './style.scss'

interface loaderProps {
    isLoading: boolean
}

const AppLoader = (props: loaderProps) => {

    const { isLoading } = props

    return (
        <div className={`${isLoading ? "loader" : ""}`}>
            <div className={`${isLoading ? "spinner" : ""}`} />
        </div>
    );
};

export default AppLoader;