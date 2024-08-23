import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "animate.css"
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import { useFormik } from 'formik';
import { useLocation, useNavigate } from "react-router-dom";

export default function Login({oldOrNew,conValue}) {
    const [condition,setCondition] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const {loginUser,user} = useContext(InfoContainer);
    
    const formInfo = useFormik({
      initialValues:{
        email:'',
        pass: ''
      },
      onSubmit: (value)=>{
        loginUser(value)
      }
    })
    
    useEffect(()=>{
      if(user){
        navigate(location.state==null?"/home":location.state)
      }
    },[user])
  return (
    <>
      <div className={`mt-[100px] mx-auto w-[70%] shadow-xl shadow-rose-400 py-10 px-4 rounded-xl ${conValue?"animate__animated animate__flipInY":"animate__animated animate__flipOutY"}`}>
        <div>
          <h2 className="capitalize font-sans text-blue-950 text-4xl font-bold">
            login to your account
          </h2>
          <p className="capitalize font-sans text-base text-blue-500 font-medium pt-5">
            don't have account?{" "}
            <span className="hover:cursor-pointer pl-5 badge badge-primary hover:badge-secondary text-white" onClick={()=>{oldOrNew(false)}}>sign up here</span>
          </p>
        </div>
        <div className="pt-8 flex flex-col justify-center">
        <form onSubmit={formInfo.handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Email address"
              className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 py-4 w-full placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
              {...formInfo.getFieldProps('email')}
            />
          </div>
          <div className="py-4 relative">
            <input
              type={condition?"password":"text"}
              placeholder="Password"
              className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 w-full py-4 placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
              {...formInfo.getFieldProps('pass')}
            />
            <span className="absolute top-[50%] right-[0%]" onClick={()=>{setCondition(!condition)}}>
            {
                condition?<FaEyeSlash className="text-rose-500 hover:cursor-pointer"/>:<FaEye className="text-rose-500 hover:cursor-pointer"/>
            }
              
            </span>
          </div>

          <div className="pt-8">
            <button className=" bg-green-500 w-full py-3 rounded-xl text-white capitalize font-sans font-bold hover:bg-green-900" type="submit">
                login
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
