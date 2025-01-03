import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

function BookUpdatePopup({ close, updateUserData, setUpdateUserData }) {
  console.log("data aayo ", updateUserData);

  //function update our book

  async function updateBook(e) {
    try {
      e.preventDefault();
      const result = await fetch(`/proxy/update-book/${updateUserData.id}`, {
        headers: { "content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(updateUserData),
      });
      const data = await result.json();

      if (data) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.msg || "Something went wrong");
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex items-center justify-center">
        <form
          onSubmit={updateBook}
          className="relative max-w-lg w-full bg-white p-6 rounded-md shadow-md animate-scaleAndIncreaseOpacity"
        >
          <p className="text-xl font-semibold mb-4 text-center">Update Books</p>

          <div>
            <label htmlFor="bookname">Book name:</label>

            <input
              type="text"
              className="p-2 rounded-md border w-full mt-2 outline-none focus:border-lime-500"
              placeholder="enter book name"
              id="bookname"
              autoFocus
              value={updateUserData.bookname}
              onChange={(e) =>
                setUpdateUserData({
                  ...updateUserData,
                  bookname: e.target.value,
                })
              }
            />
          </div>

          <div className="mt-2">
            <label htmlFor="authorname">Author name:</label>

            <input
              type="text"
              className="p-2 rounded-md border w-full mt-2 outline-none focus:border-lime-500"
              placeholder="enter author name"
              id="authorname"
              value={updateUserData.author}
              onChange={(e) =>
                setUpdateUserData({ ...updateUserData, author: e.target.value })
              }
            />
          </div>

          <div className="mt-2">
            <label htmlFor="date">Pulished Date:</label>

            <input
              type="date"
              className="p-2 rounded-md border w-full mt-2 outline-none focus:border-lime-500"
              placeholder="enter book date"
              id="date"
              value={
                new Date(updateUserData.publishdate).toISOString().split("T")[0]
              }
              onChange={(e) =>
                setUpdateUserData({
                  ...updateUserData,
                  publishdate: e.target.value,
                })
              }
            />
          </div>

          <div
            onClick={close}
            className=" w-fit absolute top-4 right-4 cursor-pointer"
          >
            <RxCross1 size={28} />
          </div>

          <button className="w-full px-2 py-1.5 rounded-md text-white bg-lime-600 hover:bg-lime-700 mt-4">
            Update{" "}
          </button>
        </form>
      </div>
    </>
  );
}
export default BookUpdatePopup;
