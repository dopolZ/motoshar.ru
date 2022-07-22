import { useLocation, useNavigate } from "react-router-dom"
import NavHome from "../nav/navHome/NavHome"
import { useAuth } from "./useAuth"
import stl from './style.module.css'

const AdminPage = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const {signOut} = useAuth()

   const handleClick = () => signOut(() => navigate('/', {replace: true}))

   this.usd = 999
   let usd = 999
   let jpy = .999

   return (
      <>
         <div className={stl.h1h2}>
            <h1 onClick={handleClick}>Admin Page</h1>
         </div>

         <div className={stl.main}>
            <NavHome />
            
            <p className={stl.p}>usd = <input
                  className={stl.input}
                  // onChange={e => setData({
                  //    ...data, phone: e.target.value
                  // })}
                  placeholder={usd}
                  type='num'
                  // value={data.phone}
               /></p>
            <p className={stl.p}>jpy = <input
                  className={stl.input}
                  // onChange={e => setData({
                  //    ...data, phone: e.target.value
                  // })}
                  placeholder={jpy}
                  type='num'
                  // value={data.phone}
            /></p>
         </div>
      </>
   )
}

export {AdminPage}