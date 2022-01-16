import {mainState} from '../../initData'
import {getNumMileage} from './createStateFilter'

function sortFilterBlock(filter) {
   const cache = mainState.cache.lotsFetch
   const status = filter || mainState.filterBlock.state
   const statusLot = status.ranked ? 'Ranked' : 'Recycle'
   const {model} = mainState.selectBlock

   const result = {
      lots: [],
      models: {},
      modelsJsx: [],
      modelsJsxReset: [],
   }

   result.lots = cache.filter(e => {
      if (
         e.status_lot === statusLot &&
         e.rate >= status.rateMin && e.rate <= status.rateMax &&
         e.year >= status.yearMin && e.year <= status.yearMax &&
         getNumMileage(e.mileage) >= status.mileageMin &&
         getNumMileage(e.mileage) <= status.mileageMax
      ) {
         result.models[e.model_id] = e.model_name

         return true
      }
      
      return false
   })

   let modelsJsx = Object.entries(result.models)
      .sort((a, b) => a[1].toLowerCase() < b[1].toLowerCase() ? -1 : 1)
      .sort(a => a[1] in model ? -1 : 1)

   let modelsJsxReset = Object.entries(result.models)
      .sort((a, b) => a[1] > b[1] ? 1 : -1)

   modelsJsx = modelsJsx.map((e, i) => (
      <div
         className={e[1] in model ?
            'modelBlockItem buttonActive modelActive' : 'modelBlockItem'}
         data-modelid={e[0]}
         key={i}
         style={e[1] in model ?
            modelsJsx.indexOf(e) === 0 ?
            {top: '1%'} :
            {top: mainState.mobile('side') ? 
               modelsJsx.indexOf(e) * 16 + 1 + '%' :
               modelsJsx.indexOf(e) * 13 + 1 + '%'
            } : {}
         }
      >
         {e[1]}
      </div>
   ))

   modelsJsxReset = modelsJsxReset.map((e, i) => (
      <div
         className='modelBlockItem'
         data-modelid={e[0]}
         key={i}
      >
         {e[1]}
      </div>
   ))

   result.modelsJsx = modelsJsx
   result.modelsJsxReset = modelsJsxReset

   return result
}

export default sortFilterBlock