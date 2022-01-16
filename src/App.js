import Header from './header/Header'
import Home from './home/Home'
import Filter from './filter/Filter'
import {Route, Switch} from 'react-router-dom'
import LotPage from './lotPage/LotPage'
import FastBlock from './fastBlock/FastBlock'

const App = () => {

   return (
      <>
         <FastBlock />
         <Header />
         <Switch>
            <Route path='/lot:id' component={LotPage} />
            <Route path='/online' component={Filter} />
            <Route path='/stat' component={Filter} />
            <Route path='/menuMob' component={Home} />
            <Route path='/:to' component={Home} />
            <Route path='/' component={Home} />
         </Switch>
      </>
   )
}

export default App