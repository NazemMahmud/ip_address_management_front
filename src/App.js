import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

function App() {
    console.log('here');
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
