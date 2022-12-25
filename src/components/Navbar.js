import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const history = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history("/login")
    }
    let location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active" :""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active" :""}`} aria-current="page" to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link role="button" to="/login" className="btn btn-primary mx-2" type="submit">Login</Link>
                        <Link role="button" to="/signup" className="btn btn-primary mx-2" type="submit">SignUp</Link>
                    </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar