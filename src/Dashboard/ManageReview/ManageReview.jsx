import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { publicRoute } from "../../PublicRoute/PublicRoute";
import Loader from "../../Loader/Loader";
import ErrorCompo from "../../ErrorCompo/ErrorCompo";
import ReviewCard from "./ReviewCard";
import { MdRateReview } from "react-icons/md";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "scholarsBtn mr-4",
    cancelButton: "btn btn-outline btn-secondary",
  },
  buttonsStyling: false,
});

export default function ManageReview() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["manageReview"],
    queryFn: () => {
      return publicRoute("/allUserReview").then((res) => res.data);
    },
  });

  const removeReview = useMutation({
    mutationFn: (id) => {
      return publicRoute.delete(`/reviewRemove?trackId=${id}`).then((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manageReview"]);
    },
  });

  const reviewRemove = (trackId) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          removeReview.mutate(trackId);
        }
      });
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard-ManageReviews</title>
      </Helmet>
      <section className="w-[90%] mx-auto">
        <div className="w-[90%] flex justify-center my-5">
          <div className="h-[80px] w-[80px] rounded-full manageReviewBorder flex justify-center items-center">
            <MdRateReview className="text-3xl text-slate-800" />
          </div>
        </div>
        <div className="w-[90%] mb-5">
          <h2 className="capitalize text-center font-sans appliedTxt text-xl font-bold tracking-widest">
            all user's review
          </h2>
        </div>
        {isPending ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <ErrorCompo />
        ) : (
          <div className="grid grid-cols-3 gap-x-8 gap-y-8">
            {data.map((value, index) => {
              return (
                <ReviewCard
                  removeReview={reviewRemove}
                  info={value}
                  key={index}
                />
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
