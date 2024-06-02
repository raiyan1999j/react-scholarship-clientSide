import { createContext, useState } from "react";

export const InfoContainer = createContext(null);

export default function AuthProvider({children}){
    const [user,setUser] = useState(null);

    const allInfo = {user}
    return(
        <>
            <InfoContainer.Provider value={allInfo}>
                {children}
            </InfoContainer.Provider>
        </>
    )
}   