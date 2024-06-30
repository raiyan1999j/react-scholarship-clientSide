import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { InfoContainer } from "../../../AuthProvider/AuthProvider";
import { publicRoute } from "../../../PublicRoute/PublicRoute";
import { cssTransition, toast } from "react-toastify";

const customAnimation = cssTransition({
  enter:"animate__animated animate__slideInRight",
  exit:"animate__animated animate__bounceOutUp",
  appendPosition:false,
  collapse:true,
  collapseDuration:300
})

export default function Review({ modalReview,idTracking }) {
  const [modalCon, setModal] = useState(true);
  const [currentDate,setDate] = useState();
  const [ratingPoint,setRating]=useState();
  const [addInfo,setInfo] = useState([]);
  const {user} = useContext(InfoContainer);

  const viewBox = () => {
    setModal(false);
    setTimeout(() => {
      modalReview(false);
    }, 500);
  };

  const ratingTrack=(event)=>{
    setRating(event.target.value)
  }

  const formInfo=useFormik({
    enableReinitialize:true,
    initialValues:{
      rating:`${ratingPoint}`,
      currentDate:`${currentDate}`,
      feedback:''
    },

    onSubmit:value=>{
      value.scholarshipName = addInfo.scholarshipName;
      value.university = addInfo.university;
      value.university_id=addInfo._id;
      value.userName = user.displayName;
      value.image = user.photoURL;
      value.email = user.email;

      publicRoute.post('/userReview',value)
      .then((res)=>{
        if(res.status==200){
          toast.success('Your review added',{
            transition:customAnimation,
            autoClose:2000
          })
        }
      })
    }
  })
  useEffect(()=>{
    const fundamental = new Date();
    const year = fundamental.getFullYear();
    const month= fundamental.getMonth();
    const date = fundamental.getDate();

    const format = `${year}-${month}-${date}`;

    setDate(format)

    publicRoute(`/additionalData?trackingId=${idTracking}`)
    .then((res)=>{
      setInfo(res.data)
    })
  },[])
  return (
    <>
      <div className="fixed top-0 left-[300px] h-screen w-screen reviewModal transition-all duration-300 ease-in">
      <form onSubmit={formInfo.handleSubmit}>
        <div
          className={`w-[400px] reviewModalBox rounded-xl fixed top-[15%] right-[25%] px-4 overflow-hidden ${
            modalCon ? "scale-in-br" : "scale-out-br"
          }`}
        >
          <div className="w-full flex justify-center">
            <h2 className="capitalize text-center font-sans font-bold py-4 bg-blue-950 w-[50%] text-white">
              place your feedback
            </h2>
          </div>
          <div className="flex flex-row justify-between w-[95%] py-4 font-mono capitalize">
            <div className=" w-1/2">
              <h5 className="text-sm font-black">rating:</h5>
              <div>
                <div className="rating rating-sm rating-half">
                  <input
                    type="radio"
                    name="rating-10"
                    className="rating-hidden"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    value="0.5"
                    onChange={ratingTrack}
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    value="1"
                    onChange={ratingTrack}
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    value="1.5"
                    onChange={ratingTrack}
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    value="2"
                    onChange={ratingTrack}
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2 mask-half-1 bg-green-500"
                    value="2.5"
                    onChange={ratingTrack}
                  />
                  <input
                    type="radio"
                    name="rating-10"
                    className="mask mask-star-2 mask-half-2 bg-green-500"
                    value="3"
                    onChange={ratingTrack}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <h5 className="text-sm font-black">date:</h5>
              <input
                type="text"
                className="bg-transparent shadow-inner shadow-indigo-500 rounded-lg py-1 w-[100%] hover:cursor-not-allowed font-bold tracking-widest"
                defaultValue={currentDate} disabled
              />
            </div>
          </div>
          <div>
            <textarea
              className="h-[250px] w-full bg-transparent shadow-inner shadow-slate-500/50 rounded-xl placeholder:font-mono placeholder:font-semibold placeholder:capitalize placeholder:p-3 font-mono capitalize pl-4 pt-2 font-bold text-base text-slate-700"
              placeholder="write your review"
              {...formInfo.getFieldProps('feedback')}
            ></textarea>
          </div>
          <div className="flex flex-row justify-between py-8">
            <button className="btn-17" type="submit">Add Review</button>
            <button className="btn-17" onClick={viewBox}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
