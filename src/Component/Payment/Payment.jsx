import { useState } from "react";
import { useLoaderData } from "react-router-dom"
import PaymentBox from "./PaymentBox";
import AppForm from "./AppForm";

export default function Payment(){
    const [condition,setCondition] = useState(true);
    const {application} = useLoaderData();
    const loader = useLoaderData();

    console.log(loader)
    return(
        <>
            <section className="w-[1200px] mx-auto mt-[100px]">
                {
                    condition?
                    <PaymentBox fees={application} conditionChange={(value)=>{setCondition(value)}}/>
                    :
                    <AppForm/>
                }
            </section>
        </>
    )
}