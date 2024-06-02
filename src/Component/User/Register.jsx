import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "animate.css"

export default function Login({oldOrNew,conValue}) {
    const [condition,setCondition] = useState(true);
  return (
    <>
      <div className={`mt-[100px] mx-auto w-[70%] shadow-xl shadow-lime-400 py-10 px-4 rounded-xl ${conValue?"animate__animated animate__flipOutY":"animate__animated animate__flipInY"}`}>
        <div>
          <h2 className="capitalize font-sans text-blue-950 text-4xl font-bold">
            Sign up for free
          </h2>
          <p className="capitalize font-sans text-base text-blue-500 font-medium pt-5">
            Already a member?{" "}
            <span className="badge badge-success text-white hover:badge-accent hover:cursor-pointer pl-5" onClick={()=>{oldOrNew(true)}}>Go back to login</span>
          </p>
        </div>
        <div className="pt-8 flex flex-col justify-center">
          <div>
            <input
              type="text"
              placeholder="Email address"
              className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 py-4 w-full placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
            />
          </div>
          <div className="py-4 relative">
            <input
              type={condition?"password":"text"}
              placeholder="Password"
              className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 w-full py-4 placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
            />
            <span className="absolute top-[50%] right-[0%]" onClick={()=>{setCondition(!condition)}}>
            {
                condition?<FaEyeSlash className="text-rose-500 hover:cursor-pointer"/>:<FaEye className="text-rose-500 hover:cursor-pointer"/>
            }
              
            </span>
          </div>

          <div className="pt-8">
            <button className=" bg-green-500 w-full py-3 rounded-xl text-white capitalize font-sans font-bold hover:bg-green-900">
                login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
