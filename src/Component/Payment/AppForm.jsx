export default function AppForm() {
  return (
    <>
      <div className="w-[70%] mx-auto rounded-xl shadow-lg shadow-indigo-500 py-8 px-8">
        <div className="mb-4">
          <div className="h-[200px] w-[170px] border-double border-gray-500 border-[4px] rounded-lg">
            <img
              src=""
              alt="applicant photo"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="mb-4">
            <input
              type="text"
              className="py-2 bg-transparent border-b-blue-600 border w-[20%] placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
              placeholder="applicant phone number"
            />
          </div>
          <div className="mb-4">
            <select className="select rounded-none border border-b-blue-600 w-[20%] max-w-xs text-blue-600/60 font-mono font-bold text-base capitalize pl-0">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>
          <div className="grid grid-cols-3 w-full mb-4">
            <span>
              <input
                type="text"
                placeholder="country"
                className="w-[90%] py-2 bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="district"
                className="w-[90%] py-2 bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
              />
            </span>
            <span>
              <input
                type="text"
                placeholder="village/road"
                className="w-[90%] py-2 bg-transparent border border-b-blue-600 placeholder:text-blue-600/60  placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize"
              />
            </span>
          </div>
          <div className="flex flex-row w-[100%] mx-auto mb-4">
            <div className="w-full">
            <select className="select rounded-none border border-b-blue-600 w-[50%] max-w-xs text-blue-600/60 font-mono font-bold text-base capitalize pl-0">
            <option disabled>Degree</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            </div>
            <div className="w-full flex justify-end pr-9">
            <select className="select rounded-none border border-b-blue-600 w-[50%] max-w-xs text-blue-600/60 font-mono font-bold text-base capitalize pl-0">
            <option disabled>Study gap(optional)</option>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
            </div>
          </div>

          <div className="flex flex-row w-[100%] mx-auto mb-4">
            <div className="w-full">
            <input type="text" placeholder="SSC result " className="py-2 bg-transparent border-b-blue-600 border w-[50%] placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" />
            </div>
            <div className="w-full flex justify-end pr-9">
            <input type="text" placeholder="HSC result " className="py-2 bg-transparent border-b-blue-600 border w-[50%] placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" />
            </div>
          </div>

          <div className="flex flex-row w-[100%] mx-auto mb-4">
            <div className="w-full">
            <input type="text" placeholder="subject category " className="py-2 bg-transparent border-b-blue-600 border w-[50%] placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" />
            </div>
            <div className="w-full flex justify-end pr-9">
            <input type="text" placeholder="scholarship category" className="py-2 bg-transparent border-b-blue-600 border w-[50%] placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" />
            </div>
          </div>

          <div className="w-full mx-auto mb-4">
            <div>
                <input type="text" placeholder="university name" className="py-2 bg-transparent border-b-blue-600 border w-[25%] placeholder:text-blue-600/60 placeholder:font-mono placeholder:font-bold placeholder:text-base placeholder:capitalize" />
            </div>
          </div>

          <div className="mt-5">
            <button className="border-[4px] w-full py-4 rounded-xl border-gray-500 border-double text-xl font-mono font-bold text-slate-900 hover:shadow-inner hover:shadow-indigo-900 hover:border-none hover:bg-indigo-300 hover:text-white transition-all duration-300 ease-in">
                Submit application
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
