import {mainState} from "../initData"
import {useState} from "react"
import CalcPlug from "./calc/CalcPlug"
import Callback from "./callback/Callback"
import ImgWrapper from "./imgWrapper/ImgWrapper"

const FastBlock = () => {
   const [state, setState] = useState({})
   mainState.fastBlock = {state, setState}
   
   switch (state.caption) {
      case 'заявка':
         return <Callback />

      case 'заказать':
         return <Callback />

      case 'калькулятор':
         return <CalcPlug />

      case 'img':
         return <ImgWrapper />

      default:
         return <></>
   }
}

export default FastBlock