export default function ManagePagination({ page,selectPage,noPage }) {
  return (
    <>
      <div className="join">
        <input
          className={`join-item btn btn-square hover:shadow-inner  transition-all duration-300 ${noPage==page?"hover:shadow-none":"hover:shadow-rose-950"} mr-4 mb-4`}
          type="radio"
          name="options"
          aria-label={page}
          onClick={()=>{selectPage(page)}}
          defaultChecked={noPage==page?true:false}
        />
      </div>
    </>
  );
}
