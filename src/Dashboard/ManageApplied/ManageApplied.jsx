import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SiLibreofficewriter } from "react-icons/si";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import Loader from "../../Loader/Loader";
import ErrorCompo from "../../ErrorCompo/ErrorCompo";
import { CiMenuKebab } from "react-icons/ci";
import { TiInfoLarge } from "react-icons/ti";
import { TbMailCancel } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import SelectedOpt from "./SelectedOpt";

export default function ManageApplied() {
  const { isPending, error, data } = useQuery({
    queryKey: ["applicant"],
    queryFn: () => {
      return publicRoute("/applicantInfo").then((res) => res.data);
    },
  });

  const [menu,setMenu] = useState(false);
  const [modalCon,setModalCon] = useState(false);
  const [infoTrack,setInfoTrack] = useState();
  const [wrapObj,setWrapObj] = useState();
  const queryClient = useQueryClient();
  const appStatus = useMutation({
    mutationFn:(info)=>{
      const userId = info[0];
      const workStatus = info[1].target.value;
      const wrap={
        path: "/dashboard/myApplication",
        title: "application status",
        message: "checkout your application status",
        time: new Date(),
        user: info[2]
      }

      return publicRoute.put(`/workStatus?trackId=${userId}`,{workStatus})
      .then(()=>{
        publicRoute.post('/manageAppNotification',wrap)
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries('getNotification')
    }
  })

  const menuCondition=(value)=>{
    setMenu(true);
    setInfoTrack(value);
  }

  const modalOption=(option="",condition)=>{
    setModalCon(condition);
    setMenu(false);

    
    const wrap ={
      track : infoTrack,
      option: option
    }

    setWrapObj(wrap);
  }

  useEffect(()=>{
    const clickHandler=(event)=>{
      if(event.target.parentElement?.classList.contains('menuCondition') || event.target.parentElement?.classList.contains('ml-[300px]')){
        setMenu(false)
      }
    }

    document.addEventListener('click',clickHandler);

    return ()=>{document.removeEventListener('click',clickHandler)}
  })
  return (
    <>
      <section className="w-full py-8 flex flex-col items-center justify-center menuCondition">
        <div className="manageAppliedBorder h-[80px] w-[80px] rounded-full flex justify-center items-center">
          <SiLibreofficewriter className="text-4xl text-slate-800" />
        </div>
        <div className="w-[50%] text-center capitalize py-3 font-mono text-xl font-bold appliedTxt menuCondition">
          <h2>manage applicant application</h2>
        </div>
      </section>

      <section className="w-full overflow-x-auto menuCondition">
        <table className=" table table-zebra capitalize font-serif menuCondition">
          <thead>
            <tr className="menuCondition">
              <th>applicant</th>
              <th>university</th>
              <th>scholarship</th>
              <th>subject</th>
              <th>degree</th>
              <th>app. fees</th>
              <th>service</th>
              <th>app. status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((value, id) => {
              return (
                <tr key={id} className="menuCondition">
                  <td>{value.user_email}</td>
                  <td>{value.university}</td>
                  <td>{value.scholarship}</td>
                  <td>{value.subject}</td>
                  <td>{value.degree}</td>
                  <td>{value.application}</td>
                  <td>{value.service}</td>
                  <td>
                    <select className="select select-bordered capitalize" onChange={()=>{appStatus.mutate([value._id,event,value.user_email])}} defaultValue={value.workStatus}>
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="completed">completed</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={()=>{menuCondition(value._id)}}>
                      <CiMenuKebab />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className={`${menu?"w-[300px]":"w-0"} shadow-inner shadow-slate-800/50 py-2 rounded-lg flex flex-row justify-around fixed top-1/2 right-0 bg-white transition-all duration-300 `}>
            <button className="h-[50px] w-[50px] rounded-full shadow-inner shadow-slate-500 flex justify-center items-center transition-all duration-200 ease-in hover:cursor-pointer hover:shadow-inner hover:shadow-blue-900 hover:bg-blue-300 hover:text-gray-100 tooltip tooltip-top" data-tip="Details" onClick={()=>{modalOption("details",true)}}>
            <TiInfoLarge />
            </button>
            <button className="h-[50px] w-[50px] rounded-full shadow-inner shadow-slate-500 flex justify-center items-center transition-all duration-200 ease-in hover:cursor-pointer hover:shadow-inner hover:shadow-lime-900 hover:bg-lime-300 tooltip tooltip-bottom" data-tip="Feedback" onClick={()=>{modalOption("feedback",true)}}>
            <RiFeedbackLine />
            </button>
            <button className="h-[50px] w-[50px] rounded-full shadow-inner shadow-slate-500 flex justify-center items-center transition-all duration-200 ease-in hover:cursor-pointer hover:shadow-inner hover:shadow-rose-900 hover:bg-rose-300 hover:text-gray-100 tooltip tooltip-top" data-tip="Cancel" onClick={()=>{modalOption("reject",true)}}>
            <TbMailCancel />
            </button>
        </div>

        {
          modalCon?
          <div className="fixed w-full h-screen top-0 left-0 editScholar z-10 scale-up-center rounded-none">
            <SelectedOpt 
            info={wrapObj} 
            optionModal={modalOption}
            conditionModal={(value)=>{setModalCon(value)}}
            />
          </div>:""
        }
      </section>
      {isPending ? (
        <div className="w-full flex flex-row justify-center items-center">
          <Loader />
        </div>
      ) : error ? (
        <ErrorCompo />
      ) : (
        ""
      )}
    </>
  );
}
