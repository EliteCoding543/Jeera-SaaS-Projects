import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from "react-hot-toast";

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
    </Routes>
    </div>
  );
};

export default App;