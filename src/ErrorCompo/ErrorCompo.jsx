
export default function ErrorCompo({width}){

    const reloadPage=()=>{
        window.location.reload();
    }
    return(
        <>
            <div className={`${width?`w-[${width}]`:"w-[50%]"} mx-auto text-center shadow-xl shadow-rose-700/50 rounded-lg py-8 errorBg`}>
            <h2 className="font-mono font-bold text-rose-700 text-2xl capitalize italic appliedTxt">Something went wrong!</h2>
            <button className="scholarsBtn mt-8" onClick={reloadPage}>
              Reload
            </button>
          </div>
        </>
    )
}