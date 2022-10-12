import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.scss';

import SideBar from '../component/SideBar/SideBar';

import Home from '../screen/Home';
import About from "../screen/About";
import Test from '../screen/Test';
import { Collapse } from '@mui/material';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SideBar />}>
                        <Route index element={<Home />} />
                        <Route path="test" element={<Test />} />
                        <Route path="about" element={<About />} />
                        <Route path="collapse" element={<Collapse />} />
                        <Route path="collapse1" element={<Collapse />} />
                        <Route path="collapse2" element={<Collapse />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>

    );
}

export default App;
