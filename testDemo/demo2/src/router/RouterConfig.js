import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "../component/SideBar/SideBar";
import Home from "../screen/Home";
import Test from "../screen/Test";
import Collapse from "../screen/Collapse";
import About from "../screen/About";
import Todo from "../screen/Todo";
import Login from "../screen/Login";
import Register from "../screen/Register";


function RouterConfig() {
    let user = true;
    return (
        <BrowserRouter>
            {
                user ? (
                    <Routes>
                        <Route path="/" element={<SideBar />}>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="home" element={<Home />} />
                            <Route path="test" element={<Test />} />
                            <Route path="about" element={<About />} />
                            <Route path="collapse" element={<Collapse />} />
                            <Route path="todo" element={<Todo />} />
                            <Route path="collapse1" element={<Collapse />} />
                            <Route path="collapse2" element={<Collapse />} />
                            <Route path="*" element={<Navigate to="/home" />}
                            />
                        </Route>
                    </Routes>
                )
                    :
                    (
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="*"
                                element={<Navigate to="/login" replace />}
                            />
                        </Routes>
                    )
            }
        </BrowserRouter>
    );
}

export default RouterConfig;