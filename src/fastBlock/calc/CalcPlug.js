import { mainState } from "../../initData"
import {useState} from "react"
import Calc from "./Calc"
import stl from './style.module.css'

const CalcPlug = () => {
   const [state, setState] = useState()
   mainState.calcPlug = {state, setState}

   return (
      <div className={state === 'off' ? stl.mainClose : stl.main}>
         <div className={stl.bg}>
            <Calc />
         </div>
      </div>
   )
}

export default CalcPlug