import {mainState} from '../../initData'
import {useState} from 'react'
import './style.css'
import sortFilterBlock from './sortFilterBlock'
import createStateFilter from './createStateFilter'
import { renderLotList } from '../renderLotList'
import { renderLotPlate } from '../renderLotPlate'

function FilterBlock() {
   const [state, setState] = useState(
         mainState.filterBlock?.state || mainState.filter
      )
   mainState.filterBlock = {state, setState}

   const onChange = filter => {
      setState(filter)

      const res = sortFilterBlock(filter)
      const lotsJsx = mainState.viewResult === 'list' ?
         renderLotList(res.lots) : renderLotPlate(res.lots)

      mainState.cache.lotsFilter = res.lots
      mainState.cache.lotsFilterJsx = lotsJsx

      if (mainState.filter.front === 'online') {
         mainState.cache.modelsFilter = res.models
         mainState.cache.modelsFilterJsx = res.modelsJsx

         mainState.modelBlock.setState(res.modelsJsx)
      }                  
                  
      mainState.infoBlock.setState({})
      mainState.resultBlock.setState(lotsJsx)
   }

   return (mainState.mobile() && state.disabled ? <></> :
      <div className='filterBlockFilter'>
         <div>
            <span>оценка</span>
            <select
               disabled={state.disabled}
               onChange={e => {
                  const filter = {...state,
                     rateMin: +e.target.value
                  }
                  
                  onChange(filter)
               }}
               value={state.rateMin}
            >{state.ratingsMin}</select>
            &ndash;
            <select
               disabled={state.disabled}
               onChange={e => {
                  const filter = {...state,
                     rateMax: +e.target.value
                  }
                  
                  onChange(filter)
               }}
               value={state.rateMax}
            >{state.ratingsMax}</select>
         </div>
         <div>
            <span>год</span>
            <select
               disabled={state.disabled}
               onChange={e => {
                  const filter = {...state,
                     yearMin: +e.target.value
                  }
                  
                  onChange(filter)
               }}
               value={state.yearMin}
            >{state.yearsMin}</select>
            &ndash;
            <select
               disabled={state.disabled}
               onChange={e => {
                  const filter = {...state,
                     yearMax: +e.target.value
                  }
                  
                  onChange(filter)
               }}
               value={state.yearMax}
            >{state.yearsMax}</select>
         </div>
         <div>
            <span>пробег</span>
            <select
               disabled={state.disabled}
               onChange={e => {
                  const filter = {...state,
                     mileageMin: +e.target.value
                  }
                  
                  onChange(filter)
               }}
               value={state.mileageMin}
            >{state.mileagesMin}</select>
            &ndash;
            <select
               disabled={state.disabled}
               onChange={e => {
                  const filter = {...state,
                     mileageMax: +e.target.value
                  }
                  
                  onChange(filter)
               }}
               value={state.mileageMax}
            >{state.mileagesMax}</select>
         </div>
         <div>
            <input
               checked={state.ranked}
               disabled={state.disabled}
               className='rankedFilterBlock'
               onChange={() => {
                  const filter = createStateFilter(
                     state.ranked ? 'Recycle' : 'Ranked'
                  )

                  onChange(filter)
               }}
               type='radio'
            />
            <span>исправен</span>
            <input
               checked={state.recycle}
               disabled={state.disabled}
               className='recycleFilterBlock'
               onChange={() => {
                  const filter = createStateFilter(
                     state.recycle ? 'Ranked' : 'Recycle'
                  )
                  
                  onChange(filter)
               }}
               type='radio'
            />
            <span>повреждён</span>
         </div>
         <span
            className='reset'
            onClick={() => {
               if (!mainState.selectBlock.brand) return
               if (!mainState.selectBlock.engine) return
               if (!mainState.cache.lotsFetch) return

               const filter = createStateFilter(
                  state.ranked ? 'Ranked' : 'Recycle'
               )

               setState(filter)

               const res = sortFilterBlock(filter)

               const lotsJsx = mainState.viewResult === 'list' ?
                  renderLotList(res.lots) : renderLotPlate(res.lots)

               mainState.cache.lotsFilter = res.lots
               mainState.cache.lotsFilterJsx = lotsJsx

               if (mainState.filter.front === 'online') {
                  mainState.cache.modelsFilter = res.models
                  mainState.cache.modelsFilterJsx = res.modelsJsxReset

                  mainState.selectBlock.model = {}

                  mainState.modelBlock.setState(res.modelsJsxReset)
               }                  
                           
               mainState.infoBlock.setState({})
               mainState.resultBlock.setState(lotsJsx)
            }}
         >reset</span>
      </div>
   )
}

export default FilterBlock