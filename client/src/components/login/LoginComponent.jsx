import useForm from "../../hooks/useForm"
import { login } from "../../services/authService"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"


export default function LoginComponent() {
const { values, register } = useForm({
    email: '',
    password: ''
})

 const navigate = useNavigate()
 const { loginUser } = useAuth()

 async function submitHandler(e) {
    e.preventDefault()

    try {
      const result = await login(values.email, values.password)
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
                    {...register('email')}
                     placeholder="Your Email" />
                    <label htmlFor="login-pass">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        {...register('password')}
                        placeholder="Password"
                    />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>
    )
}