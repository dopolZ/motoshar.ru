import { Outlet } from 'react-router-dom'
import FastBlock from '../fastBlock/FastBlock'
import Header from '../header/Header'

const Layout = () => {
   return (
      <>
         <FastBlock />
         <Header />
         <Outlet />
      </>
   )

}

export default Layout