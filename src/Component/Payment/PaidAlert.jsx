import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function PaidAlert({trackId}){
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate(`/appForm`,{state:trackId})
        },1500)
    },[])
    return(
        <>
            <section className="w-[600px] mx-auto mt-[150px] flex flex-col justify-center items-center shadow-lg shadow-slate-700 rounded-lg">
                <div className="w-[50%] pt-8">
                    <h2 className="text-center appliedTxt font-mono text-xl font-bold text-green-950/50">
                        You have paid the fees please submit application
                    </h2>
                </div>
                <div className="pb-8">
                <progress className="progress w-20 progress-error"></progress>
                </div>
            </section>
        </>
    )
}