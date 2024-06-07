import { CiMenuKebab } from "react-icons/ci"

export default function CollectionData({information,serial,activeOption}){
    const {_id,scholarshipName,university,subject,diploma,application} = information

    return(
        <>
            <tr className=" even:bg-gray-200">
                <td className="py-4">{serial + 1}</td>
                <td>{scholarshipName}</td>
                <td>{university}</td>
                <td>{subject}</td>
                <td>{diploma}</td>
                <td>{application}</td>
                <td><CiMenuKebab className="hover:cursor-pointer" onClick={()=>{activeOption(_id)}} /></td>
            </tr>
        </>
    )
}