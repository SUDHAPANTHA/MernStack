import React from "react";
import AdminNavBar from "./AdminNavBar";
// import { Route } from "react-router-dom";
// import DisplayAllBook from "./DisplayAllBook";

function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div>
          <AdminNavBar />
        </div>
        <div className="flex-1">
          <p>hello</p>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
