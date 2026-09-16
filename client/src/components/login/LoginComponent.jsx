import { useState } from "react"
import { login } from "../../services/authService"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


export default function LoginComponent() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const navigate = useNavigate()
 const { loginUser } = useAuth()

 async function submitHandler(e) {
    e.preventDefault()

    try {
        const result = await login(email, password)
        loginUser(result)
        navigate('/')
        
    } catch (err) {
        window.alert(err.message)
    }
 }
    return (
        <section id="login-page">
            <form id="login" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="email"
                     id="email"
                     name="email"
                     value={email}
                     onChange={(e)=> setEmail(e.target.value)}
                     placeholder="Your Email" />
                    <label htmlFor="login-pass">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    )
}