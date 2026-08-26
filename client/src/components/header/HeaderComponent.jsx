import { Link } from "react-router-dom"


export default function HeaderComponent() {
    return (


        <header>
            <nav>
                <Link className="home" to="/">

                    <img src='/images/logo.png' alt="logo" />
                </Link>
                <Link to="/catalog">Catalog</Link>

                <div id="user">
                    <Link to="/create">Add Game</Link>
                    <a href="#">Logout</a>
                </div>

                <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header >

    )
}