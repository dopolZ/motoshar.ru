import {mainState} from '../../initData'

export const getNumMileage = str => {
   let mileage = ''
   for (let i in str) {
      if (+str[i] || +str[i] === 0) {
         mileage += str[i]
      }
   }
   return +mileage      
}

function createStateFilter(status) {   
   const cache = mainState.cache.lotsFetch
      .filter(e => e.status_lot === status ? 1 : 0)

   const filter = {...mainState.filter}
   filter.disabled = false
   filter.ranked = status === 'Ranked' ? true : false
   filter.recycle = !filter.ranked
   
   const ratings = [ ...new Set( cache.map(e => e.rate) ) ]
   const years = [ ...new Set( cache.map(e => e.year) ) ]
   const mileages = [ ...new Set( cache.map(e => getNumMileage(e.mileage) ) ) ]
   
   filter.rateMin = Math.min(...ratings)
   filter.rateMax = Math.max(...ratings)

   filter.ratingsMin = [...ratings].sort((a, b) => +a - +b)
      .map(e => (
         <option key={e}>
            {e}
         </option>
      ))

   filter.ratingsMax = [...ratings].sort((a, b) => +b - +a)
      .map(e => (
         <option key={e} >
            {e}
         </option>
      ))
      
   filter.yearMin = Math.min(...years)
   filter.yearMax = Math.max(...years)

   filter.yearsMin = [...years].sort((a, b) => +a - +b)
      .map(e => (
         <option key={e} >
            {e}
         </option>
      ))
      
   filter.yearsMax = [...years].sort((a, b) => +b - +a)
      .map(e => (
         <option key={e} >
            {e}
         </option>
      ))
      
   filter.mileageMin = Math.min(...mileages)
   filter.mileageMax = Math.max(...mileages)
   
   filter.mileagesMin = [...mileages].sort((a, b) => +a - +b)
      .map(e => (
         <option key={e} >
            {e}
         </option>
      ))
      
   filter.mileagesMax = [...mileages].sort((a, b) => +b - +a)
      .map(e => (
         <option key={e} >
            {e}
         </option>
      ))

   return filter
}

export default createStateFilter