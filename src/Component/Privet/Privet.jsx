import { useContext, useEffect } from "react"
import { InfoContainer } from "../../AuthProvider/AuthProvider"
import { useLocation, useNavigate } from "react-router-dom"

export default function Privet({children}){
    const {user} = useContext(InfoContainer)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/loginPage',{state:location.pathname})
        }
    },[user])

    return(
        <>
            {children}
        </>
    )
}