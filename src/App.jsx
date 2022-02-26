import Home from './home/Home'
import Filter from './filter/Filter'
import {Routes, Route} from 'react-router-dom'
import LotPage from './lotPage/LotPage'
import Layout from './layout/Layout'

const App = () => {

   return (
      <Routes>
         <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='menuMob' element={<Home />} />
            <Route path=':to' element={<Home />} />
            <Route path='online/*' element={<Filter />} />
            <Route path='stat/*' element={<Filter />} />
            <Route path='lot:id' element={<LotPage />} />
         </Route>
      </Routes>
   )
}

export default App