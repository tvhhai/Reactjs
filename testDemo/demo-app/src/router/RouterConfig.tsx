    import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SideBar from "../component/SideBar/SideBar";
import Collapse from "../feature/Collapse";
import Todo from "../feature/Todo/Todo";
import Weather from "../feature/Weather/Weather";
import Counter from "../feature/Counter";
import Phone from "../feature/Phone/Phone";
import PhoneAdd from "../feature/Phone/PhoneAdd";
import PhoneEdit from "../feature/Phone/PhoneEdit";
import Dashboard from "../feature/Dashboard/Dashboard";
import SignUp from "../feature/Auth/SignUp/SignUp";
import SignIn from "../feature/Auth/SignIn/SignIn";
import Product from "../feature/Product/Product";
import ProductType from "../feature/ProductType/ProductType";


function RouterConfig() {
    let user = true;

    return (
        <BrowserRouter>
            {
                user ? (
                        <Routes>
                            <Route path="/" element={<SideBar/>}>
                                <Route path="/" element={<Navigate to="/dashboard"/>}/>
                                <Route path="dashboard" element={<Dashboard/>}/>
                                <Route path="collapse" element={<Collapse/>}/>
                                <Route path="todo" element={<Todo/>}/>
                                <Route path="weather" element={<Weather/>}/>
                                <Route path="counter" element={<Counter/>}/>
                                <Route path="phone" element={<Phone/>}/>
                                <Route path="phone/add" element={<PhoneAdd/>}/>
                                <Route path="phone/edit/:id" element={<PhoneEdit/>}/>

                                <Route path="product" element={<Product/>}/>
                                <Route path="product-type" element={<ProductType/>}/>


                                <Route path="*" element={<Navigate to="/dashboard"/>}
                                />
                            </Route>
                        </Routes>
                    )
                    :
                    (
                        <Routes>
                            <Route path="/sign-in" element={<SignIn/>}/>
                            <Route path="/sign-up" element={<SignUp/>}/>
                            <Route
                                path="*"
                                element={<Navigate to="/sign-in" replace/>}
                            />
                        </Routes>
                    )
            }
        </BrowserRouter>
    );
}

export default RouterConfig;