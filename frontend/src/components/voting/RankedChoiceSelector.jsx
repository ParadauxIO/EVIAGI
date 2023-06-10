import "./RankedChoiceSelector.scss"
import { getPlacementSuffix } from "../../partials/stringHelper"

export default function RankedChoiceSelector({ className, candidates, choices, setChoices }) {
    // TODO, defuckify? Idk it's not that bad and it works...
    return (
        <div className={"ranked-choice-selector " + className}>
            {
                candidates.map(candidate => (
                    <>
                        <label htmlFor={candidate.name}>
                            {candidate.name}

                        </label>
                        <select 
                            id={candidate.name}
                            onChange={e => {
                                setChoices(currentChoices => {
                                    let newChoices = {...currentChoices}
                                    newChoices[candidate.name] = parseInt(e.target.value, 10);
                                    return newChoices;
                                })
                            }} 
                        >
                            {
                                candidates.map((x, index) => (
                                    <option>{`${index + 1}${getPlacementSuffix(index + 1)}`}</option>
                                ))
                            }
                        </select>
                    </>


                ))
            }
        </div>
    )
}