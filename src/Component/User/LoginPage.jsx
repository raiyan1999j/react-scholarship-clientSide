import { useContext, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { FcGoogle } from "react-icons/fc";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import { Helmet } from "react-helmet";

export default function LoginPage() {
  const [condition, setCondition] = useState(true);
  const { googleLogin } = useContext(InfoContainer);

  const newOrOld = (value) => {
    setCondition(value);
  };

  const loginGoogle = () => {
    googleLogin();
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login Page</title>
      </Helmet>
      <section className="w-full mb-[100px]">
        <div className="flex flex-row w-full">
          <div className="h-screen relative w-[50%] before:absolute before:h-full before:w-full before:bg-loginPageBg before:bg-cover before:bg-no-repeat">
            <div className="absolute h-full w-full">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#82CCDD"
                  d="M49.6,-58.8C63.3,-47.7,72.5,-31.1,75.7,-13.3C78.9,4.4,76,23.3,65.7,35.1C55.5,46.8,38,51.5,21.4,56.6C4.8,61.8,-10.9,67.4,-27.6,65.7C-44.4,64.1,-62.1,55.1,-65.5,41.5C-68.9,28,-57.9,9.9,-48.7,-2.8C-39.6,-15.4,-32.2,-22.5,-24.4,-34.6C-16.6,-46.7,-8.3,-63.8,4.9,-69.6C18,-75.4,36,-69.9,49.6,-58.8Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <div className="absolute top-[30%] w-[70%] left-8 text-white">
              <h2 className="capitalize font-sans text-4xl font-bold">
                Welcome to scholar <span className="text-green-500">'</span> s
              </h2>
              <p className="font-mono font-medium text-base py-4 text-justify">
                Welcome to the Scholarship Portal! Log in to your account to
                access personalized scholarship recommendations, save your
                favorite opportunities, and receive updates on new scholarships.
                If you don't have an account yet, sign up to start your journey
                towards securing funding for your education abroad.
              </p>

              <div className="flex flex-col w-full border-opacity-50">
                <div className="divider divider-neutral">
                  You can continue with
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div
                  className="mr-4 h-10 w-10 rounded-xl bg-white flex justify-center items-center hover:cursor-pointer hover:scale-125"
                  onClick={loginGoogle}
                >
                  <FcGoogle className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            {condition ? (
              <Login
                oldOrNew={(value) => {
                  newOrOld(value);
                }}
                conValue={condition}
              />
            ) : (
              <Register
                oldOrNew={(value) => {
                  newOrOld(value);
                }}
                conValue={condition}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
