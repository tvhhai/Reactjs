import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from "./i18n";
import {I18nextProvider} from "react-i18next";

import App from './app/App';
import reportWebVitals from './reportWebVitals';
import store from './app/store'
import {Provider} from 'react-redux'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        {/*<React.StrictMode>*/}
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
        {/*</React.StrictMode>*/}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
