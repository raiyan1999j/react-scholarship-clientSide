import { useEffect, useState } from "react";
import {FaImages} from 'react-icons/fa';
import axios from "axios";
import "../../App.css";
import Selection from './Selection';
import { useFormik } from "formik";
import Calendar from "react-calendar";


export default function AddScholarship() {
  const [selectOpt,setSelectOpt] = useState({});
  const [imgView,setImg] = useState(null);
  const [value, onChange] = useState(new Date());

  const formInfo = useFormik({
    initialValues:{
      university:'',
      scholarship:'',
      country:'',
      city:'',
      rank:'',
      tuition:'',
      application:'',
      service:'',
      postDate:'',
      email:'',
      photo:'',
      deadline:'',
      subject:'',
      scholarship:'',
      diploma:''
    },
    onSubmit:value=>{
      console.log(value)
    }
  })

  const selectionHandle=(name,value)=>{
    setSelectOpt(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const imgHandler=async(event)=>{
    const body = new FormData();
    const file = event.target.files[0];
    const reader= new FileReader();

    body.set('key',import.meta.env.VITE_IMGBB);
    body.append('image',file);

    reader.onloadend=()=>{
      setImg(reader.result)
    }

    if(file){
      reader.readAsDataURL(file)
    }

    await axios({
      method:'post',
      url: 'https://api.imgbb.com/1/upload',
      data:body
    }).then((res)=>{formInfo.setFieldValue('photo',res.data.data.display_url)})
  }

  useEffect(()=>{
    Object.keys(selectOpt).forEach(value=>{
      formInfo.setFieldValue(value,selectOpt[value])
    })
  },[selectOpt])

  useEffect(()=>{
    formInfo.setFieldValue('deadline',value)
  },[value])
  return (
    <>
      <section className="px-10 mt-[50px]">
      <form onSubmit={formInfo.handleSubmit}>
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
                    {...formInfo.getFieldProps('university')}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Scholarship name"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('scholarship')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="University Country"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('country')}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Scholarship City"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('city')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="world rank"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('rank')}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="tuition fees"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('tuition')}
                  />
                </div>
              </div>
              <Selection handleSelection={selectionHandle}/>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                  <input
                    type="text"
                    placeholder="Application fees"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('application')}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="service charge"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize"
                    {...formInfo.getFieldProps('service')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 w-full mb-8">
                <div>
                <p className="capitalize font-mono font-medium bg-neutral  text-white text-center rounded-full">scholarship post date</p>
                  <input
                    type="date"
                    placeholder="application post date"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold"
                    {...formInfo.getFieldProps('postDate')}
                  />
                </div>
                <div>

                  <input
                    type="text"
                    placeholder="Posted user email"
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize mt-6"
                    {...formInfo.getFieldProps('email')}
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
              {
                imgView?
                <div className="absolute h-full w-full top-0 left-0">
                <img src={imgView} alt="versityImg" className="h-full w-full object-cover rounded-b-lg" />
              </div>:""
              }
              
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
                    name="photo"
                    onChange={imgHandler}
                  />
                </label>
              </div>
            </div>
            <div className="border border-gray-300 rounded-xl">
            <div className="py-2 border border-b-gray-300">
                <h2 className="pl-4 text-xl capitalize font-serif text-blue-950 font-bold">
                  Application deadline
                </h2>
              </div>
              <div >
              <Calendar onChange={onChange} value={value} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <button className="scholarsBtn font-mono font-bold" type="submit">Add Scholarship</button>
        </div>
      </form>
      </section>
    </>
  );
}
