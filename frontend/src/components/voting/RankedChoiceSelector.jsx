import "./RankedChoiceSelector.scss"
import { getPlacementSuffix } from "../../partials/stringHelper"
import React from "react"
import Selector from "./Selector"

export default function RankedChoiceSelector({ className, candidates, choices, setChoices }) {
    const options = ["", ...candidates.map((candidate, index) => ({
        label: index+1 + getPlacementSuffix(index+1),
        value: index+1
    }))];

    const updateChoices = (name) => {
        return (value) => setChoices(oldChoices => ({ ...oldChoices, [name]: value }));
    }

    return (
        <div className={"ranked-choice-selector " + className}>
            {
                candidates.map((candidate, index) => (
                    <Selector
                        key={index}
                        label={candidate.name}
                        options={options}
                        value={choices[candidate.name]}
                        setValue={updateChoices(candidate.name)}
                    />
                ))
            }
        </div>
    )
}

