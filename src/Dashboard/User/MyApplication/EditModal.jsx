import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import Loader from "../../../Loader/Loader";
import { useFormik } from "formik";
import { FaQuestion } from "react-icons/fa";
import { MdOutlineAddAPhoto } from "react-icons/md";
import axios from "axios";

export default function EditModal({closeModal,trackId}) {
  const [modalCon,setModalCon] = useState(true);
  const [degreeCondition,setDegreeCon] = useState(false);
  const [genderCondition,setGenderCon] = useState(false);
  const [photoCondition,setPhotoCon] = useState("");

  const {isPending,error,data} = useQuery({
    queryKey:["myAppEditData"],
    queryFn:()=>{
      return publicRoute(`/myApplicationEditData?trackId=${trackId}`)
      .then(res=>res.data)
    }
  })

  const {isPending:degreePending,error:degreeError,data:degreeData}= useQuery({
    queryKey:["degreeSelection",data],
    queryFn:()=>{
      return publicRoute(`/universityDegree?institute=${data.university}`).then(res=>res.data)
    }
  })

  const updateApplication = useMutation({
    mutationFn:(value)=>{
      modalHandler(false)
      return publicRoute.put(`/updateApplicantData?trackId=${trackId}`,value)
    }
  })
  const formInfo = useFormik({
    enableReinitialize:true,
    initialValues:{
      phone:`${data?.phone}`,
      gender:`${data?.gender}`,
      country:`${data?.country}`,
      district:`${data?.district}`,
      road:`${data?.road}`,
      degree:`${data?.degree}`,
      studyGap:`${data?.studyGap}`,
      ssc:`${data?.ssc}`,
      hsc:`${data?.hsc}`,
      photo:`${data?.photo}`,
      subject:`${data?.subject}`,
      scholarship:`${data?.scholarship}`,
      university:`${data?.university}`,
      gender:`${data?.gender}`
    },
    onSubmit:(value)=>{
      updateApplication.mutate(value)
    }
  })

  const modalHandler=(value)=>{
    setModalCon(value)
    setTimeout(()=>{
      closeModal(false)
    },500)
  }

  const imageHandler=async (event)=>{
    const file = event.target.files[0];
    const reader= new FileReader();
    const body = new FormData();

    body.set("key",import.meta.env.VITE_IMGBB);
    body.append("image",file);

    if(file){
      reader.readAsDataURL(file)
    }

    reader.onloadend=()=>{
      setPhotoCon(reader.result)
    }

    await axios({
      method:"post",
      url:"https://api.imgbb.com/1/upload",
      data:body
    }).then((res)=>{formInfo.setFieldValue("photo",res.data.data.display_url)})
  }
  return (
    <>
      <div className={`w-[80%] bg-white mx-auto border-4 border-double border-yellow-300 rounded-lg px-8 py-8 ${modalCon?"scale-in-br":"scale-out-br"}`}>
      <div>
        <div className="fixed right-[-8%] top-[0%]">
            <button className="h-[50px] w-[50px] rounded-full bg-slate-300/50 shadow-inner shadow-slate-500 flex justify-center items-center hover:text-2xl" onClick={()=>{modalHandler(false)}}>
            <GiCrossMark className="text-rose-500"/>
            </button>
        </div>
      </div>
      {
        isPending?
        <div className="flex w-full justify-center items-center ">
          <Loader/>
        </div>:
        data.workStatus=="processing"?
        <>
          <div className="text-center">
            <h2 className="capitalize text-4xl font-bold font-sans text-red-700">Sorry!!</h2>
            <p className="capitalize font-mono font-semibold appliedTxt text-xl w-[50%] mx-auto my-8">
              you can not edit your application while authority in processing
            </p>
            <button className="bg-rose-500 py-3 px-5 text-white font-bold font-mono rounded-t-full rounded-r-none rounded-b-lg rounded-l-full transition-all duration-300 hover:rounded-tl-none hover:rounded-tr-full hover:rounded-br-full hover:rounded-bl-full" onClick={()=>{modalHandler(false)}}>
              Close
            </button>
          </div>
        </>:
        <>
        <form onSubmit={formInfo.handleSubmit}>
        <div className="w-full flex flex-row">
          <div className="w-[20%] mt-8">
            <div className="h-[200px] w-[150px] border border-slate-700 rounded-lg relative">
              {
                photoCondition==""?
                <img src={data.photo==""?photoCondition:data.photo} alt="profile picture" className="h-full w-full object-cover rounded-lg" />:
                <img src={photoCondition} alt="profile picture" className="h-full w-full object-cover rounded-lg"/>
              }
              <div className="absolute top-[40%] left-[40%]">
              <label htmlFor="inputImg">
              <input type="file" accept="image/*" className="hidden" id="inputImg" onChange={imageHandler} />
              <MdOutlineAddAPhoto className="text-2xl text-slate-800 hover:text-rose-600 hover:cursor-pointer transition-all duration-200" />
              </label>
              </div>
            </div>
          </div>
          <div className="w-[80%] h-[450px] overflow-y-scroll myApplicationScroll px-8">
          <div className="divider mb-10 divider-neutral">
            <h2 className="text-xl font-mono font-bold capitalize text-primary">
                University information
            </h2>
          </div>
            <div className="flex flex-row justify-between w-full mb-8">
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">subject</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm hover:cursor-not-allowed" {...formInfo.getFieldProps("subject")} disabled />
              </div>
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">scholarship category</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("scholarship")} />
              </div>
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">university</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("university")} />
              </div>
            </div>

            <div className="divider mb-10 divider-neutral">
                <h2 className="text-xl font-mono font-bold capitalize text-primary">
                    academic information
                </h2>
            </div>
            <div className="flex flex-row justify-between w-full mb-8">
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">hsc</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("hsc")}/>
              </div>
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">ssc</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("ssc")}/>
              </div>
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">study gap</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("studyGap")}  />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full mb-8">
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">
                  degree
                </h4>
                {
                  data.degree==""? 
                  !degreeCondition? 
                  <>
                  <div className="flex flex-row">
                  <h4 className="capitalize text-sm font-bold text-rose-500 font-sans">not set yet</h4>
                  <button className="ml-2 text-sky-500 tooltip tooltip-right hover:text-xl" data-tip="Set degree" onClick={()=>{setDegreeCon(!degreeCondition)}}><FaQuestion /></button>
                  </div>
                  </>:
                  <select className="select select-ghost w-full max-w-xs capitalize text-sm font-bold font-serif" {...formInfo.getFieldProps("degree")}>
                  <option defaultValue={true}>set your degree</option>
                    {degreeData.map((value,index)=>{
                      return <option value={value.diploma} key={index}>
                        {value.diploma}
                      </option>
                    })}
                  </select>
                  :
                  <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm hover:cursor-not-allowed capitalize font-serif" defaultValue={data.degree} disabled/>
                }
              </div>
            </div>

            <div className="divider mb-10 divider-neutral">
                <h2 className="text-xl font-mono font-bold capitalize text-primary">
                    applicant information
                </h2>
            </div>
            <div className="flex flex-row justify-between w-full mb-8">
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">country</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("country")} />
              </div>
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">district</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("district")}  />
              </div>
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">village/road</h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("road")} />
              </div>
            </div>
            <div className="flex flex-row justify-between w-full mb-8">
              <div className="flex flex-col">
                <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">
                  applicant phone number
                </h4>
                <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm" {...formInfo.getFieldProps("phone")} />
              </div>
              <div className="flex flex-col">
              <h4 className="capitalize font-bold text-sm font-serif badge badge-neutral mb-4">
                Gender
              </h4>
                {
                  data.gender==""?!genderCondition?
                  <button className="text-rose-500 font-bold text-sm font-serif capitalize hover:text-rose-950 transition-all duration-300" onClick={()=>{setGenderCon(!genderCondition)}}>Set your gender</button>:
                  <select className="select select-ghost w-full max-w-xs capitalize text-sm font-bold font-serif" {...formInfo.getFieldProps("gender")}>
                    <option defaultValue={true}>Set your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>:
                  <input type="text" className="border border-t-0 border-r-0 border-l-0 border-sky-400 font-bold text-sm hover:cursor-not-allowed" {...formInfo.getFieldProps("gender")} disabled />
                }
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto mt-4">
            <button className="w-full py-4 border-4 rounded-lg border-slate-800 border-double capitalize font-mono text-xl font-bold transition-all duration-300 hover:shadow-inner hover:shadow-green-900 hover:bg-green-500 hover:border-none hover:text-white" type="submit">
                update application
            </button>
        </div>
        </form>
        </>
      }
      </div>
    </>
  );
}
