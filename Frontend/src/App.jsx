import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "react-hot-toast";
import NotFound from "./Pages/NotFound";

const App = () => {
  return (
    <div>
      <Toaster />
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
      

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* 404 - sabse last me rakhna */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
};

export default App;