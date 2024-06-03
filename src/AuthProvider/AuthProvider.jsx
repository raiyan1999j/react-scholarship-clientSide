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

  const registerUser = (value) => {
    createUserWithEmailAndPassword(fireAuth, value.email, value.password).then(
      (userInfo) => {
        updateProfile(userInfo.user, {
          displayName: value.userName,
          photoURL: value.profileImg,
        }).then(() => {
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
          setUser(userInfo.user);
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
      }
    );
  };

  const googleLogin = () => {
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
    });
  };
  useEffect(() => {
    const unMount = onAuthStateChanged(fireAuth, (userInfo) => {
      setUser(userInfo);
    });

    return () => {
      unMount();
    };
  }, [user?.photoURL]);

  const allInfo = { user, registerUser, userLogout, loginUser, googleLogin };
  return (
    <>
      <ToastContainer />
      <InfoContainer.Provider value={allInfo}>
        {children}
      </InfoContainer.Provider>
    </>
  );
}
