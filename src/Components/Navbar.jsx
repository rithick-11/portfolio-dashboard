import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { RiMessage3Fill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import useStore from "../store/useStore";
import { apiStatus } from "../store/api";

const Navbar = () => {
  const { getInitalDataStatus, vistCount, messages, getInitalData } =
    useStore();

  useEffect(() => {
    getInitalData();
  }, []);
  
  return (
    <nav className="flex items-center justify-between py-6 border-b border-white/10">
      <Link to={"/"} className="text-3xl">
        Dashboard
      </Link>
      <ul className="flex items-center gap-10">
        <li className="relative">
          <Link to="/messages" className="flex items-center gap-2">
            {" "}
            <RiMessage3Fill className="text-3xl" />{" "}
            {getInitalDataStatus === apiStatus.success && (
              <span className="block z-1 absolute bottom-4 left-3 bg-red-500 text-xs py-1 px-2 rounded-full">
                {messages?.length || 0}
              </span>
            )}
          </Link>
        </li>
        <div className="flex justify-center items-center gap-2">
          {getInitalDataStatus === apiStatus.loading && "Loading..."}
          {getInitalDataStatus === apiStatus.error && "Error"}
          {getInitalDataStatus === apiStatus.success && (
            <>
              <IoMdEye className="text-3xl" />
              <p className="text-xs">{vistCount}</p>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
