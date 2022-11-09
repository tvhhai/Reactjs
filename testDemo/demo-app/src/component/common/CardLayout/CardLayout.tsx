import React from 'react';
import './style.scss'
import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

interface CardLayoutProps {
    titleHeader: string,
    children: React.ReactNode,
    className?: string,
    btnFooter?: object[],
}

const CardLayout = ({titleHeader, children, className, btnFooter}: CardLayoutProps) => {
    const {t} = useTranslation();
    return (
        <div className={`app-card ${className}`}>
            <h2 className="app-card-header">{titleHeader}</h2>
            <hr className="app-card-hr"/>
            <div className="app-card-body">
                {children}
            </div>
            <div className="app-card-footer">
                {btnFooter && <hr className="app-card-hr"/>}
                <div className="app-card-footer-btn">
                    {
                        btnFooter && btnFooter.map((v: any, i) => (
                            <Button key={i}
                                    variant={v.variant}
                                    onClick={v.onClick}
                                    color={v.color}
                                    disabled={v.disable}
                            >{t(v.i18nKey)}</Button>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CardLayout;