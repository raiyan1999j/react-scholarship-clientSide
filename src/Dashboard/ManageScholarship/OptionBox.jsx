import { FaInfo } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function OptionBox({trackId,activeModal,scholarshipRemove}) {
  const navigate = useNavigate();

  const scholarshipDetails=()=>{
    navigate(`/details/${trackId}`)
  }
  return (
    <>
      <div className="flex flex-row items-center justify-around">
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-sky-400 hover:text-white tooltip tooltip-top" data-tip="details" onClick={()=>{scholarshipDetails()}}>
        <FaInfo />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-green-400 hover:text-white tooltip tooltip-bottom" data-tip="edit" onClick={()=>{activeModal(true)}}>
        <LuClipboardEdit />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-rose-400 hover:text-white tooltip tooltip-top" data-tip="delete" onClick={()=>{scholarshipRemove(trackId)}}>
        <MdOutlineCancel />
        </button>
      </div>
    </>
  );
}
