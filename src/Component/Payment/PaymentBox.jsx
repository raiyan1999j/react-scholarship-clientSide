
export default function PaymentBox({fees,conditionChange}){
    return(
        <>
            <div className="w-[50%] mx-auto shadow-lg shadow-black rounded-xl pb-4">
                        <div className="py-4 bg-success rounded-t-xl">
                            <h2 className="capitalize font-serif text-bold text-xl text-white text-center">
                                Pay for your fees
                            </h2>
                        </div>
                        <div className="my-4 flex flex-row w-[90%] mx-auto">
                        <p className="mr-4 py-1 font-sans text-xl font-bold text-slate-800">Total amount:</p>
                        <input type="text" value={fees} className="py-2 pl-3 bg-white hover:cursor-not-allowed" disabled />
                        </div>
                        <div className="w-[90%] mx-auto mt-9" onClick={()=>{
                            conditionChange(false)
                        }}>
                            <button className="scholarsBtn">
                                Pay the Fees
                            </button>
                        </div>
                    </div>
        </>
    )
}