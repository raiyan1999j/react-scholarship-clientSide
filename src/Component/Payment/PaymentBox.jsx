import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { useState } from "react";
import Loader from "../../Loader/Loader";
import { cssTransition, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const customAnimation = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__fadeOutRight",
  appendPosition: false,
  collapse: true,
  collapseDuration: 300
})

export default function PaymentBox({trackId,mail,amount}){
  const stripe = useStripe();
  const elements= useElements();
  const navigate = useNavigate();
  const [isLoading,setLoading] = useState(false);
  const [isComplete,setComplete] = useState(false)
  
  const paymentInfo = useMutation({
    mutationFn:(value)=>{
      return publicRoute.post('/paymentData',value)
      .then((res)=>{
        if(res.status === 200){
          setLoading(true)
          setTimeout(()=>{
            navigate('/appForm',{state:trackId})
          },2000)
        }
      })
    }
  })

  const formHandler=async (event)=>{
    event.preventDefault();
    const wrap = {
      track: trackId,
      email: mail,
      amount: amount
    }

    if(!stripe || !elements){
      return;
    }

    if(isComplete){

      const {error} = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // // Make sure to change this to your payment completion page
          // return_url: "",
        },
        redirect: "if_required"
      });

      if(error){
        toast.error("Something went wrong",{
          transition : customAnimation,
          autoClose: 2000
        })
      }else{
         paymentInfo.mutate(wrap);
      }
    }
  };

  const handleChange=(event)=>{
    setComplete(event.complete)
  }

  const paymentOptions = {
    layout: "tabs"
  }
  return(
    <>
    {
      isLoading?
      <div className=" absolute z-10 top-[65%] left-[45%]">
        <Loader width={150}/>
      </div>:
      ""
    }
      <form className="px-8 py-8" onSubmit={formHandler}>
        <PaymentElement options={paymentOptions} onChange={handleChange}/>
        <div className="flex flex-row justify-end mt-8">
        
        <button className="paymentBtnText shadow-inner shadow-[#143120] bg-[#27ae60] px-2 rounded-lg transition-all duration-300 ease-linear hover:bg-[#47524c] hover:shadow-[#52c281]">
          Pay Fees
        </button>
        </div>
        
      </form>
      <ToastContainer/>
    </>
  )
}