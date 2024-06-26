import { useState } from "react"

export default function Review({modalReview}){
    const [modalCon,setModal] = useState(true);

    const viewBox=()=>{
        setModal(false)
        setTimeout(()=>{
            modalReview(false)
        },500)
    }
    return(
        <>
            <div className="fixed top-0 left-[300px] h-screen w-screen reviewModal transition-all duration-300 ease-in">
                <div className={`w-[400px] reviewModalBox rounded-xl fixed top-[15%] right-[25%] px-4 overflow-hidden ${modalCon?"scale-in-br":"scale-out-br"}`}>
                    <div className="w-full flex justify-center">
                    <h2 className="capitalize text-center font-sans font-bold py-4 bg-blue-950 w-[50%] text-white">
                        place your feedback
                    </h2>
                    </div>
                    <div className="flex flex-row justify-between w-[95%] py-4 font-serif capitalize">
                        <div className=" w-1/2">
                            <h5 className="text-sm font-black">rating:</h5>
                        </div>
                        <div className="w-1/2">
                            <h5 className="text-sm font-black">date:</h5>
                            <input type="text" className="bg-transparent shadow-inner shadow-indigo-500 rounded-lg py-1 w-[100%]" />
                        </div>
                    </div>
                    <div>
                        <textarea className="h-[250px] w-full bg-transparent shadow-inner shadow-slate-500/50 rounded-xl placeholder:font-mono placeholder:font-semibold placeholder:capitalize placeholder:p-3" placeholder="write your review"></textarea>
                    </div>
                    <div className="flex flex-row justify-between py-8">
                        <button className="btn-17">
                            Add Review
                        </button>
                        <button className="btn-17" onClick={viewBox}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}