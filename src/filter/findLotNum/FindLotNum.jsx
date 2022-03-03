import './style.css'
import { mainState } from '../../initData'
import {useLocation, useNavigate} from 'react-router-dom'

function FindLotNum() {
   const location = useLocation()
   const startUrl = '/' + location.pathname.split('/')[1]
   const navigate = useNavigate()
   
   const handleSubmit = e => {
      
      if (+e.target[0].value) {
         mainState.lastFindLotNum = +e.target[0].value

         navigate(`${startUrl}/find${e.target[0].value}`, {
            state: {
               from: location.pathname,
            }
         })
      }
      
      e.target.reset()
      e.preventDefault()
   }

   return (
      <div id='findLotNum'>
         <p>поиск по номеру лота</p>
         <form onSubmit={handleSubmit}>
            <input
               max='9999'
               maxLength='4'
               onKeyPress={e => e.key === 'Enter' ? handleSubmit : null}
               type='tel'
            /> 
            <input type='submit' value='найти'></input>
         </form>    
      </div>
   )
}

export default FindLotNum