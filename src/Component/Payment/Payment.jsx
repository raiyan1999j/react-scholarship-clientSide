import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import PaymentBox from "./PaymentBox";
import AppForm from "./AppForm";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { Flip, Slide, toast } from "react-toastify";

export default function Payment(){
    const [condition,setCondition] = useState(true);
    const {application} = useLoaderData();
    const loader = useLoaderData();
    const {user} = useContext(InfoContainer);

    const paymentOpt=(value)=>{
        setCondition(value);

        const wrap ={
            email: user.email,
            track: loader._id,
            amount: application
        }

        publicRoute.post('/paymentData',wrap)
        .then((res)=>{
            if(res.status == 200){
                toast.success('Payment Done', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                    });
            }
        })
    }

    useEffect(()=>{
        publicRoute(`/paymentCheck?email=${user.email}&&track=${loader._id}`)
        .then((res)=>{
            if(!res.data){
                setCondition(false)
                toast.info('Already paid', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip,
                    });
            }
        })
    },[])
    return(
        <>
            <section className="w-[1200px] mx-auto mt-[100px]">
                {
                    condition?
                    <PaymentBox fees={application} conditionChange={(value)=>{paymentOpt(value)}}/>
                    :
                    <AppForm preDefined={loader}/>
                }
            </section>
        </>
    )
}