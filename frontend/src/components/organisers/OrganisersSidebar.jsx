import { useLocation, useNavigate } from "react-router-dom"
import "./OrganisersSidebar.scss"

function SidebarLink({current, to, label}) {
    let navigate = useNavigate();
    return (
        <li className={current.pathname === to ? "active" : ""} onClick={() => navigate(to)}>
            {label}
        </li>
    )
}

export default function OrganisersSidebar() {
    const location = useLocation()

    return (
        <aside className="sidebar organisers-sidebar">
            <div className="heading">
                <h1> EVIAGI </h1>
                <span>Organisers Dashboard</span>
            </div>

            <ul className="links">
                <SidebarLink current={location} to="/organisers" label="Home"/>
                <SidebarLink current={location} to="/organisers/elections" label="Elections"/>
                <SidebarLink current={location} to="/organisers/constituencies" label="Constituences"/>

                <SidebarLink current={location} to="/" label="Polls"/>
            </ul>
        </aside>
    )
}