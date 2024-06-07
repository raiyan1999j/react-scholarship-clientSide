import { FaImage, FaPlus } from "react-icons/fa";
import Calendar from "react-calendar";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";

export default function EditModal({activeModal}) {
    const [datePicker, onChange] = useState(new Date());
  return (
    <>
    <section className="w-[1200px] mx-auto">
    <div className="flex flex-row justify-end mt-14">
        <button className="scholarsBtn" onClick={()=>{activeModal(false)}}><ImCancelCircle /></button>
    </div>
      <div className="grid grid-cols-[30%_70%] w-full mt-3 gap-x-6 mx-auto">
        <div className="shadow-xl shadow-gray-500 rounded-xl">
          <div className="py-4 bg-blue-950 border border-t-0 border-r-0 border-l-0 border-blue-950 rounded-t-lg">
            <h2 className="text-white capitalize font-mono font-bold text-xl text-center">University Image</h2>
          </div>
          <div className="h-[350px] w-full relative">
            <img src="" alt="" />

            <label htmlFor="image" className="absolute top-[35%] left-[30%] hover:cursor-pointer">
                <input type="file" id="image" accept="image/*" hidden />
                <FaImage className="text-white text-5xl bg-indigo-500 py-4 px-4 rounded-full translate-x-[110%] mb-2"/>
            <p className="text-white bg-indigo-500 rounded-full px-2 font-mono capitalize">Browse your image</p>
            </label>
          </div>
        </div>
        <div className="shadow-xl shadow-gray-500 rounded-xl">
        <div className="py-4 bg-blue-950 rounded-t-lg text-white">
            <h2 className="text-white capitalize font-mono font-bold text-xl text-center">scholarship information</h2>
        </div>
          <div className="collapse collapse-plus">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl text-blue-950 font-bold font-mono">
              Information
            </div>
            <div className="collapse-content">
              <div className="flex flex-row justify-around">
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">university name</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="university name" />
                </div>
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-serif tracking-widest">scholarship name</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="scholarship name" />
                </div>
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-serif tracking-widest">university country</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="university country" />
                </div>
              </div>
              {/* second-row */}
              <div className="flex flex-row justify-around mt-8">
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">scholarship city</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="scholarship city" />
                </div>
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">world rank</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="world rank" />
                </div>
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">tuition fees</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="tuition fees" />
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
              <div className="flex flex-row justify-between">
                <div>
                    <p className="bg-neutral rounded-full text-white px-4 mb-2 capitalize font-mono tracking-widest">subject category</p>
                    <div className="flex flex-row">
                    <select className="bg-transparent shadow-xl shadow-gray-600 rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold">
                        <option>accounting</option>
                    </select>
                    <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400">
                    <FaPlus className="text-sm" />
                  </button>
                    </div>
                </div>
                <div>
                    <p className="bg-neutral rounded-full text-white px-4 mb-2 capitalize font-mono tracking-widest">scholarship category</p>
                    <div className="flex flex-row">
                    <select className="bg-transparent shadow-xl shadow-gray-600 rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold">
                        <option>accounting</option>
                    </select>
                    <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400">
                    <FaPlus className="text-sm" />
                  </button>
                    </div>
                </div>
                <div>
                    <p className="bg-neutral rounded-full text-white px-4 mb-2 capitalize font-mono tracking-widest">diploma category</p>
                    <div className="flex flex-row">
                    <select className="bg-transparent shadow-xl shadow-gray-600 rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold">
                        <option>accounting</option>
                    </select>
                    <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400">
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
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">application fees</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="application fees" />
                </div>
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">service charge</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="service charge" />
                </div>
                <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">posted email</p>
                    <input type="text" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="posted email" />
                </div>
              </div>
              <div className="flex flex-row justify-between">
              <div>
                    <p className=" bg-neutral rounded-full text-white pl-4 mb-2 capitalize font-mono tracking-widest">Post Date</p>
                    <input type="date" className="bg-transparent shadow-lg shadow-gray-500 py-2 rounded-xl placeholder:text-gray-500 placeholder:font-bold placeholder:pl-2 placeholder:capitalize" placeholder="Post Date" />
                </div>
                <div>
                <Calendar onChange={onChange} value={datePicker} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end">
          <button className="scholarsBtn font-mono font-bold" type="submit">Add Scholarship</button>
        </div>
      </section>
    </>
  );
}
