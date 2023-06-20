import { Link, useNavigate, useParams } from "react-router-dom"
import "./OrganiserElectionCandidateEditor.scss"
import { useEffect, useState } from "react"
import { supabase } from "../../../state/supabase"
import { formatDate } from "../../../partials/dateHelper";

export default function OrganiserElectionList() {
    // If no session, redirect to auth with redirectTo set.
    const [candidates, setCandidates] = useState([]);
    const [form, setForm] = useState({
        candidate_name: "",
        candidate_affiliation: ""
    });
    const navigate = useNavigate();
    const params = useParams();

    async function doAction(electionId, candidateId, action) {
        const { data: { session } } = await supabase.auth.getSession()
        let url = `${import.meta.env.VITE_API_LINK}/elections/${electionId}/candidate/${candidateId}`;

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

    function change(event) {
        if (event.target.type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [event.target.name]: event.target.checked,
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        }
    }

    async function addCandidate(e) {
        e.preventDefault();
        console.log(form);

        let body = {...form}

        if (body.candidate_affiliation === "") {
            delete body.candidate_affiliation;
        }

        const { data: { session } } = await supabase.auth.getSession()
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/elections/${params.electionId}/candidates`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...body})
        });

        fetchData();
    }

    const fetchData = async () => {
        const { data: { session } } = await supabase.auth.getSession()

        try {
            const response = await fetch(`${import.meta.env.VITE_API_LINK}/elections/${params.electionId}/candidates`, {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });

            setCandidates(await response.json())
            console.log(candidates)

        } catch (error) {
            console.error('Error fetching election data:', error);
        }
    };

    // Get all elections
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main className="main election-candiate-editor desktop-only">
            <table className="candidate-items">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Affiliation</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map((item, index) => (
                        <tr key={index}>
                            <td> {item.candidate_name} </td>
                            <td> {item.candidate_affiliation}</td>
                            <td>
                                <span className="action" onClick={() => doAction(item.election_id, item.candidate_id, "delete")}>Delete</span>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

            <form onSubmit={addCandidate}>
                <input
                    name="candidate_name"
                    value={form.candidate_name}
                    onChange={change}
                    placeholder="Name"
                />
                <input
                    name="candidate_affiliation"
                    value={form.candidate_affiliation}
                    onChange={change}
                    placeholder="Affiliation"
                />
                <input
                    type="submit"
                    value="Add"
                />
            </form>

        </main>
    )
}