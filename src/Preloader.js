import {useState} from 'react'
import {mainState} from './initData'
import stl from './header/style.module.css'

function Preloader() {
   const [state, setState] = useState()
   mainState.preloader = {state, setState}

   return (
      <div className={state ? stl.logoOn : stl.logo}/>
   )
}

export default Preloader