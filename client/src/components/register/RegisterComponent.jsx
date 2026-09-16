
import { register as registerUser } from "../../services/authService"
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";


export default function RegisterComponent() {
  const { values, register } = useForm ({ 
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const navigate = useNavigate()
  const { loginUser } = useAuth()

  async function submitHandler(e) {
   e.preventDefault()
   if (!values.password || !values.email || !values.confirmPassword) {
    window.alert('All fields are required')
    return;
   }

  if (values.password !== values.confirmPassword) {
    window.alert("Passwords do not match")
    return;
  }  
  
  try {
    const result = await registerUser(values.email, values.password)
    loginUser(result)
     navigate('/')
    
  }
   catch (err) {
    window.alert(err.message)
  }
  }

    return(
         <section id="register-page" className="content auth">
  <form id="register" onSubmit={submitHandler}>
    <div className="container">
      <div className="brand-logo" />
      <h1>Register</h1>

      <label htmlFor="email">Email:</label>
      <input type="email" 
      id="email"
      {...register('email')}
      placeholder="Your Email" />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
       {...register('password')}
        id="register-password"
        placeholder="Password"
      />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
       {...register('confirmPassword')}
        id="confirm-password"
        placeholder="Repeat Password"
      />
      <input className="btn submit" type="submit" value="Register" />
    </div>
  </form>
</section>
    )
}