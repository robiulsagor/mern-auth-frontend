import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between px-3 md:px-6 py-4 md:py-6 absolute top-0.5 w-full">
      <img src={assets.logo} className="w-28 sm:w-32" alt="" />
      <button
        onClick={() => navigate("/login")}
        className="border border-gray-600 rounded-full px-6 py-1.5 flex items-center gap-2 group"
      >
        Login
        <img
          src={assets.arrow_icon}
          className="group-hover:translate-x-2 transition"
          alt=""
        />
      </button>
    </div>
  );
};

export default Navbar;