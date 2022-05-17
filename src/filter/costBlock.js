import {mainState} from '../initData'

export function costBlock(elem) {
   const today = mainState.localDate({})
   const aucDate = mainState.localDate({date: elem.auction_date})
   const freight = Math.ceil(mainState.mainData.taxFreightRub / 1000) * 1000

   let {start, finish} = mainState.mainData.calcJpyToRub(elem)

   if (elem.auction.split(' ')[1] === 'Kyushu') {
      start += freight
      finish += freight
   }

   const splitter = mainState.splitter

   const costJpy = str =>
      elem[str] ? <p>{elem[str]}000 йен</p> : <p>0 йен</p>

   if ( new Date(today) < new Date(aucDate) ) {
      return (
         <>
            {costJpy('start')}
            <p>старт {splitter(start)} руб</p>
            <p style={{color: 'green'}}><b>
               {mainState.viewResult !== 'plate' ?
                  'можно купить' : 'доступен'}
            </b></p>
         </>
      )
   }

   if ( today === aucDate ) {
      if (!elem.finish && elem.status === 'available') {
         return (
            <>
               {costJpy('start')}
               <p>старт {splitter(start)} руб</p>
               <p><span style={{color: 'orange'}}><b>ждём итоги</b></span></p>
            </>
         )
      }
      
      if (!elem.finish && elem.status === 'Un') {
         return (
            <>
               {costJpy('start')}
               <p>старт {splitter(start)} руб</p>
               <p><span style={{color: 'red'}}><b>не продан</b></span></p>
            </>
         )
      }

      if (elem.finish && elem.status === 'Un') {
         return (
            <>
               {costJpy('finish')}
               <p>итог {splitter(finish)} руб</p>
               <p><span style={{color: 'red'}}><b>не продан</b></span></p>
            </>
         )
      }

      if (elem.finish && elem.status === 'Sold') {
         return (
            <>
               {costJpy('finish')}
               <p>итог {splitter(finish)} руб</p>
               <p><span style={{color: 'red'}}><b>продан</b></span></p>
            </>
         )
      }
   }

   if ( new Date(today) > new Date(aucDate) ) {
      if (elem.finish && elem.status === 'Sold') {
         return (
            <>
               {costJpy('finish')}
               <p>итог {splitter(finish)} руб</p>
               <p><span style={{color: 'red'}}><b>продан</b></span></p>
            </>
         )
      }

      if (elem.finish && elem.status === 'Un') {
         return (
            <>
               {costJpy('finish')}
               <p>итог {splitter(finish)} руб</p>
               <p><span style={{color: 'red'}}><b>не продан</b></span></p>
            </>
         )
      }

      if (elem.finish && elem.status === 'available') {
         return (
            <>
               {costJpy('finish')}
               <p>итог {splitter(finish)} руб</p>
               <p><span style={{color: 'red'}}><b>не продан</b></span></p>
            </>
         )
      }

      if (!elem.finish) {
         return (
            <>
               {costJpy('start')}
               <p>старт {splitter(start)} руб</p>
               <p><span style={{color: 'red'}}><b>не продан</b></span></p>
            </>
         )
      }
   }
}
