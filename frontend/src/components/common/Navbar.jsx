import "./Navbar.scss"

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <h1>
                    EVIAGI
                </h1>
                <span className="desktop-only">&nbsp;&mdash;&nbsp;</span>
                <span> Electronic voting is a <i>great</i> idea</span>
            </div>
            <ul className="links">
                <li>
                    <a href="/account">Account</a>
                </li>
            </ul>
        </nav>
    )
}