
export default function ScholarPagination({pageNumber,paginationNumber,pageNumberSet}){
    return(
        <>
            <div className="join">
            <input
              className={`join-item btn btn-square hover:shadow-inner  transition-all duration-300 ${paginationNumber==pageNumber?"hover:shadow-none":"hover:shadow-rose-950"} mr-4`}
              type="radio"
              name="options"
              aria-label={pageNumber}
              defaultChecked={paginationNumber==pageNumber?true:false}
              onClick={()=>{pageNumberSet(pageNumber)}}
            />
          </div>
        </>
    )
}