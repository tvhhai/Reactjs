import React from 'react';
import './App.scss';
import RouterConfig from "../router/RouterConfig";
import { NotificationUtilsConfigurator } from '../component/common/Notification/Notification';

function App() {
  return (
    <div className="App">
      <NotificationUtilsConfigurator />
      <RouterConfig />
    </div>
  );
}

export default App;
