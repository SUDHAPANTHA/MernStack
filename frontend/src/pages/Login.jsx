import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImage from "../assets/img/bg.png"; // Update the path to your image file
import NavBar from "../components/NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginStudent(e) {
    e.preventDefault();
    try {
      const result = await fetch("/proxy/student-login", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await result.json();
      if (data.status === 200) {
        toast.success(data.msg);
        navigate("/");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <NavBar />
        <form
          onSubmit={loginStudent}
          className="bg-white p-10 max-w-md w-full mx-auto rounded-xl mt-30 shadow-lg"
        >
          <p className="text-2xl mb-4 text-center">
            <a href="/" className=" hover:text-blue-800">
              Login Page
            </a>
          </p>
          <div>
            <input
              className="mb-5 p-2 rounded-md w-full border border-gray-300 focus:ring-2 focus:ring-light-blue-500 focus:border-light-blue-500"
              type="email"
              placeholder="Enter your mail here"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              className="mb-5 p-2 rounded-md w-full border border-blue-300 focus:ring-2 focus:ring-light-blue-500 focus:border-light-blue-500"
              type="password"
              placeholder="Enter Your Password here"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button className="bg-blue-500 mb-5 p-2 rounded-md w-full text-white text-xl hover:bg-blue-600 transition-all">
              Login
            </button>
          </div>
          <div className="flex text-center gap-32">
            <div className="text-center">
              <a
                href="/forgot-password"
                className="hover:text-blue-800 text-md"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <a href="/admin-login" className="hover:text-blue-800 text-md">
                Admin Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
