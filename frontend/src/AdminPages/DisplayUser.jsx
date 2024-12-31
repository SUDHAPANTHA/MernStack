import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNavBar from "./AdminNavBar";

function DisplayAllBook() {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  async function getBookData() {
    try {
      const response = await fetch("/proxy/admin-get-books", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.allbooksdata) {
        setBooks(responseData.allbooksdata);
        setTotalBooks(responseData.allbooksdata.length);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong while fetching books");
    }
  }

  async function deleteBook(id) {
    try {
      const result = await fetch(`/proxy/delete-book/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
      });
      const response = await result.json();
      if (response) {
        toast.success(response.msg);
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
        setTotalBooks((prevTotal) => prevTotal - 1);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong while deleting book");
    }
  }

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <div className="h-screen p-4 w-full">
      <p className="font-bold text-4xl pb-2">Display All Books</p>
      <p className="text-lg mb-4">Total Books: {totalBooks}</p>

      <table className="table-auto bg-blue-600 w-full border-collapse">
        <thead>
          <tr className="text-white">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Genre</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id} className="bg-white even:bg-gray-200">
                <td className="p-2 border">{book._id}</td>
                <td className="p-2 border">{book.bookname}</td>
                <td className="p-2 border">{book.author}</td>
                <td className="p-2 border">{book.genre.join(", ")}</td>
                <td className="flex justify-center items-center gap-2 p-4">
                  <button className="bg-lime-600 text-white py-2 px-4 rounded-lg">
                    Update
                  </button>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-2 text-center">
                No books available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayAllBook;
