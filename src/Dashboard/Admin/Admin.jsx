import { useContext,useState } from "react";
import "../../App.css";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import { FaCamera } from "react-icons/fa";

export default function Admin() {
  const {operator,user} = useContext(InfoContainer);
  const [edit,setEdit] = useState(false);
    
  return (
    <>
      <div className="card py-6 px-4 w-[150px] mt-[20%] mx-auto bg-login-main text-white capitalize font-mono">
        <div className="h-[80px] w-[80px] relative">
          <img src={user?.photoURL} alt="profileImg" className="h-full w-full rounded-full object-cover" />
          {
            edit?
            <label id="profileImg">
            <input type="file" accept="image/*" className="hidden" />
            <span className="absolute top-[35%] left-[35%] hover:cursor-pointer">
          <FaCamera className=" text-gray-800 text-xl"/>
          </span>
          </label>
          :""
          }
        </div>
        <div>
          {edit?
          <div className="py-4">
          <input type="text" defaultValue={user?.displayName} className="w-full bg-white/50 rounded-xl pl-4"/>
          </div>:
          <p className="py-4">Name: {user?.displayName}</p>}
          {operator=='user'?"":<p className="pb-4">Role : {operator}</p>}
        </div>
        <div>
          <button onClick={()=>{setEdit(!edit)}} className="card-btn-glass py-2 w-full text-center hover:card-btn-glassHover">{edit?"Done":"Edit"}</button>
        </div>
      </div>
    </>
  );
}
