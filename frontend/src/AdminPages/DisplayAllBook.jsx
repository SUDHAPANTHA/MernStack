import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookUpdatePopup from "../components/BookUpdatePopup";

function DisplayAllBook() {
  const [bookData, setBookData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [updateUserData, setUpdateUserData] = useState({
    bookname: "",
    author: "",
    publishdate: "",
    id: "",
  });

  // Function to handle popup open and close
  function handlePopup(bookname, author, publishdate, id) {
    setIsPopupOpen(!isPopupOpen);

    setUpdateUserData((prev) => ({
      ...prev,
      bookname,
      author,
      publishdate,
      id,
    }));
  }

  // Function to get the book data
  async function getBookData() {
    try {
      const result = await fetch("/proxy/get-all-books", {
        headers: { "content-type": "application/json" },
        method: "GET",
      });

      const aakoData = await result.json();

      if (aakoData) {
        console.log(aakoData);
        setBookData(aakoData.allbooksdata);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  // Function to delete a book
  async function deleteBook(id) {
    try {
      const result = await fetch(`/proxy/delete-book/${id}`, {
        headers: { "content-type": "application/json" },
        method: "DELETE",
      });

      const re = await result.json();

      if (re) {
        toast.success(re.msg);
        setBookData((prevBookData) =>
          prevBookData.filter((book) => book._id !== id)
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      <div className="bg-gray-200/40 h-screen p-4 overflow-y-scroll">
        <div className="flex items-center justify-between">
          <p className="font-bold text-4xl bg-gradient-to-r from-blue-400 to-purple-400 pb-2 w-fit text-transparent bg-clip-text">
            Display All Books
          </p>
          <span>
            Total Books:{" "}
            <span className="font-bold text-2xl">{bookData.length}</span>
          </span>
        </div>

        <table className="w-full table-auto text-white mt-4 rounded-md shadow-md">
          <thead className="bg-blue-500">
            <tr>
              <th className="p-2 text-center">Image</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Author</th>
              <th className="p-2 text-center">Genre</th>
              <th className="p-2 text-center">Pub Date</th>
              <th className="p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-black">
            {bookData.map((items) => (
              <tr key={items._id} className="bg-white even:bg-gray-200">
                <td className="p-4 w-32 h-32 text-center">
                  <img
                    src={`/proxy/images/${items.image}`}
                    alt="book-image"
                    className="w-full h-full rounded-md"
                  />
                </td>
                <td className="p-4 text-center">{items.bookname}</td>
                <td className="p-4 text-center">{items.author}</td>
                <td className="p-4 text-center">{items.genre.join(", ")}</td>
                <td className="p-4 text-center">
                  {new Date(items.publishdate).toLocaleDateString()}
                </td>
                <td className="flex justify-center items-center gap-4 p-9">
                  <button
                    onClick={() => deleteBook(items._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handlePopup(
                        items.bookname,
                        items.author,
                        items.publishdate,
                        items._id
                      )
                    }
                    className="bg-lime-500 text-white py-2 my-2 px-4 rounded-lg"
                  >
                    Update
                  </button>
                  {isPopupOpen && (
                    <BookUpdatePopup
                      close={handlePopup}
                      updateUserData={updateUserData}
                      setUpdateUserData={setUpdateUserData}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DisplayAllBook;
