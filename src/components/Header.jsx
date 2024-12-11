import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData, isAuthenticated } = useContext(AppContext);

  console.log(userData, isAuthenticated);

  return (
    <div className="w-full h-screen border border-green-500 flex items-center justify-center flex-col text-center">
      <img src={assets.header_img} className="w-32 rounded-full" alt="" />
      <h3 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mt-2">
        Hey {userData ? userData.name : "Developer"}{" "}
        <img src={assets.hand_wave} className="w-8" alt="" />{" "}
      </h3>
      <h2 className="text-3xl sm:text-5xl mt-3 font-semibold">
        Welcome to Our App
      </h2>
      <p className="mt-4 max-w-md text-center text-base">
        Les&apos;t start with a quick product tour and we will have you up and
        running in no time!
      </p>
      <button className="border border-gray-600 rounded-full px-8 py-2.5 mt-6 hover:bg-gray-100 transition">
        Get Started
      </button>
    </div>
  );
};

export default Header;
