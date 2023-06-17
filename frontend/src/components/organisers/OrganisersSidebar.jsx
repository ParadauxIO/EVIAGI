import "./OrganisersSidebar.scss"

export default function OrganisersSidebar() {
    return (
        <aside className="sidebar organisers-sidebar">
            <div className="heading">
                <h1> EVIAGI </h1>
                <span>Organisers Dashboard</span>
            </div>

            <ul className="links">
                <li className="active">Test</li>
                <li>Test 2</li>
            </ul>
        </aside>
    )
}