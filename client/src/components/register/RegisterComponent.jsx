import { useState } from "react"
import { register } from "../../services/authService"
import { useNavigate } from "react-router-dom";

export default function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate()

  async function submitHandler(e) {
   e.preventDefault()
   if (!password || !email || !confirmPassword) {
    window.alert('All fields are required')
    return;
   }

  if (password !== confirmPassword) {
    window.alert("Passwords do not match")
    return;
  }  
  
  try {
    const result = await register(email, password)
    localStorage.setItem('accessToken', result.accessToken)
    localStorage.setItem('userId', result._id)
    navigate('/')
    
  } catch (err) {
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
      name="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      placeholder="Your Email" />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        id="register-password"
        placeholder="Password"
      />
      <label htmlFor="confirm-password">Confirm Password:</label>
      <input
        type="password"
        name="confirm-password"
        value={confirmPassword}
        onChange={(e)=> setConfirmPassword(e.target.value)}
        id="confirm-password"
        placeholder="Repeat Password"
      />
      <input className="btn submit" type="submit" value="Register" />
    </div>
  </form>
</section>
    )
}