import { useEffect, useState } from "react";
import {  FaPlus } from "react-icons/fa";
import AddCategory from "./AddCategory";

const wrapObject = {
    subjectCategory:["agriculture","Engineering","doctor"],
    scholarCategory:["full fund","partial fund","self fund"],
    degreeCategory :["diploma","bachelor","masters"]
}

export default function Selection(){
    const [modal,setModal] = useState(false)
    const [state,setState] = useState("");
    
    const showHide=(condition,subCategory)=>{
        setModal(condition);
        setState(subCategory);
    }

    const updateCollection=(title,option)=>{
        wrapObject[`${title}`].push(option)

        if(localStorage.getItem(`${title}`)){
            localStorage.removeItem(`${title}`);
            localStorage.setItem(`${title}`,JSON.stringify(wrapObject[`${title}`]))
        }else{
            localStorage.setItem(`${title}`,JSON.stringify(wrapObject[`${title}`]))
        }
    }

    useEffect(()=>{
        function collectReplace(){
        const subjectCategory =JSON.parse(localStorage.getItem('subjectCategory'))  || wrapObject.subjectCategory;

        const scholarCategory=JSON.parse(localStorage.getItem('scholarCategory'))  || wrapObject.scholarCategory;

        const degreeCategory =JSON.parse(localStorage.getItem('degreeCategory'))  || wrapObject.degreeCategory;

        wrapObject.subjectCategory= subjectCategory;
        wrapObject.scholarCategory= scholarCategory;
        wrapObject.degreeCategory = degreeCategory;
        }
        
        collectReplace()
    },[])
    return(
        <>
        {
            modal?<AddCategory stateInfo={state} hideBox={(value)=>{setModal(value)}} collectionUpdate={updateCollection}/>
            :
            <div className="grid grid-cols-3 gap-x-4 w-full mb-8">
                <div>
                <p className="font-mono capitalize text-white font-medium bg-neutral rounded-full text-center mb-4">Subject category</p>
                <div className="flex flex-row">
                  <select
                    className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-[80%] py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-500 font-bold"
                    placeholder="subject-category"
                  >
                    {
                        wrapObject.subjectCategory.map((value,index)=>{
                            return <option value={value} key={index}>{value}</option>
                        })
                    }
                  </select>
                  <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400" onClick={()=>{showHide(true,"subjectCategory")}}>
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                </div>
                <div>
                <p className="font-mono capitalize text-white font-medium bg-neutral rounded-full text-center text-sm mb-4">Scholarship Category</p>
                <div className="flex flex-row">
                  <select className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold">
                    {
                        wrapObject.scholarCategory.map((value,index)=>{
                            return <option key={index} value={value}>{value}</option>
                        })
                    }
                  </select>
                  <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400" onClick={()=>{showHide(true,"scholarCategory")}}>
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                </div>
                <div>
                <p className="font-mono capitalize text-white font-medium bg-neutral rounded-full text-center mb-4">Diploma Category</p>
                <div className="flex flex-row">
                  <select className="bg-transparent shadow-md shadow-[#bdc3c7] rounded-md w-full py-2 px-3 placeholder:font-mono placeholder:font-bold placeholder:capitalize font-mono text-gray-600 font-bold">
                    {
                        wrapObject.degreeCategory.map((value,index)=>{return <option key={index} value={value}>{value}</option>})
                        }
                  </select>
                  <button className="py-2 px-2 shadow-lg shadow-gray-400 rounded-lg hover:bg-gray-400" onClick={()=>{showHide(true,"degreeCategory")}}>
                    <FaPlus className="text-sm" />
                  </button>
                </div>
                </div>
              </div>
        }
            
        </>
    )
}