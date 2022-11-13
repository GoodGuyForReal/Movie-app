import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoIcon from "./assets/LogoIcon";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../FireBase";
import { async } from "@firebase/util";


const Navbar = () => {
  const { user, LogOut } = UserAuth();
  const navigate = useNavigate();

  const HandleSignOut = async () => {

    try {
      LogOut(auth)
      navigate('/')
    } catch (error) {

    }
  };

  return (
    <div className="fixed top-0 right-0 left-0 mx-auto z-[100] py-0">

      <nav className="bg-[#0000003f]  backdrop-blur-sm border-gray-200 px-20 sm:px-4 py-1 rounded">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <NavLink to={'/'} className="flex items-center">
            <h1 className="text-[24px] text-white font-bold flex items-center gap-2"><LogoIcon />LOOPY</h1>
          </NavLink>
          <div className="flex" id="navbar-default">

            {!user?.email ? <ul className="flex gap-4 items-center text-white p-1 ">

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
              </li>

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/Discover'} className="block py-2 pr-4 pl-3">Discover</NavLink>
              </li>

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/SignUp'} className="block py-2 pr-4 pl-3">SignUp</NavLink>
              </li>

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/SignIn'} className="block py-2 pr-4 pl-3">SignIn</NavLink>
              </li>

            </ul> : <ul className="flex gap-4 items-center text-white p-1 ">

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/'} className="block py-2 pr-4 pl-3" aria-current="page">Home</NavLink>
              </li>

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/Discover'} className="block py-2 pr-4 pl-3">Discover</NavLink>
              </li>

              <li className="hover:text-[#dbdbdb]">
                <NavLink to={'/Account'} className="block py-2 pr-4 pl-3">Account: {user?.email}</NavLink>
              </li>

              <li className="hover:text-[#dbdbdb]">
                <button onClick={HandleSignOut}>Sign Out</button>
              </li>

            </ul>}



          </div>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;
