import React from 'react';
import './App.scss';
import RouterConfig from "../router/RouterConfig";
import {SnackbarProvider} from "notistack";
import {Notification} from "../component/common/Notification/Notification";

function App() {
    return (
        <div className="App">
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "top"
                }}
            >
                <Notification/>  {/* TODO: Fix Render methods should be a pure function of props and state.*/}

                <RouterConfig/>
            </SnackbarProvider>
        </div>
    );
}

export default App;
