import Navbar from "../components/common/Navbar";
import "./Index.scss"
import heroImage from "../assets/hero_image.webp"
import Footer from "../components/common/Footer";
export default function Index() {
    return (
        <div className="index">
            <Navbar/>
            <main className="hero">
                <div className="content">
                    <img src={heroImage}/>
                    <h3>A simple platform for running low-stakes elections online.</h3>
                </div>
            </main>
            <Footer/>
        </div>
    );
}