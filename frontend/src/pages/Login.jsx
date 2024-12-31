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
          className="bg-blue-300/20 p-10 max-w-md w-full mx-auto rounded-xl mt-30 shadow-lg backdrop-blur-md"
        >
          <p className="text-2xl mb-4 text-center">Login Page</p>
          <div>
            <input
              className="mb-5 p-2 rounded-md w-full"
              type="email"
              placeholder="Enter your mail here"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              className="mb-5 p-2 rounded-md w-full"
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
        </form>
      </div>
    </>
  );
}

export default Login;
