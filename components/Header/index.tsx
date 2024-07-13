import React, { useState } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "https://www.eventeuphoria.fun/login";
  };

  return (
    <>
      <div className="bg-dspDarkPurple my-5 mr-5 rounded-xl text-white flex justify-between items-center py-2 px-5 w-full gap-5 shadow-eventBox shadow-gray-500">
        <h1 className="font-bold text-tLg">
          <Link href="/">EventEuphoria</Link>
        </h1>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex border border-white gap-2 items-center bg-black hover:bg-dspPurple p-1 rounded-full"
          >
            <RiAdminFill className="rounded-full text-tXxl" /> Amalia{" "}
            <span className="p-2 rounded-full bg-dspDarkPurple text-white">
              <IoIosArrowDown />
            </span>
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <Link href="https://www.eventeuphoria.fun/user" passHref>
                <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  User Page
                </a>
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
