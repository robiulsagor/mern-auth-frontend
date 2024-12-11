/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import apiClient from "../utils/axios";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, backendUrl, getUserData } =
    useContext(AppContext);

  const [state, setState] = useState("login");
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [passType, setPassType] = useState("password");
  const showPass = () => {
    setPassType(() => (passType === "password" ? "text" : "password"));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (state === "register") {
        // error check
        if (!inputData.name || !inputData.email || !inputData.password) {
          toast.error("Please fill in all fields");
          return;
        }

        const { data } = await axios.post(
          `${backendUrl}/api/auth/register`,
          inputData
        );

        if (data.success) {
          setIsAuthenticated(true);
          toast.success("User created successfully");
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message || "Error");
        }
      }

      if (state === "login") {
        // error check
        if (!inputData.email || !inputData.password) {
          toast.error("Please fill in all fields");
          return;
        }

        const { data } = await apiClient.post("/api/auth/login", inputData);

        if (data.success) {
          setIsAuthenticated(true);
          getUserData();
          navigate("/");
          toast.success("Logged in successfully");
        } else {
          toast.error(data.message || "Error logging in");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error!", {
        id: "errorToast",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, []);

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
                name="name"
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
              name="email"
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
              type={passType}
              name="password"
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
            <img
              src={passType === "password" ? assets.eyeOpen : assets.eyeClose}
              className="w-6 cursor-pointer"
              onClick={showPass}
              alt=""
            />
          </div>

          {state === "login" && (
            <p
              onClick={() => navigate("/reset-password")}
              className="text-indigo-500 cursor-pointer hover:underline w-max"
            >
              Forgot your password?{" "}
            </p>
          )}

          <button
            type="submit"
            className="disabled:bg-red-400  bg-gradient-to-r from-indigo-300 to-indigo-800 hover:from-indigo-400 hover:to-indigo-900 transition-all w-full mt-4 py-2 rounded-full text-lg disabled:cursor-not-allowed "
            disabled={loading && true}
          >
            {loading ? "Loading..." : state === "login" ? "Login" : "Sign Up"}
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
