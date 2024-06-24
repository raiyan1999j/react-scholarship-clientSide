import { useEffect, useRef, useState } from "react";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { cssTransition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css"
import Swal from "sweetalert2";

const userOperator =['admin','moderator','user'];

export default function ManageUser() {
  const [opt, setOperator] = useState([]);

  const customAnimation= cssTransition({
    enter: "animate__animated animate__bounceInRight",
    exit : "animate__animated animate__flipOutX",
    appendPosition: false,
    collapse: true,
    collapseDuration: 300
  })

  const authorityChange=(event)=>{
    const wrap ={
        author : event.target.value,
        id : event.target.id
    }

    publicRoute.put(`/updateOperator`,wrap)
    .then((res)=>{
        if(res.status===200){
            toast.success('Updated user',{
                transition : customAnimation,
                autoClose:2000
            })
        }
    } )
  }

  const removeItem=(value)=>{
    Swal.fire({
      title: "Are you sure to remove this user?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("User removed!", "", "success");
        publicRoute.delete(`/removeUser?userId=${value}`)
      } else if (result.isDenied) {
        Swal.fire("No data change", "", "info");
      }
    });
  }
  useEffect(() => {
    publicRoute("/getAllUser").then((res) => {
      setOperator(res.data);
    });
  }, [opt]);
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
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>user name</th>
                <th>Email</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {opt?.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{value.name}</td>
                    <td>{value.gmail}</td>
                    <td>
                        <select className="select select-bordered" name="authority" id={value._id} onChange={authorityChange}>
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
                    </td>
                    <td>
                      <button className="flex flex-row items-center bg-rose-500 text-white px-3 py-2 rounded-xl text-base hover:bg-rose-800" onClick={()=>{removeItem(value._id)}}>
                        Delete
                        <MdDelete className="ml-2" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
