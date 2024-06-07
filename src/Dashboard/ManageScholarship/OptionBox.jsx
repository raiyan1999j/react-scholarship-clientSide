import { FaInfo } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";

export default function OptionBox({activeOption,activeModal}) {
  return (
    <>
      <div className="flex flex-row items-center justify-around">
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-sky-400 hover:text-white">
        <FaInfo />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-green-400 hover:text-white" onClick={()=>{activeModal(true)}}>
        <LuClipboardEdit />
        </button>
        <button className="h-[50px] w-[50px] rounded-full bg-gray-300 flex justify-center items-center transition-all duration-150 ease-in hover:bg-rose-400 hover:text-white" onClick={()=>{activeOption(false)}}>
        <MdOutlineCancel />
        </button>
      </div>
    </>
  );
}
