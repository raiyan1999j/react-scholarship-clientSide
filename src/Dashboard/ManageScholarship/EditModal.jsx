import { FaImage, FaPlus } from "react-icons/fa";
import Calendar from "react-calendar";
import { useEffect, useRef, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import Loader from "../../Loader/Loader";
import "../../App.css"
import { useFormik } from "formik";
import { Slide, toast } from "react-toastify";

const wrapObject = {
  subjectCategory: ["agriculture", "Engineering", "doctor"],
  scholarCategory: ["full fund", "partial fund", "self fund"],
  degreeCategory: ["diploma", "bachelor", "masters"],
};

export default function EditModal({ activeModal, editId }) {
  const [datePicker, onChange] = useState(new Date());
  const [container, setContainer] = useState("");
  const [modal,setModal] = useState(false);
  const [category,setCategory] = useState("");
  const optRef = useRef("")

  const formInfo = useFormik({
    enableReinitialize: true,
    initialValues:{
      university:`${container.university}`,
      scholarshipName:`${container.scholarshipName}`,
      country:`${container.country}`,
      city:`${container.city}`,
      rank:`${container.rank}`,
      tuition:`${container.tuition}`,
      application:`${container.application}`,
      service:`${container.service}`,
      postDate:`${container.postDate}`,
      email:`${container.email}`,
      photo:`${container.photo}`,
      deadline:`${container.deadline}`,
      subject:`${container.subject}`,
      scholarship:`${container.scholarship}`,
      diploma:`${container.diploma}`
    },
    onSubmit:value=>{
      publicRoute.post(`/editData?editId=${container._id}`,value)
      .then((res)=>{
        if(res.status===200){
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
      }).then(()=>{
        activeModal(false)
      })
    }
  })

  const modalOpt=(title)=>{
    setModal(!modal);
    setCategory(title);
  }

  const addToSelection=(title)=>{
    setModal(!modal)
    
    wrapObject[`${title}`].push(optRef.current.value);

    if(localStorage.getItem(`${title}`)){
      localStorage.removeItem(`${title}`);
      localStorage.setItem(`${title}`,JSON.stringify(wrapObject[`${title}`]))
    }else{
      localStorage.setItem(`${title}`,JSON.stringify(wrapObject[`${title}`]))
    }
  }

  useEffect(() => {
    async function loadData() {
      await publicRoute(`/specificId?editId=${editId}`).then((res) => {
        setContainer(res.data);
      });
    }

    loadData();
  }, [editId]);

  useEffect(() => {
    function loadSelectionData() {
      const subjectCategory =
        JSON.parse(localStorage.getItem("subjectCategory")) ||
        wrapObject.subjectCategory;

      const scholarCategory =
        JSON.parse(localStorage.getItem("scholarCategory")) ||
        wrapObject.scholarCategory;

      const degreeCategory =
        JSON.parse(localStorage.getItem("degreeCategory")) ||
        wrapObject.degreeCategory;

      wrapObject.subjectCategory = subjectCategory;
      wrapObject.scholarCategory = scholarCategory;
      wrapObject.degreeCategory = degreeCategory;
    }

    loadSelectionData();
  }, []);
  return (
    <>
      {container ? (
        <section className="w-[1200px] mx-auto">
          <div className="flex flex-row justify-end mt-14">
            <button
              className="scholarsBtn"
              onClick={() => {
                activeModal(false);
              }}
            >
              <ImCancelCircle />
            </button>
          </div>
          <form onSubmit={formInfo.handleSubmit}>
          <div className="grid grid-cols-[30%_70%] w-full mt-3 gap-x-6 mx-auto">
            <div className="shadow-xl shadow-gray-500 rounded-xl">
              <div className="py-4 bg-blue-950 border border-t-0 border-r-0 border-l-0 border-blue-950 rounded-t-lg">
                <h2 className="text-white capitalize font-mono font-bold text-xl text-center">
                  University Image
                </h2>
              </div>
              <div className="h-[350px] w-full relative">
                <img
                  src={container?.photo}
                  alt="univerSity Image"
                  className="h-full w-full object-cover absolute"
                />

                <label
                  htmlFor="image"
                  className="absolute top-[35%] left-[30%] hover:cursor-pointer"
                >
                  <input type="file" id="image" accept="image/*" hidden />
                  <FaImage className="text-white text-5xl bg-indigo-500 py-4 px-4 rounded-full translate-x-[110%] mb-2" />
                  <p className="text-white bg-indigo-500 rounded-full px-2 font-mono capitalize">
                    Browse your image
                  </p>
                </label>
              </div>
            </div>
            <div className="shadow-xl shadow-gray-500 rounded-xl">
              <div className="py-4 bg-blue-950 rounded-t-lg text-white">
                <h2 className="text-white capitalize font-mono font-bold text-xl text-center">
                  scholarship information
                </h2>
              </div>
              <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl text-blue-950 font-bold font-mono">
                  Information
                </div>
                <div className="collapse-content">
                  <div className="flex flex-row justify-around">
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        university name
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.university}
                        {...formInfo.getFieldProps('university')}
                      />
                    </div>
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-serif tracking-widest">
                        scholarship name
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.scholarshipName}
                        {...formInfo.getFieldProps('scholarshipName')}
                      />
                    </div>
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-serif tracking-widest">
                        university country
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.country}
                        {...formInfo.getFieldProps('country')}
                      />
                    </div>
                  </div>
                  {/* second-row */}
                  <div className="flex flex-row justify-around mt-8">
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        scholarship city
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.city}
                        {...formInfo.getFieldProps('city')}
                      />
                    </div>
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        world rank
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.rank}
                        {...formInfo.getFieldProps('rank')}
                      />
                    </div>
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        tuition fees
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.tuition}
                        {...formInfo.getFieldProps('tuition')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl text-blue-950 font-bold font-mono">
                  Category
                </div>
                <div className="collapse-content">
                  <div className="grid grid-cols-3 gap-x-4 justify-between">
                    <div>
                      <p className="bg-neutral rounded-full text-white px-4 mb-2 capitalize font-mono tracking-widest">
                        subject category
                      </p>
                      <div className="flex flex-row">
                        <select
                          className="bg-transparent shadow-xl shadow-gray-600 rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold"
                          
                          {...formInfo.getFieldProps('subject')}
                        >
                        <option defaultValue={container.subject}>
                          {container.subject}
                        </option>
                          {wrapObject.subjectCategory.map((value, index) => {
                            return (
                              <option value={value} key={index}>
                                {value}
                              </option>
                            );
                          })}
                        </select>
                        <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400" onClick={()=>{modalOpt('subjectCategory')}}>
                          <FaPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="bg-neutral rounded-full text-white px-4 mb-2 capitalize font-mono tracking-widest">
                        scholarship category
                      </p>
                      <div className="flex flex-row">
                        <select
                          className="bg-transparent shadow-xl shadow-gray-600 rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold"
                          {...formInfo.getFieldProps('scholarship')}
                        >
                        <option defaultValue={container.scholarship}>
                          {container.scholarship}
                        </option>
                          {wrapObject.scholarCategory.map((value, index) => {
                            return (
                              <option value={value} key={index}>
                                {value}
                              </option>
                            );
                          })}
                        </select>
                        <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400"onClick={()=>{modalOpt('scholarCategory')}}>
                          <FaPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="bg-neutral rounded-full text-white px-4 mb-2 capitalize font-mono tracking-widest">
                        diploma category
                      </p>
                      <div className="flex flex-row">
                        <select className="bg-transparent shadow-xl shadow-gray-600 rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold"
                        {...formInfo.getFieldProps('diploma')}
                        >
                        <option defaultValue={container.diploma}>
                          {container.diploma}
                        </option>
                          {wrapObject.degreeCategory.map((value, index) => {
                            return (
                              <option value={value} key={index}>
                                {value}
                              </option>
                            );
                          })}
                        </select>
                        <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400" onClick={()=>{modalOpt('degreeCategory')}}>
                          <FaPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="collapse collapse-plus">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl text-blue-950 font-bold font-mono">
                  Date & Others
                </div>
                <div className="collapse-content">
                  <div className="flex flex-row justify-between mb-6">
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        application fees
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.application}
                        {...formInfo.getFieldProps('application')}
                      />
                    </div>
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        service charge
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.service}
                        {...formInfo.getFieldProps('service')}
                      />
                    </div>
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        posted email
                      </p>
                      <input
                        type="text"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder={container?.email}
                        {...formInfo.getFieldProps('email')}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div>
                      <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">
                        Post Date
                      </p>
                      <input
                        type="date"
                        className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize"
                        placeholder="Post Date"
                        {...formInfo.getFieldProps('postDate')}
                      />
                    </div>
                    <div>
                      <Calendar onChange={onChange} value={datePicker} defaultActiveStartDate={new Date(container?.deadline)}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          <div className="flex flex-row justify-end">
            <button className="scholarsBtn font-mono font-bold" type="submit">
              Update Scholarship
            </button>
          </div>
          </form>
        </section>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {
        modal?
        <div className="w-[30%] absolute top-[50%] left-[50%] selectionModal py-5 px-5 z-40">
        <div className="py-4 bg-success text-white rounded-t-xl">
          <h2 className="pl-4 capitalize font-bold font-serif">
          {category}
          </h2>
        </div>
        <div>
          <input type="text" className="py-4 pl-4 font-mono mt-4 rounded-xl w-full bg-transparent" ref={optRef} />
        </div>
        <div className="flex flex-row justify-between my-4">
          <button className="py-2 px-4 bg-rose-500 text-white font-mono rounded-xl hover:bg-rose-800" onClick={()=>setModal(false)}>Cancel</button>
          <button className="py-2 px-4 bg-success text-white font-moo rounded-xl hover:bg-green-800" onClick={()=>{addToSelection(`${category}`)}}>Add</button>
        </div>
      </div>:""
      }
      
    </>
  );
}
