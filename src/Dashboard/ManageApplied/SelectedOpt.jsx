import AppliedDetails from "./AppliedDetails";
import AppliedFeedback from "./AppliedFeedback";

export default function SelectedOpt({info,optionModal,conditionModal}){

    return(
        <>
            <div className="h-screen w-screen flex justify-center items-center">
                {
                    info.option=="details"?
                    <AppliedDetails 
                    trackId={info.track}
                    modalOption={optionModal}
                    modalCondition={conditionModal}
                    />:
                    <AppliedFeedback/>
                }
            </div>
        </>
    )
}