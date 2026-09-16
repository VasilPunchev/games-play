
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import './styles/style.css'
import AuthProvider from './contexts/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
   
  
)
