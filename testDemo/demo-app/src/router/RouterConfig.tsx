import React from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import SideBar from "../component/SideBar/SideBar";
import Home from "../feature/Home";
import Collapse from "../feature/Collapse";
import About from "../feature/About";
import Todo from "../feature/Todo/Todo";
import Login from "../feature/Login";
import Register from "../feature/Register";
import Weather from "../feature/Weather/Weather";
import Counter from "../feature/Counter";
import Phone from "../feature/Phone/Phone";
import PhoneAdd from "../feature/Phone/PhoneAdd";
import PhoneEdit from "../feature/Phone/PhoneEdit";


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
                            <Route path="about" element={<About />} />
                            <Route path="collapse" element={<Collapse />} />
                            <Route path="todo" element={<Todo />} />
                            <Route path="weather" element={<Weather />} />
                            <Route path="counter" element={<Counter />} />
                            <Route path="phone" element={<Phone />} />
                            <Route path="phone/add" element={<PhoneAdd />} />
                            <Route path="phone/edit/:id" element={<PhoneEdit />} />
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