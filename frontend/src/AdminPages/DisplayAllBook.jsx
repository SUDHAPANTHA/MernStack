import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DisplayAllBook() {
  const [bookData, setBookData] = useState([]);

  // Function to fetch all books
  async function getBookData() {
    try {
      const result = await fetch("/proxy/get-all-books", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
      });

      const responseData = await result.json();

      if (responseData) {
        console.log(responseData);
        setBookData(responseData.allbooksdata);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch books");
    }
  }

  // Function to delete a book by ID
  async function deleteBook(id) {
    try {
      const result = await fetch(`/proxy/delete-book/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });

      const responseData = await result.json();

      if (responseData.status === 200) {
        toast.success(responseData.msg);
        // Immediately update the state to remove the deleted book
        setBookData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        toast.error(responseData.msg || "Failed to delete book");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting the book");
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    getBookData();
  }, []);

  return (
    <div className="bg-gray-200/40 h-screen p-4 overflow-y-scroll">
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold text-4xl bg-gradient-to-r from-blue-400 to-purple-400 pb-2 w-fit text-transparent bg-clip-text">
          Display All Books
        </p>
        <span>
          Total Books:{" "}
          <span className="font-bold text-2xl">{bookData.length}</span>
        </span>
      </div>

      <table className="w-full table-auto border border-gray-300 shadow-md rounded-lg bg-white">
        <thead className="bg-blue-500 text-white text-left">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Author</th>
            <th className="p-3">Genre</th>
            <th className="p-3">Publication Date</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookData.map((item) => (
            <tr key={item._id} className="even:bg-gray-100 hover:bg-gray-200">
              <td className="p-3">
                <img
                  src={`/proxy/images/${item.image}`}
                  alt="book"
                  className="w-20 h-20 object-cover rounded-md"
                />
              </td>
              <td className="p-3">{item.bookname}</td>
              <td className="p-3">{item.author}</td>
              <td className="p-3">{item.genre.join(",")}</td>
              <td className="p-3">
                {new Date(item.publishdate).toLocaleDateString()}
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-4">
                  <button className="bg-lime-500 hover:bg-lime-600 text-white py-1 px-3 rounded-lg">
                    Update
                  </button>
                  <button
                    onClick={() => deleteBook(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg"
                  >
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

export default DisplayAllBook;
