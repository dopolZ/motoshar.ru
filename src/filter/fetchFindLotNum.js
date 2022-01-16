import {mainState} from '../initData'
import {renderLotList} from './renderLotList'
import {renderLotPlate} from './renderLotPlate'

export const fetchFindLotNum = lotNum => {
   setTimeout(() => mainState.preloader.setState({}) )
   
   fetch('/server/findLotNum', {
      method: 'post',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({
         front: mainState.filter.front,
         lotNum,
      })
   })
   .then(res => {
      if (!res.ok) {
         mainState.preloader.setState()

         mainState.modelBlock.setState([
            <p
               className='modelBlockItem'
               key='none'
            >
               не найдено
            </p>
         ])

         return new Error(res)
      }

      return res
   })
   .then(res => res.json() )
   .then(res => {
      mainState.cache.lotsFilter = res.lotList

      const lotsFilterJsx = mainState.viewResult !== 'list' ?
         renderLotPlate(res.lotList)
         :
         renderLotList(res.lotList)

      mainState.resultBlock.setState(lotsFilterJsx)
      mainState.preloader.setState()

      mainState.infoBlock.setState({})       
   })
}
