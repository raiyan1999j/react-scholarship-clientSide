import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { publicRoute } from "../../PublicRoute/PublicRoute";
export default function ScholarCard({ allData }) {
  const [condition,setCondition] = useState(true);
  const [ratingHolder,setHolder] = useState();
  const {
    university,
    scholarshipName,
    country,
    city,
    subject,
    deadline,
    service,
    photo,
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
  },[])
  return (
    <>
      <div className="rounded-md shadow-md shadow-gray-400 py-2 px-2 w-[80%] grid grid-cols-[20%_77%] gap-x-4 mb-10 transition-all ease-linear duration-200 hover:bg-white hover:cursor-pointer">
        <div className="p-4 w-full h-[300px]">
          <img
            src={photo}
            alt="coverPhoto"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div>
          <h2 className="text-blue-950 font-bold font-serif text-2xl capitalize">
            {university}
          </h2>
          <div className="my-2">
            <div className="flex flex-row mb-3">
              <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-rose-500 before:table before:clear-both before:mr-2 flex items-center">
                location:
              </h2>
              <p className="ml-4 font-mono text-base font-medium capitalize italic">
                {country},{city}
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:table before:clear-both before:mr-2 flex items-center">
                scholarship category:
              </h2>
              <p className="ml-4 font-mono text-base font-medium capitalize italic">
                {scholarshipName}
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-yellow-500 before:table before:clear-both before:mr-2 flex items-center">
                subject:
              </h2>
              <p className="ml-4 font-mono text-base font-medium capitalize italic">
                {subject}
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-orange-500 before:table before:clear-both before:mr-2 flex items-center">
                application deadline
              </h2>
              <p className="ml-4 font-mono text-base font-medium capitalize italic">
                {deadline}
              </p>
            </div>
            <div className="flex flex-row mb-3">
              <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-pink-500 before:table before:clear-both before:mr-2 flex items-center">
                application fees
              </h2>
              <p className="ml-4 font-mono text-base font-medium capitalize italic">
                {service}
              </p>
            </div>
            <div className="flex flex-row items-center justify-between w-[100%] mx-auto">
              <div className="flex flex-row items-center">
                <span className="mr-2">
                  <BiBadgeCheck />
                </span>
                <span className="capitalize text-bold font-serif text-indigo-700 mr-4">
                  rating
                </span>
                <div className="flex items-center">
                {condition?<span className="loading loading-dots loading-md text-rose-500"></span>:
                <Rating defaultValue={ratingHolder} precision={0.5} readOnly size="small"/>
                }
              </div>
              </div>
              
              <div>
                <button
                  className="scholarsBtn"
                  onClick={() => {
                    navigate(`/details/${_id}`);
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
