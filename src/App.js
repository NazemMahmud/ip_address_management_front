import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import IpAddress from "./pages/IpAddress";
import PageNotFound from "./pages/PageNotFound";
import AuditLog from "./pages/AuditLog";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/ip-address" element={<IpAddress />} />
                <Route path="/audit-log" element={<AuditLog />} />
                <Route path="/" element={<IpAddress />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
