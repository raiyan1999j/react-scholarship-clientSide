import '../App.css';

export default function Loader({width}){
    return(
        <>
            <div className={`loader ${width?`w-[${width}px]`:"w-[50px]"}`}>
                
            </div>
        </>
    )
}