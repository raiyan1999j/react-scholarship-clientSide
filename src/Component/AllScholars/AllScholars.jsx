import { IoSearchOutline } from "react-icons/io5";
import ScholarCard from "./ScholarCard";
import ScholarPagination from "./ScholarPagination";
import { useEffect,useState } from "react";
import { publicRoute } from "../../PublicRoute/PublicRoute";

export default function AllScholars() {
    const [pagination,setPage] = useState(1);
    const [totalPage,setTotal] = useState(1);
    const [allInfo,setInfo] = useState(null);
    const pageArray = [];
    useEffect(()=>{
        publicRoute(`/allScholarData?pageNumber=${pagination}`)
        .then((res)=>{
            setTotal(res.data.totalPage)
            setInfo(res.data.result)
        })
    },[pagination])

    const setPageNumber=(value)=>{
      setPage(value)
    }

    for(let repeat=1;repeat<=totalPage; repeat++){
      pageArray.push(repeat);
    }
  return (
    <>
      <section className="bg-dashNav bg-no-repeat bg-cover">
        <section className="w-[1200px] mx-auto pt-[100px]">
          <div className="w-[30%] mx-auto rounded-xl shadow-xl shadow-black/50 flex flex-row py-2 px-4">
            <div className="w-[80%]">
              <input
                type="text"
                className="border py-4 px-4 rounded-xl w-full bg-transparent placeholder:font-mono placeholder:pl-4 placeholder:italic"
                placeholder="Scholars,Degree or University"
              />
            </div>
            <div className="w-[20%] flex justify-center items-center transition-all duration-300 border rounded-xl hover:cursor-pointer hover:bg-white hover:scale-105 hover:shadow-inner hover:shadow-black/60">
              <IoSearchOutline />
            </div>
          </div>
        </section>

        <section className="w-[1200px] mx-auto mt-[100px]">
          <ScholarCard />
        </section>

        <section className="w-[1200px] mx-auto flex justify-end">
          {
            pageArray.map((value,index)=>{
              return(
                <ScholarPagination 
                key={index} 
                pageNumber={value}
                paginationNumber={pagination}
                pageNumberSet={(value)=>{setPageNumber(value)}}
                />
              )
            })
          }
        </section>
      </section>
    </>
  );
}
