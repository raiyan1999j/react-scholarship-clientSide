import { useContext, useEffect, useState } from "react";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import { InfoContainer } from "../../../AuthProvider/AuthProvider";
import { FaEdit, FaTrash } from "react-icons/fa";
import  Rating  from "@mui/material/Rating";
import EditReview from "./EditReview";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../Loader/Loader";
import ErrorCompo from "../../../ErrorCompo/ErrorCompo";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "scholarsBtn ml-4",
    cancelButton: "btn btn-outline btn-secondary"
  },
  buttonsStyling: false
});

export default function MyReviews() {
  const { user } = useContext(InfoContainer);
  const [reviewBox,setBox] = useState(false);
  const [passData,setPass] = useState();
  const queryClient = useQueryClient();

  const {isPending,error,data} = useQuery({
    queryKey:["userReview"],
    queryFn:()=>{
      return publicRoute(`/specificReview?email=${user?.email}`)
      .then(res=>res.data)
    }
  })

  const reviewUpdate = useMutation({
    mutationFn:(info)=>{
      return publicRoute.put(`/reviewUpdate?track=${info[0]}`,info[1])
      .then((res)=>{
        if(res.status == 200){
          toast.success('Update success!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["userReview"])
    }
  })

  const reviewRemove=useMutation({
    mutationFn:(id)=>{
      return publicRoute.delete(`/reviewRemove?trackId=${id}`)
      .then((res)=>{
        if(res.status == 200){
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "The review has deleted",
            icon: "success"
          });
        }
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["userReview"])
    }
  })
  const reviewModal=(value)=>{
    setBox(true)

    setPass(value)
  }

  const editedReview=(trackId,obj)=>{
    reviewUpdate.mutate([trackId,obj])
  }

  const removeReview=(trackId)=>{
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't get back this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        reviewRemove.mutate(trackId)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your review has not been deleted :)",
          icon: "error"
        });
      }
    });
  }
  console.log(data)
  return (
    <>
      <section className="w-[90%] mx-auto">
        <div className="mt-[50px]">
          <h2 className="capitalize text-3xl font-bold font-mono text-center">
            your reviews details
          </h2>
        </div>

        <div>
        {
          isPending?
          <div className="flex justify-center items-center">
            <Loader/>
          </div>:
          error?
          <div>
            <ErrorCompo/>
          </div>:
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
              {
                data.length==0?
                <tr>
                  <td colSpan="6" className="text-center font-bold font-sans text-2xl text-rose-600 appliedTxt">
                    you haven't reviewed yet
                  </td>
                </tr>:
                data?.map((value, index) => {
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
                        onClick={()=>{removeReview(value._id)}}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
          
        </div>

        {
          reviewBox?<EditReview
          reviewEdited={editedReview} 
          dataPass={passData} 
          modalBox={(value)=>{setBox(value)}}/>:""
        }
      </section>
    </>
  );
}
