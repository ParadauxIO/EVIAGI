import { Link } from "react-router-dom"
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
                    <Link to={"/auth"}>Account</Link>
                </li>
            </ul>
        </nav>
    )
}