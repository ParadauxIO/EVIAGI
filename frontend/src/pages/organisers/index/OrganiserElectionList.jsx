import { Link } from "react-router-dom"
import "./OrganiserElectionList.scss"

export default function OrganiserElectionList() {
    // If no session, redirect to auth with redirectTo set.


    // Get all elections

    return (
        <main className="main election-list desktop-only">
            <div className="election-list-items">

            </div>

            <Link to="/organisers/elections/create" className="election-new-button">
                Create a new election.
            </Link>
        </main>
    )
}