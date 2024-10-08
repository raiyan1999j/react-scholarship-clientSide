import { useContext, useEffect, useRef, useState } from "react";
import { InfoContainer } from "../../../AuthProvider/AuthProvider";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import TableGroupBtn from "./TableGroupBtn";
import { CiMenuKebab } from "react-icons/ci";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../Loader/Loader";
import ErrorCompo from "../../../ErrorCompo/ErrorCompo";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import MessageModal from "./MessageModal";
import EditModal from "./EditModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

export default function MyApplication() {
  const { user } = useContext(InfoContainer);
  const [box, setBox] = useState(false);
  const [review, setReview] = useState(false);
  const [tracking, setTracking] = useState(null);
  const [messageCon, setMessage] = useState(false);
  const [modalCondition, setModalCon] = useState(false);
  const [feedbackContain, setFeedback] = useState("");
  const [editModalCon, setEditCon] = useState(false);
  const queryClient = useQueryClient();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "scholarsBtn ml-8",
      cancelButton: "btn-17 text-sm"
    },
    buttonsStyling: false
  });

  const {
    isPending: userPending,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["userApplied", messageCon],
    queryFn: () => {
      return publicRoute(`/userApplied/${user?.email}`, {
        withCredentials: true,
      }).then((res) => {
        if (res.status == 200) {
          return res.data;
        } else {
          console.log("bad request");
        }
      });
    },
  });

  const messageCondition = useMutation({
    mutationFn: (value) => {
      const wrap = {
        trackId: value[0],
        condition: value[1],
      };
      return publicRoute.put(`/envelopeCondition?userId=${wrap.trackId}`, {
        condition: wrap.condition,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userApplied"]);
    },
  });

  const cancelApplication = useMutation({
    mutationFn:(value)=>{
      return publicRoute.delete(`/userApplicationRemoved?trackingId=${value}`).then((res)=>{
        if(res.status == 200){
          swalWithBootstrapButtons.fire({
            title:"Deleted!",
            text: "Your application has been deleted",
            icon:"success"
          })
        }
      })
  },
  onSuccess:()=>{
    queryClient.invalidateQueries(['userApplied'])
  }
  })

  const menuTab = (value) => {
    setTracking(value);
  };

  const boxHandle = (value) => {
    setBox(value);
  };

  const reviewModal = (value) => {
    setReview(value);
  };

  const openMessage = (condition, userId, feedback = "") => {
    const wrap = {
      feedback: feedback,
      userId: userId,
    };
    setMessage(condition);
    setModalCon(condition);
    setFeedback(wrap);
    messageCondition.mutate([userId, condition]);
  };

  const appCancelation=(value)=>{
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
      cancelApplication.mutate(value)
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your application is not canceled :)",
          icon: "error"
        });
      }
    });
  }

  useEffect(() => {
    const clickHandler = (event) => {
      if (event.target.parentElement.classList.contains("btnTest")) {
        setBox(true);
      } else {
        setBox(false);
      }
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });
  return (
    <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Dashboard-Application</title>
    </Helmet>
      <section className="w-[90%] mx-auto" id="boxElem">
        <div className="mt-[50px]">
          <h2 className="capitalize text-3xl font-bold font-mono text-center">
            your all application
          </h2>
        </div>

        <div className="w-full overflow-x-scroll py-8 myApplicationScroll">
          {userPending ? (
            <div className="w-full flex justify-center items-center">
              <Loader />
            </div>
          ) : userError ? (
            <div className="w-full flex justify-center items-center">
              <ErrorCompo />
            </div>
          ) : (
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
                {
                  userData.length==0?
                  <tr>
                    <td colSpan="10" className="text-center text-2xl font-sans font-bold text-rose-600 appliedTxt">
                      you haven't applied yet
                    </td>
                  </tr>:
                  userData?.map((value, index) => {
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
                      <td
                        className={`font-bold font-serif text-slate-700 text-base ${
                          value.workStatus == "pending"
                            ? "text-[#ff4757]"
                            : value.workStatus == "processing"
                            ? "text-[#ffa502]"
                            : "text-[#2ed573]"
                        }`}
                      >
                        {value.workStatus}
                      </td>
                      <td className="text-center">
                        {value.rejected ? (
                          <h4 className="capitalize text-rose-500 font-serif text-xl font-bold">
                            rejected
                          </h4>
                        ) : value.feedback == "" ? (
                          ""
                        ) : (
                          <button
                            onClick={() => {
                              openMessage(true, value._id, value.feedback);
                            }}
                          >
                            {value.envelope ? (
                              <FaEnvelopeOpen className="text-4xl text-sky-400" />
                            ) : (
                              <FaEnvelope className="text-4xl text-green-400" />
                            )}
                          </button>
                        )}
                      </td>
                      <td>
                        {value.rejected ? (
                          ""
                        ) : (
                          <button
                            className="btnTest text-xl"
                            onClick={() => {
                              menuTab(value.scholarship_id);
                            }}
                          >
                            <CiMenuKebab />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div
          className={`fixed top-[50%] right-0 ${
            box ? "w-[20%]" : "w-[0%] right-[-5%]"
          } transition-all duration-200 ease-in bg-white rounded-lg py-2 px-2`}
        >
          <TableGroupBtn
            modalReview={reviewModal}
            handleBox={boxHandle}
            trackingEmail={user?.email}
            trackingId={tracking}
            cancelationApp={appCancelation}
            editModal={(value) => {
              setEditCon(value);
            }}
          />
        </div>
        {messageCon ? (
          <div
            className={`fixed top-0 left-0 h-screen w-full messageModal flex justify-center items-center flex-col  ${
              modalCondition ? "scale-in-br" : "scale-out-br"
            }`}
          >
            <MessageModal
              closeMessage={(value) => {
                setMessage(value);
              }}
              messageOpen={(condition, userId) => {
                openMessage(condition, userId);
              }}
              conditionModal={(value) => {
                setModalCon(value);
              }}
              containFeedback={feedbackContain}
            />
          </div>
        ) : (
          ""
        )}
        {editModalCon ? (
          <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center editModal">
            <EditModal
              closeModal={(value) => {
                setEditCon(value);
              }}
              trackId={tracking}
            />
          </div>
        ) : (
          ""
        )}
        {review ? (
          <Review modalReview={reviewModal} idTracking={tracking} />
        ) : (
          ""
        )}
      </section>
    </>
  );
}
