import { useMutation } from "@tanstack/react-query";
import { useContext, useRef } from "react";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import Loader from "../../Loader/Loader";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function GetInTouch(){
    const titleRef = useRef("");
    const opinionRef= useRef("");
    const {user} = useContext(InfoContainer)
    const navigate = useNavigate();

    const userMessage = useMutation({
        mutationFn:(value)=>{
            if(value.opinion=="" && value.title==""){
                console.log("no message written")
            }else{
                return publicRoute.post("/userMessage",value)
                .then(res=>{
                    if(res.status == 200){
                        toast.success('We received your message', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Slide,
                            });
                    }
                })
            }
        }
    })

    const formHandler=(event)=>{
        event.preventDefault();

        const wrap = {
            title: titleRef.current.value,
            opinion: opinionRef.current.value,
            mail : user.email
        }

        userMessage.mutate(wrap)
    }
    return(
        <>
        <ToastContainer/>
        <div className="w-full h-[400px] rounded-lg userMessageBgImg flex flex-row justify-center items-center">
            <div className="w-[55%] mr-[3%] rounded-lg card-btn-glass py-4">
                <div className="w-[80%] mx-auto rounded-lg shadow-lg shadow-slate-500 py-2 px-2">
                    <h2 className="capitalize font-bold font-sans text-3xl py-3 getInTouchTxt">get in touch</h2>
                    <p className="capitalize font-mono font-medium text-base appliedTxt py-3">
                        if you have any unknown fact in mind, therefore don't feel hesitate to ask. we will response you soon
                    </p>
                </div>
            </div>
            <div className="w-[32%]">
                <div className="h-[600px] w-full rounded-lg bg-[rgb(241,236,236)] transition-all ease-in duration-200 hover:bg-white hover:shadow-slate-700 shadow-xl shadow-slate-500 py-20  formBackgroundDot overflow-hidden">
                <h2 className="capitalize getInTouchTxtHeader text-5xl font-mono text-center">
                    your message
                </h2>
                    <form onSubmit={formHandler}>
                    {
                        userMessage.isPending?
                        <div className="h-[400px] w-full flex justify-center items-center">
                            <Loader/>
                        </div>:
                        <>
                        <div className="w-[80%] mx-auto">
                            <input type="text" className="border-[2px] border-[#DA1882] rounded-lg px-4 py-2 w-full placeholder:px-4 placeholder:capitalize placeholder:font-bold placeholder:font-mono font-mono capitalize font-bold" placeholder="title" ref={titleRef} />
                        </div>
                        <div className="w-[80%] mx-auto">
                        
                            <textarea placeholder="your opinion" className="border-2 border-[#DA1882] rounded-lg h-[300px] w-full py-4 px-4 placeholder:capitalize placeholder:font-bold placeholder:font-mono font-mono capitalize font-bold" ref={opinionRef}>
                            </textarea>
                        </div>
                        </>
                    }
                        
                        <div className="mt-4 w-[80%] mx-auto">
                        {
                            user?
                            <button className="capitalize border-2 border-[#DA1882] rounded-md py-2 w-full getInTouchBtn font-mono text-2xl relative overflow-hidden">
                                mail
                            </button>:
                            <button className="capitalize text-[#DA1882] text-base font-black w-[40%] translate-x-[80%] hover:underline" onClick={()=>{navigate("/loginPage")}}>
                                Log in to mail us
                            </button>
                        }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}