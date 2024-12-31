import React, { useState } from "react";
import { toast } from "react-toastify";

function AddBook() {
  const [bookData, setBookData] = useState({
    bookname: "",
    author: "",
    genre: [], // Correct spelling of genre
    description: "",
    publishdate: "",
    image: null,
  });

  // Function to handle form change
  function handleFormChange(e) {
    const { name, value, type, files, checked } = e.target;

    setBookData((prev) => {
      if (type === "file") {
        return { ...prev, [name]: files[0] };
      } else if (type === "checkbox" && name === "genre") {
        const updatedGenre = checked
          ? [...prev.genre, value]
          : prev.genre.filter((gen) => gen !== value);
        return { ...prev, genre: updatedGenre };
      } else if (name === "publishdate") {
        // Ensure the date is in YYYY-MM-DD format
        const formattedDate = new Date(value).toISOString().split("T")[0];
        return { ...prev, publishdate: formattedDate };
      } else {
        return { ...prev, [name]: value };
      }
    });
  }

  // Function to handle form submit or to add a book
  async function addBook(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", bookData.image);
    formData.append("bookname", bookData.bookname);
    formData.append("author", bookData.author);
    formData.append("description", bookData.description);
    formData.append("publishdate", bookData.publishdate);

    // Ensure genre is appended correctly
    bookData.genre.forEach((gen) => formData.append("genre", gen));

    try {
      const result = await fetch("/proxy/upload-book", {
        method: "POST",
        body: formData,
      });

      const data = await result.json();

      if (data && data.status === 200) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg || "Failed to add book");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  }

  return (
    <>
      <div className="min-h-screen gap-4">
        <form
          encType="multipart/form-data"
          className="bg-gradient-to-t from-blue-100 to-purple-100 min-w-96 max-w-md h-full my-6 px-10 py-6 rounded-lg mx-auto"
          style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
          onSubmit={addBook}
        >
          <p className="mb-4 text-3xl font-semibold text-center">Add Book</p>

          <input
            onChange={handleFormChange}
            type="text"
            className="w-full p-2 rounded-md outline-none border focus:border-cyan-500 mb-4"
            placeholder="Enter book name"
            name="bookname"
          />

          <input
            onChange={handleFormChange}
            type="text"
            className="w-full p-2 rounded-md outline-none border focus:border-cyan-500 mb-4"
            placeholder="Author name"
            name="author"
          />

          <div className="flex gap-10 mb-4">
            {["Si-Fi", "Adventure", "Drama", "Comic"].map((genre) => (
              <span key={genre} className="text-center">
                {genre}
                <input
                  onChange={handleFormChange}
                  type="checkbox"
                  className="ml-2"
                  name="genre"
                  value={genre}
                />
              </span>
            ))}
          </div>

          <input
            type="date"
            className="w-full p-2 rounded-md outline-none border focus:border-cyan-500 mb-4"
            placeholder="Enter published date"
            name="publishdate"
            onChange={handleFormChange}
          />

          <textarea
            maxLength="200"
            type="text"
            className="w-full p-2 rounded-md outline-none border focus:border-cyan-500 mb-4"
            placeholder="Book Description"
            name="description"
            onChange={handleFormChange}
          />

          <div className="bg-white/90 w-full rounded-md p-2 border focus:border-cyan-500 flex">
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFormChange}
              placeholder="Upload Image"
            />
          </div>

          {bookData.image && (
            <div className="bg-gray-200/40 w-full h-60 rounded-md text-center p-4 shadow-md overflow-hidden">
              <img
                src={URL.createObjectURL(bookData.image)}
                alt="Book"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full font-semibold hover:scale-105 transition-all duration-700 ease-in-out hover:bg-lime-600">
            Add New Book
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBook;
