import "./RankedChoiceSelector.scss"
import { getPlacementSuffix } from "../../partials/stringHelper"
import React from "react"

export default function RankedChoiceSelector({ className, candidates, choices, setChoices }) {
    // TODO, defuckify? Idk it's not that bad and it works...
    return (
        <div className={"ranked-choice-selector " + className}>
            {
                candidates.map((candidate, index) => (
                    <React.Fragment key={index}>
                        <label htmlFor={candidate.name}>
                            {candidate.name}
                        </label>
                        <select 
                            id={candidate.name}
                            onChange={e => {
                                setChoices(currentChoices => {
                                    let newChoices = {...currentChoices}
                                    newChoices[candidate.name] = parseInt(e.target.value, 10) || 1;;
                                    return newChoices;
                                })
                            }} 
                        >
                            {
                                candidates.map((x, index2) => (
                                    <option key={index2}>{`${index2 + 1}${getPlacementSuffix(index2 + 1)}`}</option>
                                ))
                            }
                        </select>
                    </React.Fragment>


                ))
            }
        </div>
    )
}