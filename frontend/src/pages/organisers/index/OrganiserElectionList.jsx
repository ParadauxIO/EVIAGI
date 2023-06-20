import { Link, useNavigate } from "react-router-dom"
import "./OrganiserElectionList.scss"
import { useEffect, useState } from "react"
import { supabase} from "../../../state/supabase"
import { formatDate } from "../../../partials/dateHelper";

export default function OrganiserElectionList() {
    // If no session, redirect to auth with redirectTo set.
    const [elections, setElections] = useState([]);
    const navigate = useNavigate();

    async function doAction(id, action) {
        const { data: { session } } = await supabase.auth.getSession()
        let url = `${import.meta.env.VITE_API_LINK}/elections/${id}/`;

        if (action !== "delete") {
            url = url + "/" + action;
        }

        let resp = await fetch(url, {
            method: action === "delete" ? "DELETE" : "PATCH",
            headers: {
                Authorization: `Bearer ${session.access_token}`
            }
        })

        await fetchData();
    }

    const fetchData = async () => {
        const { data: { session } } = await supabase.auth.getSession()
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/elections/`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });
            console.log(session.access_token)

            const electionsResp = await response.json();

            console.log(electionsResp)
            setElections(electionsResp);
        } catch (error) {
            console.error('Error fetching election data:', error);
        }
    };

    // Get all elections
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className="main election-list desktop-only">
            <table className="election-list-items">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Opens</th>
                        <th>Closes</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {elections.map((item, index) => (
                        <tr className="election-list-item" key={index}>
                            <td> {item.name} </td>
                            <td> {formatDate(new Date(item.opens))} </td>
                            <td> {formatDate(new Date(item.closes))}</td>
                            <td> {item.description.slice(0, 50)}{item.description.length>50 && <>...</>}</td>
                            <td>
                                {/* <span className="action" onClick={() => doAction(item.election_id, "open")}>Open</span> &middot;&nbsp;
                                <span className="action" onClick={() => doAction(item.election_id, "close")}>Close</span> &middot;&nbsp; */}
                                <span className="action" onClick={() => navigate(`/organisers/election/${item.election_id}/edit`)}>Edit</span> &middot;&nbsp;
                                <span className="action" onClick={() => navigate(`/organisers/election/${item.election_id}/candidates`)}>Candidates</span> &middot;&nbsp;
                                <span className="action" onClick={() => navigate(`/election/${item.election_id}/vote/electorate/test`)}>Vote</span> &middot;&nbsp;

                                <span className="action" onClick={() => doAction(item.election_id, "delete")}>Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <Link to="/organisers/elections/create" className="election-new-button">
                Create a new election.
            </Link>
        </main>
    )
}