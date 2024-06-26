import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { InfoContainer } from "../../AuthProvider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { cssTransition, toast } from "react-toastify";

const customAnimation = cssTransition({
  enter:"animate__animated animate__fadeInLeft",
  exit:"animate__animated animate__flipOutX",
  appendPosition: false,
  collapse: true,
  collapseDuration: 300
})

export default function AppForm({preDefined}) {
  const [profile,setProfile] = useState();
  const [degreeContainer,setDegree] = useState([]);
  const navigate = useNavigate();

  const {user} = useContext(InfoContainer)

  const formInfo=useFormik({
    enableReinitialize:true,
    initialValues:{
     phone:'',
     gender:'',
     country:'',
     district:'',
     road:'',
     degree:'',
     studyGap:'',
     ssc:'',
     hsc:'',
     photo:'',
     subject:`${preDefined.subject}`,
     scholarship:`${preDefined.scholarshipName}`,
     university:`${preDefined.university}`,
     user_name:`${user.displayName}`,
     user_email:`${user.email}`,
     scholarship_id:`${preDefined._id}`,
     application:`${preDefined.application}`,
     service:`${preDefined.service}`
    },
    onSubmit:value=>{
      const base = new Date();
      
      const year = base.getFullYear();
      const month= base.getMonth() + 1;
      const date = base.getDate();

      const currentDate = `${year}-${month}-${date}`;

      value.currentDate = currentDate;

      publicRoute.post('/application',value)
      .then((res)=>{
        if(res.status == 200){
          toast.success('Applied successfully',{
            transition: customAnimation,
            autoClose: 2000
          })
          setTimeout(()=>{
            navigate('/home')
          },1000)
        }
      })
    }
  })
  
  const imgHandler=async (event)=>{
    const file = event.target.files[0];
    const reader = new FileReader();
    const body = new FormData();

    body.set('key',import.meta.env.VITE_IMGBB);
    body.append('image',file);

    reader.onloadend=()=>{
      setProfile(reader.result)
    }

    if(file){
      reader.readAsDataURL(file)
    }

    await axios({
      method:'post',
      url:'https://api.imgbb.com/1/upload',
      data:body
    }).then((res)=>{formInfo.setFieldValue('photo',res.data.data.display_url)})
  }

  useEffect(()=>{
    publicRoute(`/universityDegree?institute=${preDefined.university}`)
    .then((res)=>{
      setDegree(res.data)
    })
  },[])
  return (
    <>
      <form onSubmit={formInfo.handleSubmit}>
      <div className="w-[70%] mx-auto rounded-xl shadow-lg shadow-indigo-500 py-8 px-8">
        <div className="mb-4">
          <div className="h-[200px] w-[170px] border-double border-gray-500 border-[4px] rounded-lg relative">
          {
            profile?
            <img
              src={profile}
              alt="applicant photo"
              className="h-full w-full object-cover absolute top-0 left-0"
            />:""
          }
            
            <div className="absolute w-full top-[40%] text-center">
              <label htmlFor="inputImg" className="font-medium text-slate-900 text-base font-mono hover:cursor-pointer">
              <FaImages className="text-center w-full"/>
              Browse your image

              <input type="file" accept="image/*" className="hidden" id="inputImg" onChange={imgHandler} />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="mb-4">
            <input
              type="text"
              className="py-2 bg-transparent border-b-blue-600 border w-[20%] text-rose-600/60 text-base font-semibold font-mono placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
              placeholder="applicant phone number"
              {...formInfo.getFieldProps('phone')}
            />
          </div>
          <div className="mb-4">
            <select className="select rounded-none border border-b-blue-600 w-[20%] max-w-xs text-rose-600/60 font-mono font-semibold text-base capitalize pl-0" {...formInfo.getFieldProps('gender')}>
            <option disabled={true} value="">Select Gender</option>
              <option className="text-blue-600/60 font-mono font-semibold text-base">Male</option>
              <option className="text-blue-600/60 font-mono font-semibold text-base">Female</option>
              <option className="text-blue-600/60 font-mono font-semibold text-base">Others</option>
            </select>
          </div>
          <div className="grid grid-cols-3 w-full mb-4">
            <span>
              <input
                type="text"
                placeholder="country"
                className="w-[90%] py-2 text-rose-600/60 font-mono font-semibold text-base bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
                {...formInfo.getFieldProps('country')}
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="district"
                className="w-[90%] py-2 text-rose-600/60 font-mono font-semibold text-base bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
                {...formInfo.getFieldProps('district')}
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="village/road"
                className="w-[90%] py-2 text-rose-600/60 font-mono font-semibold text-base bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
                {...formInfo.getFieldProps('road')}
              />
            </span>
          </div>
          <div className="flex flex-row w-[100%] mx-auto mb-4">
            <div className="w-full">
            <select className="select rounded-none border border-b-blue-600 w-[50%] max-w-xs text-rose-600/60 font-mono font-bold text-base capitalize pl-0" {...formInfo.getFieldProps('degree')}>
            <option disabled={true} value="">Select Degree</option>
              {
                degreeContainer.map((value,index)=>{
                  return <option value={value.diploma} key={index}>
                    {value.diploma}
                  </option>
                })
              }
            </select>
            </div>
            <div className="w-full flex justify-end pr-9">
            <input type="number" className="w-[50%] py-2 text-rose-600/60 font-mono font-semibold text-base bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" placeholder="Study gap (optional)" {...formInfo.getFieldProps('studyGap')}/>
            </div>
          </div>

          <div className="flex flex-row w-[100%] mx-auto mb-4">
            <div className="w-full">
            <input type="text" placeholder="SSC result " className="py-2 bg-transparent border-b-blue-600 border w-[50%] text-rose-600/60 font-mono font-semibold text-base placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" {...formInfo.getFieldProps('ssc')}/>
            </div>
            <div className="w-full flex justify-end pr-9">
            <input type="text" placeholder="HSC result " className="py-2 bg-transparent border-b-blue-600 border w-[50%] text-rose-600/60 font-mono font-semibold text-base placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" {...formInfo.getFieldProps('hsc')}/>
            </div>
          </div>

          <div className="flex flex-row w-[100%] mx-auto mb-4">
            <div className="w-full">
            <input type="text" placeholder="subject category " className="py-2 bg-transparent border-b-blue-600 border w-[50%] text-rose-600/60 font-mono font-semibold text-base placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize hover:cursor-not-allowed" disabled {...formInfo.getFieldProps('subject')}/>
            </div>
            <div className="w-full flex justify-end pr-9">
            <input type="text" placeholder="scholarship category" className="py-2 bg-transparent border-b-blue-600 border w-[50%] text-rose-600/60 font-mono font-semibold text-base placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize hover:cursor-not-allowed" disabled {...formInfo.getFieldProps('scholarship')}/>
            </div>
          </div>

          <div className="w-full mx-auto mb-4">
            <div>
                <input type="text" placeholder="university name" className="py-2 bg-transparent border-b-blue-600 border w-[25%] text-rose-600/60 font-mono font-semibold text-base placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize hover:cursor-not-allowed" {...formInfo.getFieldProps('university')} disabled/>
            </div>
          </div>

          <div className="mt-5">
            <button className="border-[4px] w-full py-4 rounded-xl border-gray-500 border-double text-xl font-mono font-bold text-slate-900 hover:shadow-inner hover:shadow-indigo-900 hover:border-none hover:bg-indigo-300 hover:text-white transition-all duration-300 ease-in" type="submit">
                Submit application
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}
