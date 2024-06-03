import { useState } from "react";
import { FaCamera, FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import "animate.css";
import axios from "axios";

const validation = (values) => {
  const errors = {};
  const imgPattern = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i;
  const mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (!values.profileImg) {
    errors.profileImg = "Required!";
  } else if (!imgPattern.test(values.profileImg)) {
    errors.profileImg = "input must be image!";
  }

  if (!values.userName) {
    errors.userName = "Required!";
  } else if (values.userName.length < 3) {
    errors.userName = "Name should be at least 3 character!";
  }

  if (!values.email) {
    errors.email = "Required!";
  } else if (!mailPattern.test(values.email)) {
    errors.email = "please insert valid mail!";
  }

  if (!values.password) {
    errors.password = "Required!";
  } else if (!passPattern.test(values.password)) {
    errors.password =
      "It should contain one UpperCase & lowercase letter with a special character as well as a number!";
  }

  return errors;
};

export default function Login({ oldOrNew, conValue }) {
  const [condition, setCondition] = useState(true);
  const [info,setInfo] = useState(null)
  const [preview,setPreview] = useState(null);

  const formInfo = useFormik({
    initialValues: {
      profileImg: "",
      userName: "",
      email: "",
      password: "",
    },
    validate: validation,
    onSubmit: (value) => {
      
      console.log(value);
    },
  });

  const imgHandler= async (event)=>{
    // formInfo.setFieldValue('profileImg',event.currentTarget.files[0]);

    const file = event.currentTarget.files[0];
    const reader = new FileReader();
    const body = new FormData();

    body.set('key',import.meta.env.VITE_IMGBB);
    body.append('image',file);

    await axios({
      method:'post',
      url:'https://api.imgbb.com/1/upload',
      data:body
    }).then((res)=>{formInfo.setFieldValue('profileImg',res.data.data.display_url)})

    reader.onloadend=()=>{
        setPreview(reader.result)
    }

    if(file){
      reader.readAsDataURL(file)
    }
  }
  return (
    <>
      <div
        className={`mt-[80px] mx-auto w-[70%] shadow-xl shadow-lime-400 py-10 px-4 rounded-xl ${
          conValue
            ? "animate__animated animate__flipOutY"
            : "animate__animated animate__flipInY"
        }`}
      >
        <div>
          <h2 className="capitalize font-sans text-blue-950 text-4xl font-bold">
            Sign up for free
          </h2>
          <p className="capitalize font-sans text-base text-blue-500 font-medium pt-5">
            Already a member?{" "}
            <span
              className="badge badge-success text-white hover:badge-accent hover:cursor-pointer pl-5"
              onClick={() => {
                oldOrNew(true);
              }}
            >
              Go back to login
            </span>
          </p>
        </div>
        <div className="pt-8 flex flex-col justify-center">
          <form onSubmit={formInfo.handleSubmit}>
            <div className="w-full flex">
              <label
                id="profileImg"
                className="h-[60px] w-[60px] border border-rose-500 flex justify-center items-center hover:cursor-pointer rounded-md"
              >
                <span>
                {preview?<img src={preview} className="h-[60px] w-[60px] object-cover rounded-md"/>:<FaCamera className="text-gray-500" />}
                </span>
                <input
                  type="file"
                  id="profileImg"
                  accept="image/*"
                  onChange={imgHandler}
                  className="hidden"
                />
              </label>
              {formInfo.touched.profileImg && formInfo.errors.profileImg ? (
                <span className="ml-4 font-bold text-sm text-rose-800 capitalize font-serif">{formInfo.errors.profileImg}</span>
              ) : null}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your name"
                className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 py-4 w-full placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
                name="userName"
                id="userName"
                onChange={formInfo.handleChange}
                onBlur={formInfo.handleBlur}
                value={formInfo.values.userName}
              />
              {formInfo.touched.userName && formInfo.errors.userName ? (
                <span className="font-bold text-sm text-rose-800 capitalize font-serif">{formInfo.errors.userName}</span>
              ) : null}
            </div>
            <div>
              <input
                type="text"
                placeholder="Email address"
                className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 py-4 w-full placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
                name="email"
                onChange={formInfo.handleChange}
                onBlur={formInfo.handleBlur}
                value={formInfo.values.email}
              />
              {formInfo.touched.email && formInfo.errors.email ? (
                <span className="font-bold text-sm text-rose-800 capitalize font-serif">{formInfo.errors.email}</span>
              ) : null}
            </div>
            <div className="py-4 relative">
              <input
                type={condition ? "password" : "text"}
                placeholder="Password"
                className="border border-t-0 border-r-0 border-l-0 bg-transparent border-rose-500 w-full py-4 placeholder:pl-5 pl-5 text-blue-950 font-semibold font-mono"
                name="password"
                onChange={formInfo.handleChange}
                onBlur={formInfo.handleBlur}
                value={formInfo.values.password}
              />
              <span
                className="absolute top-[50%] right-[0%]"
                onClick={() => {
                  setCondition(!condition);
                }}
              >
                {condition ? (
                  <FaEyeSlash className="text-rose-500 hover:cursor-pointer" />
                ) : (
                  <FaEye className="text-rose-500 hover:cursor-pointer" />
                )}
              </span>
            </div>
            {formInfo.touched.password && formInfo.errors.password ? (
                <span className="font-bold text-sm text-rose-800 capitalize font-serif">{formInfo.errors.password}</span>
              ) : null}

            <div className="pt-8">
              <button
                className=" bg-green-500 w-full py-3 rounded-xl text-white capitalize font-sans font-bold hover:bg-green-900"
                type="submit"
              >
                sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
