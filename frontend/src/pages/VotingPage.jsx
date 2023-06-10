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
        console.log("vote")
        // Validate inputs
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
        for (let candidate of candidates) {
            newChoices[candidate.name] = 1;
        }
        setChoices(newChoices)
    }, [])

    return (
        <div className="voting-page">
            <Navbar/>
            <main>
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
            </main>
            <Footer/>
        </div>
    )
}
