import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [condition, setCondition] = useState(true);

  const newOrOld = (value) => {
    setCondition(value);
  };
  return (
    <>
      <section className="w-full">
        <div className="flex flex-row w-full">
          <div className="h-screen relative bg-login-main bg-no-repeat bg-cover w-[50%] after:absolute after:h-full after:w-full after:bg-login-supp after:bg-no-repeat after:bg-contain after:rotate-[270deg] after:right-[-78.7%] after:top-0 overflow-hidden">
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
                <div className="divider divider-neutral">You can continue with</div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="mr-4 h-10 w-10 rounded-xl bg-white flex justify-center items-center hover:cursor-pointer hover:scale-125">
                <FcGoogle className="text-2xl"/>
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
