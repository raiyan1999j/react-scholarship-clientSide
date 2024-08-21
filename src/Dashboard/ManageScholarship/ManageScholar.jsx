import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import CollectionData from "./CollectionData";
import "../../App.css";
import OptionBox from "./OptionBox";
import EditModal from "./EditModal";
import ManagePagination from "./ManagePagination";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import ErrorCompo from "../../ErrorCompo/ErrorCompo";
import { Slide, toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const optArray = [8,12,14];
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "scholarsBtn ml-8",
    cancelButton: "btn-17 text-sm"
  },
  buttonsStyling: false
});

export default function ManageScholar() {
  const [pageNumber, setPage] = useState(1);
  const [limitation,setLimitation] = useState(8);
  const [box, setBox] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(null);
  const [condition,setCondition] = useState(true);
  const [searchItem,setSearch] = useState("")
  const pageRef = useRef();
  const searchBox = useRef();
  const pageArray = [];
  const queryClient = useQueryClient();
  
  const {isPending,error,data} = useQuery({
    queryKey:['allScholarData',pageNumber,limitation,searchItem],
    queryFn:()=>{
      return publicRoute(`/getScholarData?pageNumber=${pageNumber}&&limitation=${limitation}&&searchItem=${searchItem}`)
      .then(res=>res.data)
    }
  });

  const editedData = useMutation({
    mutationFn:(value)=>{
      return publicRoute.put(`/editData?editId=${value.infoId}`,value.info)
    },
    onSuccess:(data)=>{
      queryClient.invalidateQueries(['allScholarData'])
      if(data.status === 200){
        toast.success('Update Success', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
          });
      }
    }
  })

  const removeData = useMutation({
    mutationFn:(value)=>{
      return publicRoute.delete(`/removeScholarshipData?trackId=${value}`)
      .then((res)=>{
        if(res.status == 200){
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your data has been deleted.",
            icon: "success"
          });
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["allScholarData"]);
    }
  })
  const optionActive = (value) => {
    setBox(!box);
    setId(value);
  };

  const modalActive = (value) => {
    setModal(value);
    setBox(false);
  };

  const addToOpt=()=>{
    setCondition(true);
    optArray.push(pageRef.current.value);
  }

  const updateData=(dataId,value)=>{
    editedData.mutate({infoId:dataId,info:value});
    modalActive(false)
  }

  const removeScholarship=(value)=>{
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        removeData.mutate(value)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }
  for (let repeat = 1; repeat <= data?.totalPage; repeat++) {
    pageArray.push(repeat);
  }
  return (
    <>
      <section>
        <div className="flex flex-row justify-center my-8">
          <input
            type="text"
            placeholder="Type here"
            className="py-2 border border-gray-400 bg-transparent rounded-lg w-[30%] placeholder:pl-4 pl-4 capitalize text-base text-gray-500 font-semibold font-mono"
            ref={searchBox}
          />
          <button className="btn btn-outline btn-success ml-2" onClick={()=>{setSearch(searchBox.current.value)}}>
            <IoSearchOutline />
          </button>
        </div>
        <table className="table-auto w-[95%] text-left capitalize table-zebra table mx-auto">
          <thead>
            <tr>
              <th>No</th>
              <th>Scholarship name</th>
              <th>university name</th>
              <th>subject category</th>
              <th>applied degree</th>
              <th>application fees</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((value, index) => {
              return (
                <CollectionData
                  key={index}
                  serial={index}
                  information={value}
                  activeOption={optionActive}
                />
              );
            })}
          </tbody>
        </table>
        {
          isPending?
          <div className="flex w-full justify-center items-center my-8">
            <Loader/>
          </div>:
          error?
          <div className="flex w-full justify-center items-center my-8">
            <ErrorCompo/>
          </div>:
          ""
        }

        <div
          className={`fixed top-[50%] right-0 ${
            box ? "w-[20%]" : "w-[0%] right-[-5%]"
          } transition-all duration-200 ease-in bg-white rounded-lg py-2 px-2`}
        >
          <OptionBox 
          trackId={id} 
          activeModal={modalActive}
          scholarshipRemove={removeScholarship}
           />
        </div>
        {modal ? (
          <div className="fixed top-0 left-0 h-full w-full editScholar overflow-y-scroll">
            <EditModal editId={id} activeModal={modalActive} dataUpdate={updateData} />
          </div>
        ) : (
          ""
        )}
      </section>
      <section className="mt-10">
        <div className="grid grid-cols-2 w-[90%] mx-auto">
          <div className="flex flex-row items-center">
            <h2 className="capitalize font-bold text-blue-950 font-serif">show</h2>
            {
                condition?
                <select className="select select-bordered w-[15%] ml-4 max-w-xs" onChange={(event)=>{setLimitation(event.target.value)}}>
              {
                optArray.map((value,index)=>{
                    return <option value={value} key={index}>{value}</option>
                })
              }
            </select>:
            <input type="number" className="w-[15%] mr-4 py-2 border border-black" ref={pageRef}/>
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
            <h2 className="capitalize font-bold text-blue-950 font-serif ml-4">
                data per page
            </h2>
          </div>
          <div className="text-right">
            {pageArray.map((value, index) => {
              return (
                <ManagePagination
                  selectPage={(pageNum) => {
                    setPage(pageNum);
                  }}
                  page={value}
                  noPage={pageNumber}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </section>
      <ToastContainer/>
    </>
  );
}
