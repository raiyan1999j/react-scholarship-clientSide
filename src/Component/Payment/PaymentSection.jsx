import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentBox from './PaymentBox';
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import Loader from "../../Loader/Loader";
import { publicRoute } from "../../PublicRoute/PublicRoute";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

export default function PaymentSection(){
    const [clientSecret,setClient] = useState("");
    const location = useLocation();
    const {user} = useContext(InfoContainer);
    
    const clientPayment = useMutation({
        mutationFn:(value)=>{
            return publicRoute.post('/clientPayment',value)
            .then(res=>setClient(res.data.clientSecret))
        }
    })
  
    useEffect(()=>{
        let wrap;
        if(location){
            wrap = {
                amount : parseInt(location?.state?.fees),
                id: location?.state?.trackId
            }
        }
        clientPayment.mutate(wrap)
    },[location])

    const appearance = {
        theme: 'stripe'
    }
    const option ={
        clientSecret,
        appearance
    }
    return(
        <>
            <section className="w-[1200px] mx-auto mt-[100px]">
                <div className="w-[80%] mx-auto paymentBackground rounded-lg shadow-xl shadow-slate-700/50">
                    <div className="flex flex-row items-center w-full justify-center">
                        <h2 className="paymentText capitalize font-mono">
                            Payment details
                        </h2>
                    </div>
                    <div>
                    {
                        clientSecret?
                        <Elements stripe={stripePromise} options={option}>
                            <PaymentBox
                                trackId={location?.state?.trackId}
                                amount={location?.state?.fees}
                                mail={user?.email}
                            />
                        </Elements>:
                        <div className="flex w-full h-[300px] justify-center items-center">
                            <Loader width={150}/>
                        </div>
                    }
                    </div>
                </div>
            </section>
        </>
    )
}