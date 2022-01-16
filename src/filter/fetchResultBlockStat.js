import {mainState, markaId} from '../initData'
import sortFilterBlock from './filterBlock/sortFilterBlock'
import createStateFilter from './filterBlock/createStateFilter'
import { renderLotPlate } from './renderLotPlate'
import { renderLotList } from './renderLotList'

export function fetchResultBlockStat() {

   let {brand, engine, model} = mainState.selectBlock

   if (Object.keys(model).length === 0) return

   setTimeout(() => mainState.preloader.setState({}) )

   const front = mainState.filter.front
   
   fetch('/server/modelBlock', {
      method: 'post',
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({
         markaId: markaId[brand],
         engine,
         modelId: Object.entries(model)[0][1],
         front,
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
      mainState.cache.lotsFetch = res.lotList

      const filter = createStateFilter('Ranked')
      const resultSortFilter = sortFilterBlock(filter)
      mainState.cache.lotsFilter = resultSortFilter.lots

      if (resultSortFilter.lots[0]) {
         mainState.filterBlock.setState(filter)
         mainState.infoBlock.setState({})
         mainState.resultBlock.setState(
            mainState.viewResult !== 'list' ?
               renderLotPlate(resultSortFilter.lots)
               :
               renderLotList(resultSortFilter.lots)
         )
      } else {
         mainState.filterBlock.setState({...filter, disabled: false})   
      }      

      mainState.preloader.setState()
   })
   .catch(err => {
      mainState.preloader.setState()
      
      console.dir(err)
   })
}
