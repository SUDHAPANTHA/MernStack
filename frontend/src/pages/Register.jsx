import React, { useState } from "react";
import { toast } from "react-toastify";
import backgroundImage from "../assets/img/bg.png"; // Replace with your actual image path

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerStudent(e) {
    e.preventDefault();
    try {
      const result = await fetch("/proxy/student-register", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await result.json();
      if (data.status === 200) {
        toast.success(data.msg);
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div
        className="h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <form
          onSubmit={registerStudent}
          className="bg-gray-100/10 p-10 max-w-md mx-auto rounded-xl mt-30 shadow-lg w-full backdrop-blur-md"
        >
          <p className="text-2xl font-bold mb-4 text-center">SignUp Form</p>
          <input
            className="border border-cyan-500 p-2 mb-5 rounded-xl w-full"
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <div>
            <input
              className="border border-cyan-500 p-2 mb-5 rounded-xl w-full"
              type="email"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border border-cyan-500 p-2 mb-5 rounded-xl w-full"
              type="password"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="border border-cyan-500 p-2 mb-5 rounded-xl bg-blue-400 text-white hover:bg-blue-600 transition-all w-full">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
