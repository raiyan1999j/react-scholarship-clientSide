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

export const InfoContainer = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(false);

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
        });
      }
    );
  };

  const userLogout = () => {
    signOut(fireAuth).then(() => {
      setUser(null);
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
      }
    );
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
    });
  };
  useEffect(() => {
    const unMount = onAuthStateChanged(fireAuth, (userInfo) => {
      setUser(userInfo);
      setLoading(false);
    });

    return () => {
      unMount();
    };
  }, [user]);

  const allInfo = { user, loading, registerUser, userLogout, loginUser, googleLogin };
  return (
    <>
      <ToastContainer />
      <InfoContainer.Provider value={allInfo}>
        {children}
      </InfoContainer.Provider>
    </>
  );
}
