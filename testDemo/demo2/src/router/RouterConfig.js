import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "../component/SideBar/SideBar";
import Home from "../page/Home";
import Test from "../page/Test";
import Collapse from "../page/Collapse";
import About from "../page/About";
import Todo from "../page/Todo";
import Login from "../page/Login";
import Register from "../page/Register";
import Weather from "../page/Weather";
import Counter from "../page/Counter";


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
                            <Route path="weather" element={<Weather />} />
                            <Route path="counter" element={<Counter />} />
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