import { useRef } from "react"

export default function AddCategory({stateInfo,hideBox,collectionUpdate}){
    const optionRef = useRef("");

    const updateCollection=()=>{
        collectionUpdate(stateInfo,optionRef.current.value)
        hideBox(false)
    }
    return(
        <>
            <div className="w-full mb-6">
                <input type="text" className="w-full py-2 rounded-xl placeholder:pl-4 placeholder:font-mono placeholder:font-bold pl-4 font-mono font-bold text-gray-500" ref={optionRef} placeholder={stateInfo} />
                <div className="w-full flex justify-between mt-3">
                    <button className="btn btn-secondary" onClick={()=>{hideBox(false)}} >Cancel</button>
                    <button className="btn btn-success" onClick={updateCollection}>Done</button>
                </div>
            </div>
        </>
    )
}