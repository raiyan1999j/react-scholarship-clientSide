import  Rating  from "@mui/material/Rating";

export default function StudentReview({information}){
    const {rating,currentDate,feedback,image,userName,email} = information;
    return(
        <>
            <div className="flex flex-row justify-center items-center w-full">
                <div className="w-[20%] rounded-lg shadow-xl shadow-black">
                    <div className="w-full h-[200px]">
                        <img src={image} alt="reviewImage" className="h-full w-full rounded-t-lg object-cover"/>
                    </div>
                    <div className="my-4">
                        <h2 className="capitalize font-serif font-bold text-xl text-center">
                            {userName}
                        </h2>
                    </div>
                    <p className=" bg-indigo-400 text-indigo-100 capitalize font-mono">
                            {email}
                        </p>
                </div>
                <div className="w-[50%] shadow-lg shadow-slate-400 rounded-lg px-2 py-4 ml-8">
                    <h5 className="badge badge-neutral ml-4">
                        {currentDate}
                    </h5>
                    <div className="w-[95%] mx-auto border border-slate-300/50 rounded-lg p-2 font-serif text-base my-4">
                        <p>
                            {feedback}
                        </p>
                    </div>
                    <div className="ml-4">
                        <Rating defaultValue={Number(rating)} precision={0.5} size="small" readOnly/>
                    </div>
                </div>
            </div>
        </>
    )
}