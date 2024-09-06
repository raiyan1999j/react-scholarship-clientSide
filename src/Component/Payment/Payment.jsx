import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MdAttachMoney } from "react-icons/md";
import PaymentBox from "./PaymentBox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { useContext, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { useLoaderData, useLocation } from "react-router-dom";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import PaidAlert from "./PaidAlert";
import PaymentSection from "./PaymentSection";

export default function Payment(){
    // const [clientSecret,setClient] = useState("");
    const location = useLocation();
    const {user} = useContext(InfoContainer);
    const queryClient = useQueryClient();

    const {isLoading:checkLoading,error:checkError,data:paymentCheckData} = useQuery({
        queryKey:["paymentCheck"],
        queryFn:()=>{
            return publicRoute(`/paymentCheck?email=${user.email}&&track=${location.state.trackId}`)
            .then(res=>res.data)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["paymentCheck"])
        }
    })
    return(
        <>
        {
            checkLoading?
            <section className="w-[1200px] mx-auto mt-[100px] h-[250px]  flex justify-center items-center">
                <Loader width={150}/>
            </section>:
            !paymentCheckData?
            <PaidAlert trackId={location.state.trackId}/>:
            <PaymentSection/>
        }
        
        </>
    )
}