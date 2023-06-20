import { Outlet, useNavigate } from "react-router-dom"
import "./OrganiserLayout.scss"
import OrganisersSidebar from "../../components/organisers/OrganisersSidebar"
import { useEffect, useState } from "react"
import { supabase } from "../../state/supabase";

export default function OrganiserLayout() {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    async function logout() {
        await supabase.auth.signOut();
        navigate("/");
        
    }

    useEffect(() => {
        async function load() {
            const { data: { session } } = await supabase.auth.getSession()
            console.log(session.user)
            setUser(session.user);
        }

        load();
    }, [])

    return (
        <div className="grid-container">
            <header className="header">
                {user && <>You're currently logged in as <span className="email">{user.email}</span>. <span className="logout" onClick={logout}>Log out</span></>}
            </header>
            <OrganisersSidebar/>
            {/* <Sidebar active={location.pathname}/> */}
            <Outlet/>
            <footer className="organiser-footer">hi</footer>
            {/* <Footer/> */}
        </div>
    )
}