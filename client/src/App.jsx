import { Routes, Route } from 'react-router-dom'

import FooterComponent from './components/footer/FooterComponent'
import HeaderComponent from './components/header/HeaderComponent'
import HomeComponent from './components/home/HomeComponent'
import CatalogComponent from'./components/catalog/CatalogComponent'
import DetailsComponent from './components/details/DetailsComponent'
import LoginComponent from './components/login/LoginComponent'
import RegisterComponent from './components/register/RegisterComponent'
import CreateGameComponent from './components/creategame/CreateGameComponent'
import EditComponent from './components/edit/EditComponent'


export default function App() {


  return (
    <>
       <HeaderComponent/>

       <Routes>
       <Route path='/' element = {<HomeComponent/>} />
       <Route path='/catalog' element = {<CatalogComponent/>} />
       <Route path='/details/:gameId' element = {<DetailsComponent/>} />
       <Route path='/login' element = {<LoginComponent/>} />
       <Route path='/register' element = {<RegisterComponent/>} />
       <Route path='/create' element = {<CreateGameComponent/>} />
       <Route path='/edit/:gameId' element = {<EditComponent/>}  />     
       
       </Routes>
      
       <FooterComponent/>
    </>
  )
}


