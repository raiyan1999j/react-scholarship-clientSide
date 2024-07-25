import { useNavigate } from "react-router-dom"

export default function ErrorHandle(){
    const navigate = useNavigate();

    return(
        <>
            <div className="flex flex-col items-center w-[60%] translate-y-[50%] shadow-xl shadow-black/50 mx-auto rounded-lg py-8 errorBg">
                <div className="errorTxt relative font-mono h-[100px] w-[250px] flex justify-center items-center">
                    <h2 className="absolute text-9xl">
                        404
                    </h2>
                    <h2 className="absolute text-9xl">
                        404
                    </h2>
                </div>
                <div className="capitalize font-mono my-8 text-center">
                    <h2 className="text-2xl font-bold appliedTxt">
                        Uh! oh! you're lost
                    </h2>
                    <p className="my-4 text-2xl font-bold appliedTxt">
                        the post you are looking for is unable
                    </p>
                    <button className="capitalize scholarsBtn" onClick={()=>{navigate('/home')}}>
                        home
                    </button>
                </div>
            </div>
        </>
    )
}