import sortFilterBlock from './filterBlock/sortFilterBlock'
import createStateFilter from './filterBlock/createStateFilter'
import {mainState, markaId} from '../initData'
import { renderLotList } from './renderLotList'
import { renderLotPlate } from './renderLotPlate'
import { fetchResultBlockStat } from './fetchResultBlockStat'

export function fetchModelBlock() {
   const {brand, engine, model} = mainState.selectBlock

   if (!brand || !engine) return

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
         front,
      })
   })
   .then(res => {
      if (!res.ok) {
         mainState.preloader.setState()

         mainState.modelBlock.setState(
            <p
               className='modelBlockItem'
               key='none'
            >
               сервер не отвечает
            </p>
         )

         throw new Error(res.statusText)
      }

      return res
   })
   .then( res => res.json() )
   .then( res => {
      if (!res.modelList[0]) {
         mainState.modelBlock.setState(
            <p
               className='modelBlockItem'
               id='notFound'
               key='none'
            >
               не найдено
            </p>
         )

         mainState.preloader.setState()
      } else {
         mainState.cache.lotsFetch = res.lotList
         mainState.cache.modelsFetch = res.modelList
         
         if (front === 'online') {
            const filter = createStateFilter('Ranked')
            const resultSortFilter = sortFilterBlock(filter)   
            const lotsFilterJsx = mainState.viewResult !== 'list' ?
               renderLotPlate(resultSortFilter.lots)
               :
               renderLotList(resultSortFilter.lots)

            mainState.cache.lotsFilter = resultSortFilter.lots
            mainState.cache.lotsFilterJsx = lotsFilterJsx
            mainState.cache.modelsFilter = resultSortFilter.models
            mainState.cache.modelsFilterJsx = resultSortFilter.modelsJsx

            mainState.modelBlock.setState(resultSortFilter.modelsJsx)
            mainState.infoBlock.setState({})          

            if (Object.keys(model).length) {
               const lotsSortByModelJsx = lotsFilterJsx
                  .filter(e =>
                     e.props.children[2]
                     .props.children[1]
                     .props.children in model)

               mainState.filterBlock.setState({...filter, disabled: true})
               mainState.resultBlock.setState(lotsSortByModelJsx)
            } else {
               mainState.filterBlock.setState(filter)
               mainState.resultBlock.setState(lotsFilterJsx)               
            }

            mainState.preloader.setState()
         } else {
            const modelsJsx = res.modelList
               .sort((a, b) => a.model_name < b.model_name ? -1 : 1)
               .sort(a => a.model_name in model ? -1 : 1)
               .map((e, i) => (
                  <div
                     className={e.model_name in model ? (
                        model[e.model_name] = e.model_id,
                        'modelBlockItem buttonActive modelActive'
                     ) : 'modelBlockItem'}
                     data-modelid={e.model_id}
                     key={i}
                  >
                     {e.model_name}
                  </div>
               ))

            mainState.modelBlock.setState(modelsJsx)

            if (Object.keys(model).length) {
               fetchResultBlockStat()
            } else {
               mainState.preloader.setState()
            }
         }
      }
   })
   .catch(() => {
      mainState.preloader.setState()
   })
}
