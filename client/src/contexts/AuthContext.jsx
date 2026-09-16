import {  useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
const [user, setUser] = useState(()=> {
    const accessToken = localStorage.getItem('accessToken')
    const userId = localStorage.getItem('userId')

    if (!accessToken) {
        return null
    }
    return {
        accessToken,
        _id: userId
    }
})

 function loginUser(userData) {
localStorage.setItem('accessToken', userData.accessToken)
localStorage.setItem('userId', userData._id)
setUser(userData)
}

function logoutUser() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userId')
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

