import { useNavigate } from "react-router-dom"

export default function Applied(){
    const navigate = useNavigate();
    return(
        <>
        <div className="w-[60%] mx-auto rounded-lg bg-appliedBg bg-cover bg-no-repeat border border-gray-500/20 shadow-lg shadow-slate-400 py-8 translate-y-[100px]">
            <div className="w-[70%] text-center mx-auto pb-8">
            <h2 className="font-serif text-3xl">
            The application you want to apply for has already been submitted.
            </h2>
            </div>
            <p className="text-center pb-8 font-mono capitalize appliedTxt">
                Please use your dashboard or go back to previous page
            </p>

            <div className="w-[50%] mx-auto flex flex-row justify-between">
                <button className="capitalize btn btn-outline btn-primary mr-4 rounded-tl-[166px] rounded-br-[166px] " onClick={()=>{navigate('/allScholars')}}>
                    go back
                </button>
                <button className="capitalize btn btn-outline btn-success rounded-tr-[166px] rounded-bl-[166px]" onClick={()=>{navigate('/dashboard/myApplication')}}>
                    Dashboard
                </button>
            </div>
            
        </div>
        </>
    )
}