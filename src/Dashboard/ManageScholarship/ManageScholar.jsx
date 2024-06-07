import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import CollectionData from "./CollectionData";
import "../../App.css";
import OptionBox from "./OptionBox";
import EditModal from "./EditModal";

export default function ManageScholar(){
    const [allInfo,setAllInfo] = useState(null);
    const [box,setBox] = useState(false);
    const [modal,setModal] = useState(false);
    const [id,setId] = useState(null);

    const optionActive=(value)=>{
        setBox(!box)
        setId(value)
    }

    const modalActive=(value)=>{
        setModal(value);
        setBox(false)
    }
    useEffect(()=>{
        publicRoute('/getScholarData')
        .then((res)=>{setAllInfo(res.data)})
    },[allInfo])
    return(
        <>
            <section >
                <div className="flex flex-row justify-center my-8">
                <input type="text" placeholder="Type here" className="py-2 border border-gray-400 bg-transparent rounded-lg w-[30%] placeholder:pl-4" />
                <button className="btn btn-outline btn-success ml-2">
                <IoSearchOutline />
                </button>
                </div>
                <table className="table-auto w-[95%] text-left capitalize table-zebra table mx-auto">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Scholarship name</th>
                            <th>university name</th>
                            <th>subject category</th>
                            <th>applied degree</th>
                            <th>application fees</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allInfo?.map((value,index)=>{
                                return <CollectionData key={index} serial={index} information={value} activeOption={optionActive} />
                            })
                        }
                    </tbody>
                </table>

                <div className={`fixed top-[50%] right-0 ${box?"w-[20%]":"w-[0%] right-[-5%]"} transition-all duration-200 ease-in bg-white rounded-lg py-2 px-2`}>
                    <OptionBox activeOption={optionActive} activeModal={modalActive}/>
                </div>
                {
                    modal?<div className="fixed top-0 left-0 h-full w-full editScholar overflow-y-scroll"><EditModal editId={id} activeModal={modalActive}/></div>:""
                }
            </section>
        </>
    )
}