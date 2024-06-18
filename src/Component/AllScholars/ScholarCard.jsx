import { BiBadgeCheck } from "react-icons/bi";
export default function ScholarCard(){
    return(
        <>
            <div className="rounded-md shadow-md shadow-gray-400 py-2 px-2 w-[80%] grid grid-cols-[20%_77%] gap-x-4">
                <div className="p-4 w-full h-[300px]">
                    <img src="" alt="" className="h-full w-full object-cover rounded-xl" />
                </div>
                <div>
                    <h2 className="text-blue-950 font-bold font-serif text-2xl capitalize">
                        university name
                    </h2>
                    <div className="my-2">
                        <div className="flex flex-row mb-3">
                            <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-rose-500 before:table before:clear-both before:mr-2 flex items-center">location:</h2>
                            <p className="ml-4 font-mono text-base font-medium capitalize italic">write versity location</p>
                        </div>
                        <div className="flex flex-row mb-3">
                            <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-green-500 before:table before:clear-both before:mr-2 flex items-center">scholarship category:</h2>
                            <p className="ml-4 font-mono text-base font-medium capitalize italic">write category</p>
                        </div>
                        <div className="flex flex-row mb-3">
                            <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-yellow-500 before:table before:clear-both before:mr-2 flex items-center">subject:</h2>
                            <p className="ml-4 font-mono text-base font-medium capitalize italic">write subject</p>
                        </div>
                        <div className="flex flex-row mb-3">
                            <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-orange-500 before:table before:clear-both before:mr-2 flex items-center">application deadline</h2>
                            <p className="ml-4 font-mono text-base font-medium capitalize italic">write deadline</p>
                        </div>
                        <div className="flex flex-row mb-3">
                            <h2 className="text-base font-bold text-blue-400 capitalize before:h-2 before:w-2 before:rounded-full before:bg-pink-500 before:table before:clear-both before:mr-2 flex items-center">application fees</h2>
                            <p className="ml-4 font-mono text-base font-medium capitalize italic">write fees</p>
                        </div>
                        <div className="flex flex-row justify-between w-[100%] mx-auto">
                        <div className="flex flex-row items-center">
                            <span className="mr-2">
                            <BiBadgeCheck/>
                            </span>
                            <span className="capitalize text-bold font-serif text-indigo-700">rating</span>
                        </div>
                        <div>
                            <button className="scholarsBtn">
                                Details
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}