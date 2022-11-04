import React from 'react';
import './App.scss';
import RouterConfig from "../router/RouterConfig";
import  {NotificationUtilsConfigurator}  from '../component/common/Notification/Notification';
import {useLocation} from "react-router-dom";

function App() {



    return (
        <div className="App">
            <NotificationUtilsConfigurator />
            <RouterConfig/>
        </div>
    );
}

export default App;
