import { useLocation, useNavigate } from "react-router-dom"
import NavHome from "../nav/navHome/NavHome"
import { useAuth } from "./useAuth"

const LoginPage = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const {signIn} = useAuth()

   const fromPage = location.state?.from?.pathname || '/'

   const handleSubmit = e => {
      e.preventDefault()

      const form = e.target
      const user = form.userName.value

      signIn(user, () => navigate(fromPage, {replace: true}))
   }

   return (
      <>
         <NavHome />
         <h1>Login Page</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Name: <input name='userName' />
            </label>
            <button type='submit'>Login</button>
         </form>
      </>
   )
}

export {LoginPage}