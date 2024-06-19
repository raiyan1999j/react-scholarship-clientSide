import { IoSearchOutline } from "react-icons/io5";
import ScholarCard from "./ScholarCard";
import ScholarPagination from "./ScholarPagination";
import { useEffect, useRef, useState } from "react";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { limit } from "firebase/firestore";

const optArray = [4,8,12];

export default function AllScholars() {
  const [pagination, setPage] = useState(1);
  const [totalPage, setTotal] = useState(1);
  const [limitation,setLimit] = useState(4);
  const [allInfo, setInfo] = useState(null);
  const [condition,setCondition] = useState(true);
  const customPageNum = useRef();
  const limitPerPage = useRef(4);
  const pageArray = [];
  useEffect(() => {
    publicRoute(`/allScholarData?pageNumber=${pagination}&&limitation=${limitation}`).then((res) => {
      setTotal(res.data.totalPage);
      setInfo(res.data.result);
    });
  }, [pagination,limitation]);

  const setPageNumber = (value) => {
    setPage(value);
  };

  const addToOpt=()=>{
    setCondition(true);
    const pageNum = customPageNum.current.value;

    pageNum== "" ? 4 : Number(optArray.push(pageNum));
  }

  for (let repeat = 1; repeat <= totalPage; repeat++) {
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
          {allInfo?.map((value, index) => {
            return <ScholarCard allData={value} key={index} />;
          })}
        </section>

        <section className="w-[1200px] mx-auto grid grid-cols-[50%_50%] justify-between">
        <div className="flex flex-row items-center">
            <h4 className="capitalize font-bold text-blue-950 font-serif">show</h4>
            {
              condition?
              <select className="w-[10%] py-1 px-2 rounded-xl max-w-xs bg-black text-white ml-3" ref={limitPerPage} onChange={()=>{setLimit(limitPerPage.current.value)}}>
              {
                optArray.map((value,index)=>{
                  return <option value={value} key={index}>{value}</option>
                })
              }
            </select>:
            <input type="number" className="w-[10%] border border-black rounded-md ml-3 font-bold font-mono " ref={customPageNum}/>
            } 
            {
              condition?
              <button className="py-2 px-2 rounded-xl shadow-inner shadow-black bg-white/50 ml-3 transition-all duration-500 hover:bg-slate-800 hover:text-white hover:shadow-xl hover:shadow-gray-600" onClick={()=>{setCondition(false)}}>
                <FaPlus className="transition-all duration-100"/>
              </button>:
              <button className="py-2 px-2 rounded-xl shadow-inner shadow-black bg-white/50 ml-3 transition-all duration-500 hover:bg-slate-800 hover:text-white hover:shadow-xl hover:shadow-gray-600" onClick={()=>{addToOpt()}}>
                <ImCross className="transition-all duration-100"/>
              </button>
            }
            <h4 className="capitalize font-bold text-blue-950 font-serif">per page</h4>
          </div>
          <div className="text-right">
            {pageArray.map((value, index) => {
              return (
                <ScholarPagination
                  key={index}
                  pageNumber={value}
                  paginationNumber={pagination}
                  pageNumberSet={(value) => {
                    setPageNumber(value);
                  }}
                />
              );
            })}
          </div>
        </section>
      </section>
    </>
  );
}
