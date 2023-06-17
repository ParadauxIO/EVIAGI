import { useParams } from "react-router-dom"
import Footer from "../components/common/Footer"
import Navbar from "../components/common/Navbar"
import "./VotingPage.scss"
import { useEffect, useState } from "react";
import RankedChoiceSelector from "../components/voting/RankedChoiceSelector";

export default function VotingPage() {
    let {electionId, electorId} = useParams();
    let [candidates, setCandidates] = useState([]);
    let [choices, setChoices] = useState({});

    const vote = () => {
        // Validate inputs
        if (hasDuplicatePreferences(choices)) {
            console.log("no vote")
            return;
        }


        console.log("vote")
    }

    const spoil = () => {
        // TODO
    }

    useEffect(() => {
        let newCandidates = [
            {
                name: "Candidate 1",
            },
            {
                name: "Candidate 5"
            },
            {
                name: "Candidate 3"
            }
        ]

        setCandidates(newCandidates)

        let newChoices = {};
        for (let candidate of newCandidates) {
            newChoices[candidate.name] = "";
        }
        setChoices(newChoices)
        console.log(newChoices)
    }, [])

    return (
        <div className="voting-page">
            <Navbar/>
            <main>
                <div className="voting-card">
                    <h1>election name</h1>
                    <p>election description</p>
                    <RankedChoiceSelector 
                        className="selector"
                        candidates={candidates} 
                        choices={choices} 
                        setChoices={setChoices} 
                    />
                    <div className="actions">
                        <button onClick={vote}>Vote</button>
                        <button onClick={spoil}>Spoil Vote</button>
                    </div>
                    <p>
                        Currently only Single Transferable Vote / Instant Runoff Vote is supported.<br/>
                        Spoiling your vote nullifies any selections made.
                    </p>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

const hasDuplicatePreferences = (choices) => {
    // Get all the preference numbers, excluding empty string (no selection made for that candidate)
    const preferences = Object.values(choices).filter(item => item !== "");

    // Create a Set from the preference numbers
    const preferenceSet = new Set(preferences);
  
    console.log(preferences, preferenceSet)
    // If the Set size is equal to the number of preferences, there are no duplicates
    return preferenceSet.size !== preferences.length;
  }