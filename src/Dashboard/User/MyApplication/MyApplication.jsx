import { useContext, useEffect, useRef, useState } from "react";
import { InfoContainer } from "../../../AuthProvider/AuthProvider";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import TableGroupBtn from './TableGroupBtn';
import { CiMenuKebab } from "react-icons/ci";
import Review from "./Review";

export default function MyApplication() {
  const [allInfo, setAllInfo] = useState([]);
  const { user } = useContext(InfoContainer);
  const [box,setBox] = useState(false);
  const [review,setReview] = useState(false);
  const [tracking,setTracking] = useState(null);

  const menuTab=(value)=>{
    setTracking(value);
  }

  const boxHandle=(value)=>{
    setBox(value);
  }

  const reviewModal=(value)=>{
    setReview(value)
  }
  useEffect(() => {
    publicRoute(`/userApplied/${user.email}`).then((res) => {
      setAllInfo(res.data)
    });
  }, []);

  useEffect(()=>{
    const clickHandler=(event)=>{
      if(event.target.parentElement.classList.contains('btnTest')){
        setBox(true)
      }else{
        setBox(false)
      }
    }

   document.addEventListener('click',clickHandler);
   
   return ()=>{document.removeEventListener('click',clickHandler)}
  })
  return (
    <>
      <section className="w-[90%] mx-auto" id="boxElem">
        <div className="mt-[50px]">
          <h2 className="capitalize text-3xl font-bold font-mono text-center">
            your all application
          </h2>
        </div>

        <div>
          <table className="table table-zebra">
            <thead className="font-serif font-bold capitalize">
              <tr>
                <th>Sr no.</th>
                <th>university name</th>
                <th>address</th>
                <th>subject</th>
                <th>degree</th>
                <th>app. Fees</th>
                <th>Service Char.</th>
                <th>app. status</th>
                <th>app. feedback</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="capitalize font-medium text-slate-900 font-serif">
              {allInfo.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{value.university}</td>
                    <td>
                      {value.country},{value.district}
                    </td>
                    <td>{value.subject}</td>
                    <td>{value.degree}</td>
                    <td>{value.application}</td>
                    <td>{value.service}</td>
                    <td></td>
                    <td></td>
                    <td >
                      <button className="btnTest text-xl"
                        onClick={()=>{menuTab(value.scholarship_id)}}
                      >
                        <CiMenuKebab />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          className={`fixed top-[50%] right-0 ${
            box ? "w-[20%]" : "w-[0%] right-[-5%]"
          } transition-all duration-200 ease-in bg-white rounded-lg py-2 px-2`}
        >
            <TableGroupBtn
            modalReview={reviewModal} 
            handleBox={boxHandle}
            trackingNum={tracking}
            />
        </div>
        {
          review?<Review modalReview={reviewModal} idTracking={tracking} />:""
        }
      </section>
    </>
  );
}
