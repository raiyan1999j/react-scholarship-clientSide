import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import  Rating  from "@mui/material/Rating";

export default function TopScholar({ allData }) {
  const [ratingHolder,setHolder] = useState();
  const [condition,setCondition] = useState(true);
  const dragRef = useRef();
  const {
    university,
    scholarshipName,
    country,
    city,
    application,
    photo,
    subject,
    deadline,
    _id,
  } = allData;

  const navigate = useNavigate();

  useEffect(()=>{
    publicRoute(`/ratingCollector?university=${university}`)
    .then((res)=>{
        const step1 = res.data;
        const array = [];
        let point;

        
        step1.map((value)=>{
            array.push(Number(value.rating))
        })

        point = array.reduce((acc,current)=>{
            return acc += current;
        },0)
        
        setHolder(point/step1.length)
        setCondition(false)
    })
  },[]);
  return (
    <>
      <div className="shadow-lg rounded-lg overflow-hidden transition-all ease-linear duration-300 hover:bg-white"> 
        <div className="grid grid-cols-[50%_30%] gap-x-6" >
          <div className="bg-blue-500 text-white flex items-center justify-end rounded-t-lg rounded-r-none">
            <h2 className="capitalize text-xl font-mono mr-4">{university}</h2>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-bold font-mono text-blue-950">
              {country}
            </h2>
            <span className="text-base bg-neutral rounded-full text-white text-center capitalize">
              {city}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-[40%_60%] mt-8">
          <div className="h-[350px] w-full py-4 px-4 rounded-xl shadow-inner shadow-gray-400">
            <img
              src={photo}
              alt="universityImage"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="h-[350px]">
            <div className="grid grid-cols-2 gap-x-4 w-full px-4 mb-4">
              <div>
                <p className="text-sm text-white bg-neutral rounded-full capitalize pl-4 mb-1">
                  scholarship category
                </p>
                <h2 className="text-base font-bold text-blue-950 font-mono break-words pl-2">
                  {scholarshipName}
                </h2>
              </div>
              <div>
                <p className="text-sm text-white bg-neutral rounded-full capitalize pl-4 mb-1">
                  application deadline
                </p>
                <h2 className="text-base font-bold text-blue-950 font-mono pl-2">
                  {deadline}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 w-full px-4 mb-8">
              <div>
                <p className="text-sm text-white bg-neutral rounded-full capitalize pl-4 mb-1">
                  subject category
                </p>
                <h2 className="text-base font-bold text-blue-950 font-mono break-words pl-2">
                  {subject}
                </h2>
              </div>
              <div>
                <p className="text-sm text-white bg-neutral rounded-full capitalize pl-4 mb-1">
                  application fees
                </p>
                <h2 className="text-base font-bold text-blue-950 font-mono pl-2">
                  {application}
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 w-full px-4">
              <div>
                <p className="text-sm text-white bg-neutral rounded-full capitalize pl-4 mb-1">
                  rating
                </p>
                {
                  condition? <span className="loading loading-dots loading-md"></span>:
                  <Rating defaultValue={ratingHolder} precision={0.5} readOnly/>
                }
                
              </div>
            </div>
            <div>
              <button className="w-full h-[55px] flex justify-center items-center translate-y-[100px] rounded-lg border border-gray-300 border-r-0 border-b-0 border-l-0 capitalize topScholarsDetails" onClick={() => {
                    navigate(`/details/${_id}`);
                  }}>
                details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
