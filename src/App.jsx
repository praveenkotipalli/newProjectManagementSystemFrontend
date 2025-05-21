// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import { Button } from './components/ui/button'
import Home from './pages/Home/Home'
// import Navbar from './pages/Navbar/Navbar'
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'
import CustomCursor from './pages/custom/CustomCursor'
import IssueDetails from './pages/IssueDetails/IssueDetails'
// import Login from './pages/Login/Login'
import PageNotFound from  "./pages/PageNotFound.jsx"
import Subscription from './pages/Subscription/Subscription.jsx'
// import Login from './pages/Auth/Login'
// import Signup from './pages/Auth/Signup'
import Auth from './pages/Auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './Redux/Auth/Action'
import { store } from './Redux/Store'
import { fetchProjects } from './Redux/Project/Action'
// import { store } from './Redux/Store'
// import { useEffect, useState } from 'react'
// import Login from './pages/Auth/Login'
// import LandingPage from "../src/pages/custom/LandingPage"
function App() {
  const dispatch = useDispatch();
  const {auth} = useSelector(store => store);
console.log(auth);
// if(localStorage.getItem('jwt')){
//   dispatch(getUser())
// }
  useEffect(() => {
    // if(localStorage.getItem('jwt')){
    //   dispatch(getUser());
    // }
    // if(auth.jwt){
    dispatch(getUser())
    dispatch(fetchProjects({}))
    // }
  }, [auth.jwt])
  
//   const [isAuth, setIsAuth] = useState(false);
// useEffect(() => {
//   if(localStorage.getItem('token')){
//     setIsAuth(true);
//   }
// }, [isAuth])


  // if(localStorage.getItem('token')){
  //   setIsAuth(true);
  // }

  return (
    <>  
      <CustomCursor/>
      {
      auth.user?
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/project/:id" element={<ProjectDetails/>}/>
        <Route path="project/:projectId/issue/:issueId" element={<IssueDetails/>}/>
        <Route path="/upgrade" element={<Subscription/>}/>
        <Route path="auth" element={<Auth/>}/>
        {/* <Route path="/signup" element={<Signup/>}/> */}
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>:
      <Auth/>
      // <Routes>
      //   <Route index element={<div className=''> <LandingPage /></div>}/>
      //   <Route path='/auth' element={<Auth/>}/>
      // </Routes>
      
      }
    </>
  )
}

export default App
