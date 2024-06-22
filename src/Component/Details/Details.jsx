import { useLoaderData, useNavigate } from "react-router-dom";

export default function Details() {
  const {
    _id,
    university,
    scholarshipName,
    country,
    city,
    deadline,
    subject,
    postDate,
    service,
    application,
    photo,
    description
  } = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <section className="w-[1200px] mx-auto mt-[100px]">
        <div className="grid grid-cols-2 justify-center gap-x-5 w-[80%] mx-auto">
          <div className="h-auto w-full">
            <img
              src={photo}
              alt="coverPhoto"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="capitalize text-blue-950 font-serif font-bold text-3xl">
              {university}
            </h2>

            <div className="mt-[30px]">
              <table className="table table-zebra-zebra border border-gray-500 w-full">
              <tbody>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      scholarship category
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {scholarshipName}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      Location
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {country}, {city}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      Subject
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {subject}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      description
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                        {description}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      application deadline
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {deadline}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      post date
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {postDate}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      service charge
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {service}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300/90 w-[40%]">
                    <h2 className="capitalize font-semibold text-base text-indigo-500">
                      application fees
                    </h2>
                  </td>
                  <td className="border border-gray-300/90 w-[60%]">
                    <p className="capitalize font-medium font-mono text-sm text-indigo-950">
                      {application}
                    </p>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="w-[1200px] mx-auto mt-[40px]">
        <div className="grid grid-cols-2 gap-x-5 w-[80%] mx-auto">
          <div></div>
          <div>
            <button className="w-full border border-black/50 py-4 text-gray-600 font-bold font-sans transition-all duration-500 hover:border-none hover:bg-gray-500/50 hover:text-white hover:scale-95" onClick={()=>{navigate(`/payment/${_id}`)}}>
              Apply scholarship
            </button>
          </div>
        </div>
      </section>

      <section className="w-[1200px] mx-auto mt-10">
        <div className="flex flex-col w-full border-opacity-50">
          <div className="divider font-bold text-gray-500">Reviews</div>
        </div>
      </section>
    </>
  );
}
