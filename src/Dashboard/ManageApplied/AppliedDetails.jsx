import { useQuery } from "@tanstack/react-query"
import { publicRoute } from "../../PublicRoute/PublicRoute"
import Loader from "../../Loader/Loader"
import ErrorCompo from "../../ErrorCompo/ErrorCompo"
import { GiCrossMark } from "react-icons/gi"
import { useEffect, useState } from "react"

export default function AppliedDetails({trackId,modalCondition,modalOption}){
    const [closeModal,setClose] = useState(true)
    const {isPending,error,data} = useQuery({
        queryKey:["information",trackId],
        queryFn:()=>{
           return publicRoute(`/specificApplicant?trackId=${trackId}`)
           .then(res=>res.data)
        }
    })

    const modalOperation=()=>{
        setClose(false)
        setTimeout(()=>{
            modalCondition(false)
        },500)
    }
    return(
        <>
        <div className={`w-[60%] mx-auto bg-white shadow-xl shadow-slate-500 rounded-lg ${closeModal?"slide-in-left":"scale-out-center"}`}>
        {
            isPending?
            <Loader/>:
            error?
            <ErrorCompo/>:
            <div className="flex flex-row justify-center w-full py-8 px-8">
                <div className="w-[70%] mr-8">
                <div className="fixed top-[-8%] right-[-8%]">
                    <button className="h-[50px] w-[50px] shadow-lg shadow-slate-900 rounded-full flex justify-center items-center" onClick={()=>{modalOperation()}}>
                    <GiCrossMark className="text-2xl text-rose-900 transition-all duration-200 hover:text-4xl"/>
                    </button>
                </div>
                    <div>
                        <h4 className="capitalize font-bold font-sans text-sm pb-2">university name:</h4>
                        <input type="text" className="border border-slate-200 border-t-0 border-r-0 border-l-0 hover:cursor-not-allowed capitalize text-blue-950 font-mono font-bold w-[80%]" defaultValue={data.university} disabled />
                    </div>
                    <div className="flex flex-row py-8 capitalize font-bold items-center w-full">
                        <div className="mr-auto">
                            <h4 className="font-sans text-sm pb-2">degree:</h4>
                            <input type="text" className="border border-slate-200 border-t-0 border-r-0 border-l-0 hover:cursor-not-allowed font-mono capitalize text-blue-950" defaultValue={data.degree} disabled />
                        </div>
                        <div className="w-[50%]">
                            <h4 className="font-sans text-sm pb-2">scholarship category:</h4>
                            <input type="text" className="border border-slate-200 border-t-0 border-r-0 border-l-0 hover:cursor-not-allowed font-mono capitalize text-blue-950 w-full" defaultValue={data.scholarship} disabled />
                        </div>
                    </div>
                    <div className="flex flex-row capitalize font-bold items-center">
                        <div className="mr-auto">
                            <h4 className="font-sans text-sm pb-2">ssc</h4>
                            <input type="text" className="border border-slate-200 border-t-0 border-r-0 border-l-0 hover:cursor-not-allowed font-mono capitalize text-blue-950 w-[90%]" defaultValue={data.ssc==""?"not set":data.ssc} disabled />
                        </div>
                        <div className="w-[50%]">
                            <h4 className="font-sans text-sm pb-2">hsc</h4>
                            <input type="text" className="border border-slate-200 border-t-0 border-r-0 border-l-0 hover:cursor-not-allowed font-mono capitalize text-blue-950 w-full" defaultValue={data.hsc==""?"not set":data.hsc} disabled />
                        </div>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col items-center">
                    <div className="h-[150px] w-[130px] rounded-md">
                        <img src={data.photo} alt="profileImage" className="h-full w-full object-cover rounded-md" />
                    </div>
                    <div className="flex flex-row mt-6 w-full justify-center">
                        <button className="rejectApplied capitalize py-2 px-4 mr-6">
                            reject
                        </button>
                        <button className="scholarsBtn capitalize py-2 px-2 text-sm" onClick={()=>{modalOption('feedback',true)}}>
                            feedback
                        </button>
                    </div>
                </div>
            </div>
        }
        </div>
        </>
    )
}