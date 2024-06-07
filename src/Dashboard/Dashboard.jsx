import { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { InfoContainer } from "../AuthProvider/AuthProvider";
import { FaPaperPlane, FaUser } from "react-icons/fa";
import {
  MdManageAccounts,
  MdManageHistory,
  MdManageSearch,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { IoReturnDownBackOutline } from "react-icons/io5";

export default function Dashboard() {
  const navigate = useNavigate();
  const { operator, user } = useContext(InfoContainer);

  useEffect(()=>{
    navigate('/dashboard/profile')
  },[])
  return (
    <>
      <header>
        <nav className="w-[300px] h-screen shadow-lg shadow-gray-500 fixed top-0 left-0 bg-dashNav before:bg-dashNavGradient overflow-hidden">
          <div className="w-full flex flex-col items-center py-5">
            <div className="h-[75px] w-[75px] rounded-full border-[3px] bg-white">
              <img
                src={user?.photoURL}
                alt="profileImg"
                className="h-full w-full py-1 px-1 object-cover rounded-full shadow-xl shadow-gray-500"
              />
            </div>
            <p className="badge badge-neutral mt-4">{user?.displayName}</p>
          </div>
          <div>
            <div className="flex flex-col pl-8 my-4 capitalize font-mono text-base font-medium">
              <NavLink className="flex flex-row w-full items-center mb-4 hover:translate-x-[20px] transition-all duration-500 ease-in hover:bg-sky-300 hover:text-white" to='/dashboard/profile'>
                <FaUser className="mr-4" />
                Admin profile
              </NavLink>

              <NavLink className="flex flex-row w-full items-center mb-4 hover:translate-x-[20px] transition-all duration-500 ease-in hover:bg-sky-300 hover:text-white" to="/dashboard/addScholarShip">
                <FaPaperPlane className="mr-4" />
                Add scholarship
              </NavLink>

              <NavLink className="flex flex-row w-full items-center mb-4 hover:translate-x-[20px] transition-all duration-500 ease-in hover:bg-sky-300 hover:text-white" to='/dashboard/manageScholarship'>
                <MdOutlineManageAccounts className="mr-4 text-xl" />
                Manage scholarship
              </NavLink>

              <NavLink className="flex flex-row w-full items-center mb-4 hover:translate-x-[20px] transition-all duration-500 ease-in hover:bg-sky-300 hover:text-white">
                <MdManageHistory className="mr-4 text-xl" />
                manage applied scholarship
              </NavLink>

              <NavLink className="flex flex-row w-full items-center mb-4 hover:translate-x-[20px] transition-all duration-500 ease-in hover:bg-sky-300 hover:text-white">
                <MdManageAccounts className="mr-4 text-xl" />
                manage user
              </NavLink>

              <NavLink className="flex flex-row w-full items-center mb-4 hover:translate-x-[20px] transition-all duration-500 ease-in hover:bg-sky-300 hover:text-white">
                <MdManageSearch className="mr-4 text-xl" />
                manage review
              </NavLink>
            </div>
          </div>

          <div className="w-full bg-sky-300 text-white hover:cursor-pointer" onClick={()=>{navigate('/')}}> 
            <p className="flex flex-row items-center pl-4">
            <IoReturnDownBackOutline className="mr-1"/>
            Home
            </p>
          </div>
        </nav>
      </header>

      <main className="ml-[300px]">
        <Outlet/>
      </main>
    </>
  );
}
