import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import AddBook from "./pages/AddBook";
import Register from "./pages/Register";
import AdminDashboard from "./AdminPages/AdminDashBoard";
import AdminLogin from "./AdminPages/AdminLogin";
import DisplayUser from "./AdminPages/DisplayUser";
import AdminNavBar from "./AdminPages/AdminNavBar";
import DisplayAllBook from "./AdminPages/DisplayAllBook";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/display-user" element={<DisplayUser />} />
        <Route path="/admin-navbar" element={<AdminNavBar />} />
        <Route path="/displayallbooks" element={<DisplayAllBook />} />
      </Routes>
    </div>
  );
};

export default App;
