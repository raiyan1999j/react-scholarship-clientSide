
export default function MessageModal({containFeedback,closeMessage,unreadMessage,messageOpen}){
    return(
        <>
            <div className="h-[350px] w-[60%] py-6 px-6 bg-white/50 rounded-lg">
                <div className="h-full w-full border-[4px] border-yellow-300 rounded-lg">
                    <p className="capitalize font-bold font-mono text-xl py-4 px-4">
                        <pre>
                        {containFeedback.feedback}
                        </pre>
                    </p>
                </div>
            </div>
            <div className="w-[60%] flex flex-row mt-4">
                <button className="bg-green-400 text-white font-serif capitalize mx-8 px-8 py-1 rounded-lg hover:bg-green-900 hover:cursor-pointer transition-all duration-300" onClick={()=>{closeMessage(false)}}>
                    done
                </button>
                <button className="bg-rose-400 text-white font-serif capitalize px-8 py-1 rounded-lg hover:bg-rose-900 hover:cursor-pointer transition-all duration-300" onClick={()=>{
                    unreadMessage(false)
                    closeMessage(false)
                    messageOpen(false,containFeedback.userId)
                }}>
                    mark as unread
                </button>
            </div>
        </>
    )
}