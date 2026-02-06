
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (!isMobile) setMobileMenuOpen(false);
    }, [isMobile]);

    return (
        <header className="mb-4 bb-1 bg-white">
            <div className="container">
                <div className="row"> 
                    <div className="col col-12">
                        <h1 className="mt-2 mb-2">News</h1>
                        {
                            isMobile && (
                                <button 
                                    type="button"
                                    className="btn btn-outline-secondary burger mt-2 mb-2" 
                                    onClick={(e) => {e.preventDefault() , console.log("clicked" , mobileMenuOpen), setMobileMenuOpen(prev => !prev)}}
                                >
                                    {mobileMenuOpen ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list" />}
                                </button>
                            )
                        }
                        {
                            (!isMobile || mobileMenuOpen) && (
                                <ul className={`list ${isMobile ? "bt-1" : ""}`}>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/categories">Categories</Link></li>
                                </ul>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}