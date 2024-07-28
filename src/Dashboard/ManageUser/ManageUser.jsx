import { useContext, useEffect, useRef, useState } from "react";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { cssTransition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css"
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../Loader/Loader";
import ErrorCompo from "../../ErrorCompo/ErrorCompo";
import { InfoContainer } from "../../AuthProvider/AuthProvider";

const userOperator =['admin','moderator','user'];

export default function ManageUser() {
  const queryClient = useQueryClient();
  const {user} = useContext(InfoContainer)

  const {isPending,error,data} = useQuery({
    queryKey:['operator'],
    queryFn:()=>{
      return publicRoute("/getAllUser").then(res=>res.data)
    }
  })
  const removeItem = useMutation({
    mutationFn:(userId)=>{
       return publicRoute.delete(`/removeUser?userId=${userId}`)
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries(['operator'])
    }
  })

  const authorityChange = useMutation({
    mutationFn:(wrap)=>{
      return publicRoute.put(`/updateOperator`,wrap)
      .then((res)=>{
        if(res.status===200){
          toast.success('Update user',{
            transition:customAnimation,
            autoClose:2000
          })
        }
      })
    }
  })

  const customAnimation= cssTransition({
    enter: "animate__animated animate__bounceInRight",
    exit : "animate__animated animate__flipOutX",
    appendPosition: false,
    collapse: true,
    collapseDuration: 300
  })

  const selectAuthority=(event)=>{
    const wrap ={
        author : event.target.value,
        id : event.target.id
    }
    authorityChange.mutate(wrap);
  }

  const selectRemove=(value)=>{
    Swal.fire({
      title: "Are you sure to remove this user?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("User removed!", "", "success");
        removeItem.mutate(value)
      } else if (result.isDenied) {
        Swal.fire("No data change", "", "info");
      }
    });
  }
  return (
    <>
      <section className="mt-[50px]">
        <div className="w-full flex flex-col items-center">
          <p>
            <FaUser className="text-2xl text-indigo-500" />
          </p>
          <h2 className="text-4xl font-serif font-bold tracking-widest">
            All User
          </h2>
        </div>

        <div className="mt-[50px] w-[95%] mx-auto">
          <table className="table capitalize font-mono text-base">
            <thead>
              <tr>
                <th>No.</th>
                <th>user name</th>
                <th>Email</th>
                <th>role</th>
              </tr>
            </thead>
            
            <tbody>
              {data?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.gmail}</td>
                    <td>
                    {
                      user.email == value.gmail?
                      <h2 className="font-bold text-gray-900 text-xl appliedTxt">{value.operator}</h2>:
                      <select className="select select-bordered capitalize font-mono text-base" name="authority" id={value._id} onChange={selectAuthority}>
                            <option defaultValue={value.operator}>
                            {value.operator}
                            </option>
                            {
                                userOperator.filter((title)=>{
                                    return title != value.operator
                                }).map((option,unique)=>{
                                    return <option value={option} key={unique}>{option}</option>
                                })
                            }
                        </select>
                    }
                    </td>
                    <td>
                    {
                      user.email == value.gmail?
                      "":
                      <button className="flex flex-row items-center bg-rose-500 text-white px-3 py-2 rounded-xl text-base hover:bg-rose-800" onClick={()=>{
                        selectRemove(value._id)
                      }}>
                        Delete
                        <MdDelete className="ml-2" />
                      </button>
                    }
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {
              isPending?
              <div className="flex justify-center items-center w-full border border-t-0 border-r-0 border-l-0 my-8">
                <Loader/>
              </div>:
              error?
              <div className="my-8">
              <ErrorCompo/>
              </div>
              :
              ""
            }
        </div>
      </section>
    </>
  );
}
