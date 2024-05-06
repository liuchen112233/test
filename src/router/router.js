import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "../views/Home/Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='home' element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
        </BrowserRouter>
    );
}