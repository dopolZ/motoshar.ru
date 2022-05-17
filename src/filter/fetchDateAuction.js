import {mainState} from "../initData"

export function fetchDateAuction() {

   fetch('/server/DateAuction')
      .then(res => {
         if (res.ok) return res.json()

         throw new Error(res.statusText)
      })
      .then(res => {
         const first = 
            new Date().toLocaleString('en-GB', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
            }) === new Date(Date.parse(res[1]['auction_date']))
            .toLocaleString('en-GB', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
            })
         ? 
            'сегодня'
         :
            new Date( Date.parse(res[1]['auction_date']) )
               .toLocaleString('en-GB', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
               })
         

         const next =
            new Date( Date.parse(res[0]['auction_date']) )
            .toLocaleString('en-GB', {
               year: 'numeric',
               month: 'short',
               day: 'numeric',
            })

         mainState.filterHeading.setState(
            <>
               ближайшие&ensp;<b>{first}</b>,&ensp;
               следующие&ensp;<b>{next}</b>
            </>
         )
      })
      .catch(err => {
         console.log(err)
         
         mainState.filterHeading.setState(
            <>
               что-то пошло не так ... попробуйте обновить
            </>
         )
      })
}