import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import fireAuth from "../Firebase/Firebase";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, Flip, ToastContainer, toast } from "react-toastify";
import { publicRoute } from "../PublicRoute/PublicRoute";

export const InfoContainer = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(false);
  const [operator,setOperator] = useState("");

  const registerUser = (value) => {
    setLoading(true);
    createUserWithEmailAndPassword(fireAuth, value.email, value.password).then(
      (userInfo) => {
        updateProfile(userInfo.user, {
          displayName: value.userName,
          photoURL: value.profileImg,
        }).then(() => {
          setUser(userInfo.user);
          toast.success("Account created!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Flip,
          });
          setLoading(false)
          publicRoute.get(`/userOperator?email=${value.email}&&name=${value.userName}`)
          .then((res)=>{setOperator(res.data)})
        })
      })
  };

  const userLogout = () => {
    signOut(fireAuth).then(() => {
      setUser(null);
      setOperator("")
    });
  };

  const loginUser = (value) => {
    setLoading(true);
    signInWithEmailAndPassword(fireAuth, value.email, value.pass).then(
      (userInfo) => {
        setUser(userInfo);
        toast.success("Successfully Login", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
        publicRoute.get(`/userOperator?email=${value.email}&&name=${userInfo.displayName}`)
        .then((res)=>{setOperator(res.data)})
      })
  };

  const googleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(fireAuth, provider).then((userInfo) => {
      setUser(userInfo);
      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoading(false)
      publicRoute.get(`/userOperator?email=${userInfo.user.email}&&name=${userInfo.user.displayName}`)
      .then((res)=>{setOperator(res.data)})
    })
  };

  const adminUpdateProfile=(value)=>{
    updateProfile(fireAuth.currentUser,{
      displayName : value.name,
      photoURL: value.photo
    }).then(()=>{
      console.log(user)
    })
  }
  useEffect(() => {
    const unMount = onAuthStateChanged(fireAuth, (userInfo) => {
      setUser(userInfo);
      setLoading(false);
      publicRoute.get(`/userOperator?email=${userInfo?.email}`)
      .then((res)=>{
        setOperator(res?.data)
      })
    });

    return () => {
      unMount();
    };
  }, [user]);

  const allInfo = { user, loading,operator, registerUser, userLogout, loginUser, googleLogin,adminUpdateProfile };
  return (
    <>
      <ToastContainer />
      <InfoContainer.Provider value={allInfo}>
        {children}
      </InfoContainer.Provider>
    </>
  );
}
