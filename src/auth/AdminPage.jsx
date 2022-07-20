import { useLocation, useNavigate } from "react-router-dom"
import NavHome from "../nav/navHome/NavHome"
import { useAuth } from "./useAuth"

const AdminPage = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const {signOut} = useAuth()

   const handleClick = () => signOut(() => navigate('/', {replace: true}))

   return (
      <>
         <NavHome />
         <h1>Admin Page</h1>
         <p>Are you here: {location.pathname}</p>
         <button onClick={handleClick}>SignOut</button>
      </>
   )
}

export {AdminPage}