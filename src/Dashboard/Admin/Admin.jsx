import { useContext,useRef,useState } from "react";
import "../../App.css";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

export default function Admin() {
  const {operator,user,adminUpdateProfile} = useContext(InfoContainer);
  const [edit,setEdit] = useState(false);
  const [img,setImg] = useState(null);
  const [container,setContainer]= useState(null)
  const nameRef = useRef();
    
  const formHandler=async()=>{
    const body = new FormData();
    const wrap ={
      photo:user?.photoURL,
      name: nameRef.current.value
    }
  
    if(container != null){
    body.set('key',import.meta.env.VITE_IMGBB);
    body.append('image',container);

    await axios({
      method:'post',
      url:'https://api.imgbb.com/1/upload',
      data:body
    }).then((res)=>{wrap.photo=res.data.data.display_url})
    }
    
    setEdit(!edit)
    adminUpdateProfile(wrap)
  }

  const imgHandler=(event)=>{
    const file = event.target.files[0];
    const reader= new FileReader();
    
    reader.onloadend=()=>{
      setImg(reader.result)
    }

    if(file){
      reader.readAsDataURL(file)
    }

    setContainer(file)
  }
  return (
    <>
      <div className="card py-6 px-4 w-[150px] mt-[20%] mx-auto bg-login-main text-white capitalize font-mono">
        <div className="h-[80px] w-[80px] relative">
          <img src={img!=null?img:user?.photoURL} alt="profileImg" className="h-full w-full rounded-full object-cover" />
          {
            edit?
            <label id="profileImg">
            <input type="file" name="photo" onChange={imgHandler} accept="image/*" className="hidden" />
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
          <input type="text" ref={nameRef} defaultValue={user?.displayName} className="w-full bg-white/50 rounded-xl pl-4"/>
          </div>:
          <p className="py-4">Name: {user?.displayName}</p>}
          {operator=='user'?"":<p className="pb-4">Role : {operator}</p>}
        </div>
        <div>
        {
          edit?<button onClick={formHandler} className="card-btn-glass py-2 w-full text-center hover:card-btn-glassHover">Done</button>
          :
          <button onClick={()=>{setEdit(!edit)}} className="card-btn-glass py-2 w-full text-center hover:card-btn-glassHover">Edit</button>
        }
        </div>
      </div>
    </>
  );
}
