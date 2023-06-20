import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";

import "./OrganiserElectionCreator.scss"
import { supabase } from "../../../state/supabase";


export default function OrganiserElectionCreator() {
    const votingMethodOptions = [
        {value: "single-transferable-vote", label: "Single Transferable Vote (STV)"},
    ]

    const constituencyOptions = []

    const [form, setForm] = useState({
        name: "",
        votingMethodSelection: votingMethodOptions[0],
        isSecretBallot: true,
        hasReopenNominations: false,
        usesConstituencies: false,
        constituencies: [],
        opens: new Date(),
        closes: "",
        description: ""
    });

    const [errorMessage, setErrorMessage] = useState(null);

    function isValidDate(obj) {
        return obj instanceof Date && !isNaN(obj);
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (form.name.length === 0) {
            setErrorMessage("Invalid name.")
            return;
        }

        if (form.description.length === 0) {
            setErrorMessage("Invalid description.")
            return;
        }

        if (form.usesConstituencies && form.constituencies.length > 0) {
            setErrorMessage("Cannot specify constituencies when useConstituencies is disabled.")
            return;
        }

        if (!isValidDate(form.opens)) {
            setErrorMessage("Invalid opening time")
            return;
        }

        if (!isValidDate(form.closes)) {
            setErrorMessage("Invalid closing time")
            return;
        }

        if (form.closes < form.opens) {
            setErrorMessage("Cannot have a closing time before the opening time.")
            return;
        }

        setErrorMessage(null);
        // Send to API
        let body = {...form}
        console.log(JSON.stringify(form));

        const { data: { session } } = await supabase.auth.getSession()
        body.votingMethod = form.votingMethodSelection.value;
        delete body.votingMethodSelection;

        console.log(JSON.stringify(body))
        console.log(session.access_token)
        const response = await fetch(`${import.meta.env.VITE_API_LINK}/elections/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${session.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...body})
        });

        // navigate back to list, use window.location to fresh list.
        window.location.href = "/organisers/elections"
    }

    function handleSelectChange(name) {
        return function(event) {
            change({
                    target: {
                    type: "select",
                    name: name,
                    value: event
                }
            })
        }
    }

    function handleDateChange(name) {
        return function(date) {
            change({
                target: {
                type: "select",
                name: name,
                value: date
            }
        })
        }
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

    return (
        <main className="main election-creator desktop-only">
            <div>
                <h1> Election Creator </h1>
                <p>
                    Here you can create new elections. In order to use constituencies you have to first create
                    constituencies via the dashboard, at which point the options will be made available.
                </p>
                <form onSubmit={onSubmit}>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <div className="form-items">
                        <div className="form-item">
                            <label htmlFor="name">Election Name</label>
                            <input
                                id="name"
                                name="name"
                                placeholder="Election Name"
                                value={form.name}
                                onChange={change}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="votingMethod">Voting Method</label>
                            <Select
                                id="votingMethodSelection"
                                onChange={handleSelectChange("votingMethodSelection")}
                                options={votingMethodOptions}
                                value={form.votingMethodSelection}
                            />
                        </div>

                        <div className="form-item"> 
                            <div className="checkbox-item">
                                <label htmlFor="isSecretBallot">Secret Ballot</label>
                                <input 
                                    id="isSecretBallot"
                                    name="isSecretBallot"
                                    checked={form.isSecretBallot}
                                    onChange={change}
                                    type="checkbox"
                                />
                            </div>
                            <div className="checkbox-item">
                                <label htmlFor="hasReopenNominations">Add a candidate to re-open nominations?</label>
                                <input 
                                    id="hasReopenNominations"
                                    name="hasReopenNominations"
                                    checked={form.hasReopenNominations}
                                    onChange={change}
                                    type="checkbox"
                                />
                            </div>
                            <div className="checkbox-item">
                                <label htmlFor="">Use constituencies?</label>
                                <input 
                                    id="usesConstituencies"
                                    name="usesConstituencies"
                                    checked={form.usesConstituencies}
                                    onChange={change}
                                    type="checkbox"
                                    disabled={form.constituencies.length === 0}
                                />
                            </div>
                        </div>

                        <div className="form-item">
                            <label htmlFor="constituencies">Constituencies</label>
                            <Select
                                isMulti
                                id="constituencies"
                                onChange={handleSelectChange("constituencies")}
                                options={constituencyOptions}
                                value={form.constituencies}
                                isDisabled={form.constituencies.length === 0}
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="opens">Opens</label>
                            <DatePicker 
                                id="opens"
                                selected={form.opens} 
                                onChange={handleDateChange("opens")} 
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>

                        <div className="form-item">
                            <label htmlFor="closes">Closes</label>
                            <DatePicker 
                                id="closes"
                                selected={form.closes} 
                                onChange={handleDateChange("closes")} 
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                        </div>

                        <div className="form-item full">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={change}
                            />
                        </div>
                    </div>
                    <input type="submit" value="Create Election"/>
                </form>
            </div>
        </main>
    )
}