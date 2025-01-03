import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DisplayUser() {
  const [data, setData] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);

  // Function to get student data
  async function getStudentData() {
    try {
      const result = await fetch("/proxy/admin-get-student", {
        headers: { "content-type": "application/json" },
        method: "GET",
      });

      const recivedData = await result.json();
      console.log(recivedData);
      setData(recivedData.studentdata);
      setTotalStudent(recivedData.totalStudent);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  }

  // Function to delete user
  async function deleteUser(id) {
    try {
      const result = await fetch(`/proxy/delete-user/${id}`, {
        headers: { "content-type": "application/json" },
        method: "DELETE",
      });

      const re = await result.json();

      if (re) {
        toast.success(re.msg);
        setData(data.filter((items) => items.id !== id));
        setTotalStudent(totalStudent - 1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  }

  // UseEffect hook to call the function on page render
  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="font-bold text-4xl bg-gradient-to-r from-blue-500 to-green-500 pb-2 w-fit text-transparent bg-clip-text">
          Display All Users
        </p>
        <span className="text-xl font-semibold">
          Total Students:{" "}
          <span className="font-bold text-2xl text-blue-600">
            {totalStudent}
          </span>
        </span>
      </div>

      <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="p-4 border border-blue-700">Id</th>
            <th className="p-4 border border-blue-700">Name</th>
            <th className="p-4 border border-blue-700">Email</th>
            <th className="p-4 border border-blue-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items, index) => (
            <tr
              key={items.id}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-blue-100`}
            >
              <td className="p-4 border border-gray-300">{items.id}</td>
              <td className="p-4 border border-gray-300">{items.name}</td>
              <td className="p-4 border border-gray-300">{items.email}</td>
              <td className="p-4 border border-gray-300">
                <div className="flex gap-3">
                  <button
                    onClick={() => deleteUser(items.id)}
                    className="bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Update
                  </button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayUser;
