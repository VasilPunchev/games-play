import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

export default function HeaderComponent() {
    const {user, logoutUser} = useAuth()
    function logoutHandler() {
        logoutUser()
    }
    
    return (
        

        <header>
            <nav>
                <Link className="home" to="/">

                    <img src='/images/logo.png' alt="logo" />
                </Link>
                <Link to="/catalog">Catalog</Link>

               {user ? ( 
                 <div id="user">
                    <Link to="/create">Add Game</Link>
                    <button onClick={logoutHandler}>Logout</button>
                </div>   

               ) : (
               <div id="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div> 
                )}

            </nav>
        </header >

    )
}