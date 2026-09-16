import {  useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
const [user, setUser] = useState(()=> {
    const email = localStorage.getItem('email')
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')

    if (!accessToken) {
        return null
    }
    return {
        accessToken,
        _id: userId,
        email
    }
})

 function loginUser(userData) {
localStorage.setItem('email', userData.email)
localStorage.setItem('accessToken', userData.accessToken)
localStorage.setItem('userId', userData._id)
setUser(userData)
}

function logoutUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    setUser(null)
}
const contextValue = {
    user,
    loginUser,
    logoutUser

}
return ( 
<AuthContext.Provider value={contextValue}>
    {children}
</AuthContext.Provider>
)
}

