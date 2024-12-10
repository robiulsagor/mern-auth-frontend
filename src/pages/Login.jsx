import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Submitting...");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 to-purple-400 flex items-center justify-center">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        className="w-28 sm:w-32 absolute top-5 left-5 cursor-pointer"
        alt=""
      />

      <div className="bg-gray-900 px-10 py-9 rounded text-slate-200 w-[400px]">
        <h2 className="text-3xl font-semibold text-center mb-1.5">
          {state === "login" ? "Login" : "Create Account"}
        </h2>
        <p className="text-center mb-8">
          {state === "login"
            ? "Login to your account"
            : "Create an Account for you"}
        </p>

        <form onSubmit={submitHandler}>
          {/* full name */}
          {state === "register" && (
            <div className="mt-6 mb-5 flex items-center bg-gray-700 px-4 py-2 rounded-full">
              <img src={assets.person_icon} className="w-4" alt="" />
              <input
                type="text"
                value={inputData.name}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    name: e.target.value,
                  })
                }
                className="outline-none w-full bg-transparent pl-4"
                placeholder="Enter full name"
                required={true}
              />
            </div>
          )}

          {/* email */}
          <div className=" mb-5 flex items-center bg-gray-700 px-4 py-2 rounded-full">
            <img src={assets.mail_icon} className="w-4" alt="" />
            <input
              type="email"
              value={inputData.email}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  email: e.target.value,
                })
              }
              className="outline-none w-full bg-transparent pl-4"
              placeholder="Enter Email Id"
              required
            />
          </div>

          {/* password */}
          <div className=" mb-4 flex items-center bg-gray-700 px-4 py-2 rounded-full">
            <img src={assets.lock_icon} className="w-4" alt="" />
            <input
              type="password"
              value={inputData.password}
              onChange={(e) =>
                setInputData({
                  ...inputData,
                  password: e.target.value,
                })
              }
              className="outline-none w-full bg-transparent pl-4"
              placeholder="Enter Password"
              required
            />
          </div>

          {state === "login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-indigo-500 cursor-pointer hover:underline"
            >
              Forgot your password?{" "}
            </p>
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-300 to-indigo-800 hover:from-indigo-400 hover:to-indigo-900 transition-all w-full mt-4 py-2 rounded-full text-lg"
          >
            {state === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {state === "login" ? (
          <p className="mt-5 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="underline text-indigo-500 cursor-pointer"
            >
              Create One
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="underline text-indigo-500 cursor-pointer"
            >
              Login Now
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
