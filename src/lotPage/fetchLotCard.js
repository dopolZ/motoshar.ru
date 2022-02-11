import {mainState} from '../initData'

export function fetchLotCard(id) {
   setTimeout( () => mainState.preloader.setState({}) )
   
   fetch('/server/id', {
      method: 'post',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({
         id,
      })
   })
   .then(res => {
      if (!res.ok) {
         mainState.preloader.setState()

         return new Error(res)
      }

      return res
   })
   .then(res => res.json() )
   .then( res => {
      mainState.lotCard.setState(res.lotList[0])
      mainState.nav.setState({})
      mainState.preloader.setState()
   })
   .catch(err => {
      mainState.preloader.setState()

      console.dir(err)
   })
}
