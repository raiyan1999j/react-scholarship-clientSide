import { useContext, useEffect } from "react"
import { InfoContainer } from "../../AuthProvider/AuthProvider"
import { useNavigate } from "react-router-dom"

export default function Privet({children}){
    const {user} = useContext(InfoContainer)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/loginPage')
        }
    },[user])

    return(
        <>
            {children}
        </>
    )
}