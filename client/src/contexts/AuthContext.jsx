import { createContext, useContext, useState } from "react";
const AuthContext = createContext()

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
const contextValue = {
    user,
    setUser
}
return ( 
<AuthContext.Provider value={contextValue}>
    {children}
</AuthContext.Provider>
)
}
export  function useAuth() {
    return useContext(AuthContext)
}