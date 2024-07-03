import { useContext, useEffect, useState } from "react";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import { InfoContainer } from "../../../AuthProvider/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import  Rating  from "@mui/material/Rating";
import EditReview from "./EditReview";

export default function MyReviews() {
  const { user } = useContext(InfoContainer);
  const [allInfo, setInfo] = useState([]);
  const [reviewBox,setBox] = useState(false);
  const [passData,setPass] = useState();

  const reviewModal=(value)=>{
    setBox(true)

    setPass(value)
  }

  useEffect(() => {
    publicRoute(`/specificReview?email=${user.email}`).then((res) => {
      setInfo(res.data);
    });
  }, []);
  return (
    <>
      <section className="w-[90%] mx-auto">
        <div className="mt-[50px]">
          <h2 className="capitalize text-3xl font-bold font-mono text-center">
            your reviews details
          </h2>
        </div>

        <div>
          <table className="table table-zebra">
            <thead className="font-serif font-bold capitalize">
              <tr>
                <th></th>
                <th>scholarship name</th>
                <th>university</th>
                <th>comments</th>
                <th>post date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="capitalize font-medium text-slate-900 font-serif">
              {allInfo.map((value, index) => {
                return (
                  <tr key={index}>
                    <td className="w-[5%]">
                      <button
                        className="text-2xl text-sky-500 transition-all duration-100 hover:text-sky-900 hover:text-xl tooltip"
                        data-tip="Edit"
                        onClick={()=>{reviewModal(value)}}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="w-[10%]">{value.scholarshipName}</td>
                    <td className="w-[10%]">{value.university}</td>
                    <td className="w-[50%] text-justify">
                      {value.feedback}
                      <div className="flex flex-row items-center my-3">
                        <p className="mr-3 italic font-mono text-sm">Rating:</p> 
                        <Rating name="half-rating" defaultValue={Number(value.rating)} precision={0.5} readOnly size="small"/>
                      </div>
                    </td>
                    <td className="w-[10%]">{value.currentDate}</td>
                    <td className="w-[5%]">
                      <button
                        className="text-2xl text-rose-600 transition-all duration-100 hover:text-rose-900 hover:text-xl tooltip"
                        data-tip="Remove"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {
          reviewBox?<EditReview dataPass={passData} modalBox={(value)=>{setBox(value)}}/>:""
        }
      </section>
    </>
  );
}
