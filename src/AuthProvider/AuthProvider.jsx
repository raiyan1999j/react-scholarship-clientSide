import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import fireAuth from "../Firebase/Firebase";

export const InfoContainer = createContext(null);

export default function AuthProvider({children}){
    const [user,setUser] = useState(null);

    const registerUser=(value)=>{
        createUserWithEmailAndPassword(fireAuth,value.email,value.password)
        .then((userInfo)=>{
            updateProfile(userInfo.user,{
                displayName:value.userName,
                photoURL:value.profileImg
            }).then(()=>{
                setUser(userInfo.user)
            })
        })
    }

    const userLogout=()=>{
        signOut(fireAuth)
        .then(()=>{
            setUser(null)
        })
    }

    const loginUser=(value)=>{
        signInWithEmailAndPassword(fireAuth,value.email,value.pass)
        .then((userInfo)=>{
            setUser(userInfo)
        })
    }

    const googleLogin=()=>{
        const provider = new GoogleAuthProvider;

        signInWithPopup(fireAuth,provider)
        .then((userInfo)=>{
            console.log(userInfo)
        })
    }
    useEffect(()=>{
        const unMount = onAuthStateChanged(fireAuth,(userInfo)=>{
            setUser(userInfo)
        })

        return ()=>{
            unMount()
        }
    },[user?.photoURL])

    const allInfo = {user,registerUser,userLogout,loginUser,googleLogin}
    return(
        <>
            <InfoContainer.Provider value={allInfo}>
                {children}
            </InfoContainer.Provider>
        </>
    )
}   