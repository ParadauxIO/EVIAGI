import { Outlet } from "react-router-dom"
import "./OrganiserLayout.scss"
import OrganisersSidebar from "../../components/organisers/OrganisersSidebar"

export default function OrganiserLayout() {
    return (
        <div className="grid-container">
            <header className="header"></header>
            <OrganisersSidebar/>
            {/* <Sidebar active={location.pathname}/> */}
            <Outlet/>
            <footer className="organiser-footer">hi</footer>
            {/* <Footer/> */}
        </div>
    )
}