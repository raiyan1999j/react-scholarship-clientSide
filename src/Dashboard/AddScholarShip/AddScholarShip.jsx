import { useRef } from "react";
import {FaImages} from 'react-icons/fa'

import Selection from './Selection';

export default function AddScholarship() {
  return (
    <>
      <section className="px-10 mt-[50px]">
        <div className="grid grid-cols-[60%_30%] gap-x-6">
          <div className="border border-gray-300 rounded-xl">
            <div className="w-full py-2 border border-b-gray-300">
              <h2 className="pl-6 font-serif text-xl font-bold capitalize text-blue-950">
                Scholarship Information
              </h2>
            </div>
            <div className="px-5 py-5">
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="University Name"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Scholarship name"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="University Country"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Scholarship City"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="world rank"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="tuition fees"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
              </div>
              <Selection/>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="Application fees"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="service charge"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="date"
                    placeholder="application post date"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Posted user email"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="border border-gray-300 rounded-xl mb-6">
              <div className="py-2 border border-b-gray-300">
                <h2 className="pl-4 text-xl capitalize font-serif text-blue-950 font-bold">
                  university image
                </h2>
              </div>
              <div className="relative h-[250px]">
                <label
                  htmlFor="photo"
                  className="absolute w-full top-[35%] left-[25%] hover:cursor-pointer"
                >
                  <span>
                    <FaImages className="text-4xl translate-x-[125%]" />
                    <p className="text-blue-950 font-medium font-mono">
                      Browse your Image
                    </p>
                  </span>
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="border border-gray-300 rounded-xl">
              <div>
                <h2>application deadline</h2>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
