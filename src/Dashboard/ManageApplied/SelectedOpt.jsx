import AppliedDetails from "./AppliedDetails";
import AppliedFeedback from "./AppliedFeedback";

export default function SelectedOpt({info,optionModal,conditionModal,appReject}){

    return(
        <>
            <div className="h-screen w-screen flex justify-center items-center">
                {
                    info.option=="details"?
                    <AppliedDetails 
                    trackId={info.track.userId}
                    modalCondition={conditionModal}
                    modalOption={optionModal}
                    rejectApp={appReject}
                    />:
                    <AppliedFeedback 
                    modalCondition={conditionModal}
                    modalOption={optionModal}
                    trackId={info.track.userId}
                    userMail={info.track.email}
                    />
                }
            </div>
        </>
    )
}