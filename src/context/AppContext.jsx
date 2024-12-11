import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import apiClient from "../utils/axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async () => {
    try {
      const { data } = await apiClient.post(`/api/user/data`);
      console.log(data);
      data.success ? setUserData(data.userData) : toast.error("Error");
      console.log("user data", data.success, data.userData);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error?.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    toast.success("User Logged Out!");
    navigate("/login");
  };

  const value = {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    backendUrl,
    getUserData,
    handleLogout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContextProvider, AppContext };
