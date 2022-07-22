import {Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './home/Home'
import Filter from './filter/Filter'
import LotPage from './lotPage/LotPage'

import { Auth } from './auth/Auth'
import { AuthCheck } from './auth/AuthCheck'
import { AdminPage } from './auth/AdminPage'
import { LoginPage } from './auth/LoginPage'

import { Currency } from './currency/Currency'

const App = () => {

   return (
      <Auth>
         <Currency>
            <Routes>
               <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='menuMob' element={<Home />} />
                  <Route path=':to' element={<Home />} />
                  <Route path='online/*' element={<Filter />} />
                  <Route path='stat/*' element={<Filter />} />
                  <Route path='lot:id' element={<LotPage />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='admin' element={
                     <AuthCheck><AdminPage /></AuthCheck>
                  } />
               </Route>
            </Routes>
         </Currency>
      </Auth>
   )
}

export default App