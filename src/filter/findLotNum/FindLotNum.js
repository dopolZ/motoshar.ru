import './style.css'
import {useHistory, useRouteMatch} from 'react-router-dom'

function FindLotNum() {
   const history = useHistory()
   const match = useRouteMatch()
   
   const onSubmit = e => {
      
      if (+e.target[0].value) {      
         history.push({
            pathname: `${match.url}/find${e.target[0].value}`,
            from: history.location.pathname,
         })
      }
      
      e.target.reset()
      e.preventDefault()
   }

   return (
      <div id='findLotNum'>
         <p>поиск по номеру лота</p>
         <form onSubmit={onSubmit}>
            <input
               max='9999'
               maxLength='4'
               onKeyPress={e => e.key === 'Enter' ? onSubmit : null}
               type='tel'
            /> 
            <input type='submit' value='найти'></input>
         </form>    
      </div>
   )
}

export default FindLotNum