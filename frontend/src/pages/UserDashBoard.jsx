import React from "react";
import UserSideBar from "../components/UserSideBar";

function UserDashBoard() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div>
          <UserSideBar />
        </div>
        <div className="flex-1">
          <p>hello</p>
        </div>
      </div>
    </>
  );
}
export default UserDashBoard;
